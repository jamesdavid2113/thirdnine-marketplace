// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://trmkkxjshhbquchaybqc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybWtreGpzaGhicXVjaGF5YnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjE5NDgsImV4cCI6MjA2MzgzNzk0OH0.1bAr74kBRm4gkSuLpxrB32pBvbZ68b93USGTIK_3QdI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);