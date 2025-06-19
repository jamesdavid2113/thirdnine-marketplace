
-- Add language preference column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN language text DEFAULT 'en' CHECK (language IN ('en', 'nl'));

-- Update existing profiles to have default language
UPDATE public.profiles 
SET language = 'en' 
WHERE language IS NULL;
