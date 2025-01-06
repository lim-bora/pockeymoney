import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and anon key must be provided");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
