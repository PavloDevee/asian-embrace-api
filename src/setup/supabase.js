const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('Error: SUPABASE_URL environment variable is not set.')
}

if (!supabaseAnonKey) {
  console.error('Error: SUPABASE_ANON_KEY environment variable is not set.')
}

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

if (!supabase && supabaseUrl && supabaseAnonKey) {
  console.error('Failed to initialize Supabase client. Check URL and Key.')
}

module.exports = { supabase } 