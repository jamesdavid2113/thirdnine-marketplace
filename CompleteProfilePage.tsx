
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { User, MapPin } from "lucide-react";
import AreaCodeSelector from "@/components/profile/AreaCodeSelector";
import CityAutocomplete from "@/components/profile/CityAutocomplete";

const CompleteProfilePage = () => {
  const [phone, setPhone] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userType, setUserType] = useState<"buyer" | "seller" | "both">("buyer");
  const [sportsInterests, setSportsInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  const validatePhoneNumber = (phone: string, areaCode: string) => {
    if (!phone && !areaCode) return true; // Optional field
    
    if (phone && !areaCode) {
      setPhoneError('Please select an area code');
      return false;
    }
    
    if (areaCode && !phone) {
      setPhoneError('Please enter a phone number');
      return false;
    }

    // Basic phone validation (adjust regex as needed)
    const phoneRegex = /^[0-9]{6,15}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid phone number (6-15 digits)');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    validatePhoneNumber(value, areaCode);
  };

  const handleAreaCodeChange = (code: string) => {
    setAreaCode(code);
    validatePhoneNumber(phone, code);
  };

  const handleAreaCodeSuggestion = (suggestedAreaCode: string) => {
    if (!areaCode) {
      setAreaCode(suggestedAreaCode);
      validatePhoneNumber(phone, suggestedAreaCode);
    }
  };

  const handleSportsInterestChange = (sport: string, checked: boolean) => {
    if (checked) {
      setSportsInterests(prev => [...prev, sport]);
    } else {
      setSportsInterests(prev => prev.filter(s => s !== sport));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phone, areaCode)) {
      return;
    }
    
    setLoading(true);

    try {
      const fullPhone = areaCode && phone ? `${areaCode} ${phone}` : undefined;
      
      await updateProfile({
        name: user?.user_metadata?.full_name || 'User',
        phone: fullPhone,
        city: city || undefined,
        postalCode: postalCode || undefined,
        userType,
        sportsInterests,
      });
      
      toast({
        title: "Profile completed!",
        description: "Welcome to ReSport! Let's get started.",
      });
      
      navigate("/home");
      
    } catch (error: any) {
      console.error('Profile completion error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen resport-hero-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="resport-card backdrop-blur-lg bg-white/95 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-primary mb-2">Complete Your Profile</h1>
              <p className="text-gray-600">
                Let's personalize your ReSport experience
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={user.user_metadata?.full_name || 'User'}
                      disabled
                      className="resport-input pl-12 bg-gray-50"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Name was set during account creation</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="resport-input bg-gray-50"
                  />
                </div>
              </div>

              {/* Phone Number with Area Code */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Phone Number (Optional)
                </Label>
                <div className="flex gap-2">
                  <AreaCodeSelector
                    value={areaCode}
                    onChange={handleAreaCodeChange}
                    className="w-48"
                  />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 resport-input"
                  />
                </div>
                {phoneError && (
                  <p className="text-red-500 text-sm">{phoneError}</p>
                )}
                {areaCode && phone && !phoneError && (
                  <p className="text-green-600 text-sm">
                    Complete number: {areaCode} {phone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CityAutocomplete
                  value={city}
                  onChange={setCity}
                  onAreaCodeSuggestion={handleAreaCodeSuggestion}
                />
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-gray-700 font-medium">Postal Code</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="12345"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="resport-input pl-12"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700 font-medium">I want to:</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'buyer', label: 'Buy Products', icon: '🛍️' },
                    { value: 'seller', label: 'Sell Products', icon: '💰' },
                    { value: 'both', label: 'Buy & Sell', icon: '🔄' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setUserType(option.value as any)}
                      className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        userType === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700 font-medium">I'm interested in:</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["running", "golf", "football", "basketball", "tennis", "cycling"].map((sport) => (
                    <div key={sport} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors">
                      <Checkbox
                        id={sport}
                        checked={sportsInterests.includes(sport)}
                        onCheckedChange={(checked) => handleSportsInterestChange(sport, checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor={sport} className="text-gray-700 capitalize cursor-pointer">{sport}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full resport-button py-4 text-lg"
                disabled={loading}
              >
                {loading ? "Completing Profile..." : "Complete Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
