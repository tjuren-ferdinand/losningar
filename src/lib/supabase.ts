import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Solution {
  id: string
  title: string
  subject: string
  type: string
  content: string
  tags: string[]
  image_url?: string
  created_at: string
  updated_at: string
}
