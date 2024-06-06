//path: lib/supabaseClient.js
import {createClient} from '@supabase/supabase-js';
import fetch from 'node-fetch';

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const superbase = createClient(supabaseUrl, supabaseKey, {fetch: globalThis.fetch});

export {superbase};