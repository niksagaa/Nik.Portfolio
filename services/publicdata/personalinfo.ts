import { createClient } from "@/utils/supabase/client";
const supabase = createClient()

const getProfileID = async () => {
    const { data, error } = await supabase.from('profiles').select("id").limit(1)
    if (error) throw error
    if (!data) throw new Error("No Profile Found");
    return data[0].id
}

export async function getProfileFromDB() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
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

export async function getEducationFromDB() {
    const id = await getProfileID()

    const { data, error } = await supabase.from('educations').select('*').eq('profile_id', id);
    if (error) throw error
    if (!data) throw new Error('No education found');
    return data || [];
}

export async function getExperienceFromDB() {
    const profileID = await getProfileID()

    const { data, error } = await supabase.from('experiences').select("*").eq('profile_id', profileID).order('created_at', { ascending: false })
    if (error) throw error
    return data || []
}

export async function getProjectInfoFromDB() {
    const profileId = await getProfileID();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('profile_id', profileId);

    if (error) throw error;

    return data.map((p: any) => {
        let parsedSolutions: string[] = [];

        if (p.solution) {
            try {
                const jsonParsed = JSON.parse(p.solution);
                if (Array.isArray(jsonParsed)) {
                    parsedSolutions = jsonParsed;
                } else {
                    throw new Error();
                }
            } catch {
                parsedSolutions = p.solution
                    .replace(/[\[\]"]/g, '')
                    .split(',')
                    .map((s: string) => s.trim())
                    .filter(Boolean);
            }
        }

        return {
            id: p.id,
            title: p.title,
            category: p.category,
            summary: p.overview || p.summary,
            tags: p.tags || [],
            liveUrl: p.live_demo_url,
            githubUrl: p.github_url,
            problemStatement: p.problem,
            solutionHighlights: parsedSolutions,
            measuredImpact: p.impact
        };
    });
}