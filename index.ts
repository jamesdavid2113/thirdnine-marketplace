
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Checkout function started");

    // Try multiple possible secret key names to handle different naming conventions
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || 
                     Deno.env.get("Stripe Secret Key") || 
                     Deno.env.get("Stripe Secret Keys");
    
    if (!stripeKey) {
      logStep("ERROR: No Stripe key found", { 
        available_keys: Object.keys(Deno.env.toObject()).filter(k => k.toLowerCase().includes('stripe'))
      });
      throw new Error("Stripe secret key is not configured. Please check your secret names.");
    }
    logStep("Stripe key verified");

    // Create Supabase client with service role for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get request body
    const { cartItems, shippingAddress } = await req.json();
    if (!cartItems || cartItems.length === 0) {
      throw new Error("No cart items provided");
    }
    logStep("Cart items received", { itemCount: cartItems.length });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    }

    // Create line items - ReSport takes full payment
    const lineItems = [];
    
    for (const item of cartItems) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.products.name,
            description: `${item.products.brand} - ${item.products.condition}`,
            metadata: {
              seller_id: item.products.seller_id,
              product_id: item.products.id,
            },
          },
          unit_amount: item.products.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      });
    }

    logStep("Line items created", { lineItemCount: lineItems.length });

    // Create checkout session - ReSport receives full payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout/cancel`,
      metadata: {
        user_id: user.id,
        payment_hold: "true", // Flag to indicate this payment should be held
      },
      payment_intent_data: {
        metadata: {
          user_id: user.id,
          resport_commission: "0.05", // 5% commission
          payment_type: "marketplace_hold",
        },
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      billing_address_collection: 'required',
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Create order record with "payment_pending" status
    for (const item of cartItems) {
      const orderData = {
        buyer_id: user.id,
        seller_id: item.products.seller_id,
        product_id: item.products.id,
        total_amount: item.products.price * item.quantity,
        status: 'payment_pending', // Will change to 'paid' after successful payment
        shipping_address: shippingAddress,
      };

      const { error: orderError } = await supabaseClient
        .from('orders')
        .insert(orderData);

      if (orderError) {
        logStep("Order creation error", orderError);
      } else {
        logStep("Order created successfully", { productId: item.products.id });
      }
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
