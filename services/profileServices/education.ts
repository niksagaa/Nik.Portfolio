import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

const getProfileIDFromDB = async () => {
    const { data, error } = await supabase.from('profiles').select("*");
    if (error) throw error
    if (!data || data.length === 0) throw new Error('No profile found');
    return data[0].id;
}

export async function getEducationFromDB() {
    const id = await getProfileIDFromDB()

    const { data, error } = await supabase.from('educations').select('*').eq('profile_id', id);
    if (error) throw error
    if (!data) throw new Error('No education found');
    return data || [];
}


export async function saveEducationToDB(Education: any) {
    const id = await getProfileIDFromDB()
    const Educationdata = {
        profile_id: id,
        degree: Education.degree,
        school: Education.school,
        period: Education.period,
    }

    const { data, error } = await supabase.from("educations").insert([Educationdata]).select()
    if (error) throw error
    return data
}

export async function deleteEducation(id: string){
    const {error} = await supabase.from('educations').delete().eq('id',id)
    if(error) throw new Error('Cannot delete education');
}

export async function updateEducation(Education: any, id: string){
    const {data, error} = await supabase.from('educations').update(Education).eq('id',id).select("*")
    if(error) throw new Error('Cannot update education');
    return data || []
}