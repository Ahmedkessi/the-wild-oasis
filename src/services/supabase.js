
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://rctslaasxoqvzmkysvyl.supabase.co';
const supabaseKey = `sb_publishable_aW8Q7jHcbYtMlnDkRpgTzg_yqpdCpJs`
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;