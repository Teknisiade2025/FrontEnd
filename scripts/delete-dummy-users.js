const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fylfxlsfwdrctzeohsfg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5bGZ4bHNmd2RyY3R6ZW9oc2ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk2MjkwNiwiZXhwIjoyMDY5NTM4OTA2fQ.et7B4767YRutYQxoFJE1u5q08PL0JCnK8q37EHG8iGw';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const dummyEmails = [
  'admin01@example.com',
  'admin02@example.com',
  'admin03@example.com',
  'admin04@example.com',
  'admin05@example.com',
  'admin06@example.com',
  'admin07@example.com',
  'admin08@example.com',
  'admin09@example.com',
  'admin10@example.com',
];

async function deleteDummyUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('❌ Gagal ambil daftar user:', error.message);
    return;
  }

  const users = data.users;
  for (const email of dummyEmails) {
    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log(`⚠️ Tidak ditemukan user dengan email: ${email}`);
      continue;
    }

    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error(`❌ Gagal hapus ${email}:`, deleteError.message);
    } else {
      console.log(`✅ User ${email} berhasil dihapus`);
    }
  }
}

deleteDummyUsers();
