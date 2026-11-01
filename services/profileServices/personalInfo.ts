import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function getProfileFromDB() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
}

export async function saveProfileToDB(cvData: any) {
  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);

  if (fetchError) throw fetchError;

  const profileData = {
    id: "11111111-1111-1111-1111-111111111111",
    full_name: cvData.fullName,
    job_title: cvData.title,
    email: cvData.email,
    phone: cvData.phone,
    github_url: cvData.githubUrl,
    linkedin_url: cvData.linkedinUrl,
    bio: cvData.summary,
    updated_at: new Date().toISOString(),
  };

  let error;

  if (data && data.length > 0) {
    const existingID = data[0].id;
    const updateResult = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', existingID);
    error = updateResult.error;
  } else {
    const insertResult = await supabase
      .from('profiles')
      .insert([profileData]);
    error = insertResult.error;
  }

  if (error) throw error;
  return true;
}