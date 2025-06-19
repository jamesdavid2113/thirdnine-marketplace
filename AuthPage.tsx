
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in error",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Welcome back to Resportz!",
        description: "You've been signed in successfully.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen resport-hero-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="mb-6 inline-flex items-center gap-2 text-white hover:text-green-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-lg font-medium">{t('auth.back')}</span>
        </Link>
        
        <Card className="resport-card backdrop-blur-lg bg-white/95 border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-primary mb-2">Resportz</h1>
              <p className="text-sm tracking-widest text-green-600 font-medium">RELIVED. RELOVED. RESPORTZ.</p>
            </div>
            <CardTitle className="text-2xl text-gray-800">{t('auth.welcome')}</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              {t('auth.subtitle')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.enter.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="resport-input pl-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('auth.enter.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="resport-input pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full resport-button py-4 text-lg"
                disabled={loading}
              >
                {loading ? t('auth.signing') : t('auth.signin')}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                {t('auth.noaccount')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
