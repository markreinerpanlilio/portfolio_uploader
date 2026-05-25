const SUPABASE_URL = "https://cdwmqydqgvwpsifozmyn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkd21xeWRxZ3Z3cHNpZm96bXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2ODEyNjMsImV4cCI6MjA5NTI1NzI2M30.KVlVkvnsiN11JABOXth1SoApGUoMxhyCM4w2e15ZnBg";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
