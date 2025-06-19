
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import NavBar from "@/components/NavBar";
import { toast } from "@/components/ui/use-toast";

const accountSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof accountSchema>;

const SellerAccountCreation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: AccountFormValues) => {
    setIsLoading(true);
    
    // In a real app, this would connect to auth service
    // For now, we'll simulate a successful registration
    setTimeout(() => {
      setIsLoading(false);
      
      // Get seller profile from previous step
      const sellerProfile = sessionStorage.getItem("sellerProfile");
      if (!sellerProfile) {
        toast({
          title: "Error",
          description: "Profile information not found. Please start again.",
          variant: "destructive",
        });
        navigate("/seller/register");
        return;
      }
      
      // Create combined user data
      const userData = {
        ...JSON.parse(sellerProfile),
        password: data.password,
      };
      
      console.log("Complete user data:", userData);
      
      toast({
        title: "Account created successfully!",
        description: "Now let's list your first product",
      });
      
      // Navigate to product listing
      navigate("/seller/product");
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google Sign-In",
      description: "This would connect to Google authentication in a real app",
    });
    // In a real app, this would initialize Google OAuth
  };

  const handleAppleSignIn = () => {
    toast({
      title: "Apple Sign-In",
      description: "This would connect to Apple authentication in a real app",
    });
    // In a real app, this would initialize Apple OAuth
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto max-w-md px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground">One last step to get started</p>
        </div>

        {/* Social sign-in options */}
        <div className="mb-8 space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleAppleSignIn}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M16.7 7.1c-.9 0-1.7.3-2.3.8-.5.4-1 .6-1.3.6-.3 0-.8-.2-1.4-.6-1-.6-1.5-.7-2.5-.7-1.8 0-3.5 1.1-4.2 2.9-.8 1.8-.4 4.6 1.8 7.8.6.9 1.3 1.9 2.4 1.9 1 0 1.2-.6 2.3-.6s1.3.6 2.3.6c1.1 0 1.8-1 2.4-1.9.5-.7.9-1.5 1.2-2.3-2.2-1-2.1-3.1-2.1-3.1 0-1.9 1.6-2.6 1.7-2.6-.6-1.4-1.8-1.8-1.8-1.8h-.2z"
                fill="currentColor"
              />
              <path
                d="M15.4 3.4c-1 0-2 .8-2.6 1.5-.5.7-.9 1.7-.8 2.5 1.1.1 2.1-.7 2.7-1.4.6-.7 1-1.7.7-2.6z"
                fill="currentColor"
              />
            </svg>
            Continue with Apple
          </Button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full rounded-full" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SellerAccountCreation;
