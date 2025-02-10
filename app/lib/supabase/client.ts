import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

if (!process.env.REACT_APP_SUPABASE_URL) throw new Error('Missing env.REACT_APP_SUPABASE_URL');
if (!process.env.REACT_APP_SUPABASE_ANON_KEY) throw new Error('Missing env.REACT_APP_SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
