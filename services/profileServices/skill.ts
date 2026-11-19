import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

const getProfileID = async () => {
    const { data, error } = await supabase.from('profiles').select("id").limit(1)
    if (error) throw error
    if (!data) throw new Error("No Profile Found");
    return data[0].id
}

export async function uploadSkills(skillData: any) {
    const profileID = await getProfileID()
    const techStacks = {
        profile_id: profileID,
        name: skillData.name,
        category: skillData.category,
        proficiency: skillData.proficiency,
        icon: skillData.icon,
        level: skillData.level
    }

    const { data, error } = await supabase.from('tech_stacks').insert([techStacks]).select("*")

    if (error) {
        throw new Error(`Error saving skills: ${error.message || error.hint || 'Unknown database error'}`);
    }

    return data && data.length > 0 ? data[0] : null;
}

export async function getSkills() {
    const profileID = await getProfileID()
    const { data, error } = await supabase.from('tech_stacks').select("*").eq('profile_id', profileID)
    if (error) {
        throw new Error(`No skills found ${error.message}`)
    }

    return data || []
}

export async function deleteSkills(id: string) {
    const { error } = await supabase.from('tech_stacks').delete().eq('id', id)
    if (error) {
        throw new Error(`Error removing skills ${error.message}`)
    }
    return true
}