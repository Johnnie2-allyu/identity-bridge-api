
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zymelpdthshnssdlsmwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bWVscGR0aHNobnNzZGxzbXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDgwMTcsImV4cCI6MjA2MDk4NDAxN30.KqPWYCFaYYRj8fQ6FL72_UYRdvcIji9l1pwOvP3Av70";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: localStorage
    }
  }
);
