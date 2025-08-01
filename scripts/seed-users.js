const { createClient } = require('@supabase/supabase-js');
const { dummyUsers } = require('../dummyUsers');

const SUPABASE_URL = 'https://fylfxlsfwdrctzeohsfg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5bGZ4bHNmd2RyY3R6ZW9oc2ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk2MjkwNiwiZXhwIjoyMDY5NTM4OTA2fQ.et7B4767YRutYQxoFJE1u5q08PL0JCnK8q37EHG8iGw';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function seedUsers() {
  for (const user of dummyUsers) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        username: user.username,
        role: user.role,
        kmhm_name: user.kmhm_name
      },
    });

    if (error) {
      console.error(`❌ Gagal buat user ${user.email}:`, error.message);
    } else {
      console.log(`✅ User ${user.email} berhasil dibuat`);
    }
  }
}

seedUsers();
