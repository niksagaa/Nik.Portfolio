import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

export async function getProfileFromDB() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error
    if (!data || data.length === 0) throw new Error('No profile found');
    return data[0].id;
}

export async function saveExperienceToDB(Experience: any) {
    const profileID = await getProfileFromDB()

    const experience = {
        profile_id: profileID,
        company: Experience.company,
        role: Experience.role,
        period: Experience.period,
        details: Experience.details,
    }

    const { data, error } = await supabase.from('experiences').insert([experience]).select();
    if (error) {
        throw new Error(`Failed to save experience: ${error.message}`)
    }

    return data
}

export async function getExperienceFromDB() {
    const profileID = await getProfileFromDB()

    const { data, error } = await supabase.from('experiences').select("*").eq('profile_id', profileID).order('created_at', { ascending: false })
    if (error) throw error
    return data || []
}

export async function deleteExperienceFromDB(id: string) {
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (error) throw error
}

export async function updateExperienceFromDB(Experience: any, id: string) {
    const experiencePayload = {
        company: Experience.company,
        role: Experience.role,
        period: Experience.period,
        details: Experience.details,
    }

    const {data, error} = await supabase.from('experiences').update(experiencePayload).eq('id', id).select()
    if(error) throw error
    return data
}