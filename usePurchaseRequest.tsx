
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  email?: string;
  phone?: string;
}

export const usePurchaseRequest = () => {
  const [loading, setLoading] = useState(false);

  const sendPurchaseRequest = async (productId: string, message = '', contactInfo: ContactInfo = {}) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-purchase-request', {
        body: {
          productId,
          message,
          contactEmail: contactInfo.email,
          contactPhone: contactInfo.phone,
        }
      });

      if (error) {
        console.error("Purchase request error:", error);
        throw error;
      }

      return data;
      
    } catch (error) {
      console.error('Purchase request error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sendPurchaseRequest, loading };
};
