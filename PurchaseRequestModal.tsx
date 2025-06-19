
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { usePurchaseRequest } from '@/hooks/usePurchaseRequest';
import { supabase } from '@/integrations/supabase/client';
import { X, Mail, Phone, CheckCircle, Info } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  images: string[];
}

interface PurchaseRequestModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const PurchaseRequestModal = ({ product, isOpen, onClose, onSuccess }: PurchaseRequestModalProps) => {
  const [message, setMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { sendPurchaseRequest, loading } = usePurchaseRequest();
  const { user } = useAuth();

  useEffect(() => {
    if (user && isOpen) {
      setContactEmail(user.email || '');
      fetchUserProfile();
    }
  }, [user, isOpen]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, phone')
      .eq('id', user.id)
      .single();
    
    if (profile) {
      setContactEmail(profile.email || user.email || '');
      setContactPhone(profile.phone || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendPurchaseRequest(product.id, message, {
        email: contactEmail,
        phone: contactPhone
      });
      
      toast({
        title: "Request sent successfully!",
        description: "The seller and ReSport team have been notified. Check your email for confirmation.",
      });
      
      onSuccess?.();
      onClose();
      
      // Reset form
      setMessage('');
      setAgreedToTerms(false);
      
    } catch (error: any) {
      toast({
        title: "Failed to send request",
        description: error.message || 'Please try again later',
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Send Purchase Request</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-lg font-bold text-blue-600">€{parseFloat(product.price.toString()).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
            <div>
              <Label htmlFor="contactEmail" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Email *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contactPhone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Phone (Optional)
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+34 123 456 789"
                className="mt-1"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">
                Message to Seller (Optional)
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Hi! I'm interested in buying this product. When would be a good time to arrange pickup/delivery?"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                This helps the seller understand your needs and speeds up the process.
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to ReSport's terms and understand that the ReSport team will facilitate this transaction. 
                I commit to completing the purchase if the seller agrees.
              </label>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">How it works:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Seller gets notified immediately</li>
                    <li>• ReSport team facilitates the transaction</li>
                    <li>• Safe payment and delivery coordination</li>
                    <li>• Response within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending Request...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Purchase Request</span>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequestModal;
