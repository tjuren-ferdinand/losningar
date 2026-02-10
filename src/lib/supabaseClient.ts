import { createClient } from '@supabase/supabase-js'

// Anon key för vanliga operationer
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://pyorswuegayvvavlcste.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5b3Jzd3VlZ2F5dnZhdmxjc3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3Mjk5ODEsImV4cCI6MjA4NjMwNTk4MX0.hp4IwfluF7pHwgj_3YI0WAlKSjjeYYlZqRg_-aOUSJA'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing')
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export interface Solution {
  id: string | number
  title: string
  subject: string
  category: string
  chapter: string
  image_url?: string | null
  created_at: string
}
