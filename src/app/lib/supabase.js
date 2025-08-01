// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://fylfxlsfwdrctzeohsfg.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5bGZ4bHNmd2RyY3R6ZW9oc2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NjI5MDYsImV4cCI6MjA2OTUzODkwNn0.3uyLyD0P4Rhi0QDC4ux2tDnMwQelRD_sCFJURY5HOSM'                 
);
