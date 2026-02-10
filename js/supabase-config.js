// Supabase configuration for Grace Clothing
const SUPABASE_URL = 'https://zzcdytaazpclecgbaxoo.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6Y2R5dGFhenBjbGVjZ2JheG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTcxNzYsImV4cCI6MjA4NjIzMzE3Nn0.bYGHD-4yAJj8W_g5xieFyAMapIPZwwB9hUsvKCnVaqA'

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)