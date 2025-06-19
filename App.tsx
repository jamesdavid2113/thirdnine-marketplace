
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import OnboardingLanding from "./pages/OnboardingLanding";
import SignUpPage from "./pages/SignUpPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import HomePage from "./pages/HomePage";
import ProductListing from "./pages/ProductListing";
import SellerRegistration from "./pages/SellerRegistration";
import SellerAccountCreation from "./pages/SellerAccountCreation";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutPlaceholder from "./pages/CheckoutPlaceholder";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MasterDebugDashboard from "./components/debug/MasterDebugDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ProductDetail = lazy(() => import("./pages/ProductDetail"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/onboarding" element={<OnboardingLanding />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/complete-profile" 
                element={
                  <ProtectedRoute>
                    <CompleteProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/browse" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BrowsePage />
                </Suspense>
              } />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/product/:id" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductDetail />
                </Suspense>
              } />
              <Route 
                path="/list-product" 
                element={
                  <ProtectedRoute>
                    <ProductListing />
                  </ProtectedRoute>
                } 
              />
              <Route path="/seller/register" element={<SellerRegistration />} />
              <Route path="/seller/account" element={<SellerAccountCreation />} />
              <Route 
                path="/seller/dashboard" 
                element={
                  <ProtectedRoute>
                    <SellerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/seller/product" element={<SellerDashboard />} />
              <Route 
                path="/buyer/dashboard" 
                element={
                  <ProtectedRoute>
                    <BuyerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/checkout-placeholder" element={<CheckoutPlaceholder />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/cancel" element={<CheckoutCancel />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MasterDebugDashboard />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
