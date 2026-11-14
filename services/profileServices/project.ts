import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const getProfileIDFromDB = async () => {
    const { data, error } = await supabase.from('profiles').select("*");
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('No profile found');
    return data[0].id;
};

export async function getProjectInfoFromDB() {
    const profileId = await getProfileIDFromDB();
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

export async function saveProjectFromDB(Project: any) {
    const id = await getProfileIDFromDB();

    const projectData = {
        profile_id: id,
        title: Project.title,
        category: Project.category,
        tags: typeof Project.tags === 'string' ? Project.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : Project.tags,
        live_demo_url: Project.liveUrl,
        github_url: Project.githubUrl,
        overview: Project.summary,
        problem: Project.problemStatement,
        solution: Array.isArray(Project.solutionHighlights)
            ? Project.solutionHighlights.join(', ')
            : Project.solutionHighlights,
        impact: Project.measuredImpact
    };

    const { data, error } = await supabase.from('projects').insert([projectData]).select();
    if (error) {
        throw new Error("Error saving new projects: " + error.message);
    }
    return data || [];
}

export async function deleteProjectFromDB(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return true;
}

export async function updateProject({project, id}:{project: any, id: string | number}) {
    const projectData = {
        title: project.title,
        category: project.category,
        tags: typeof project.tags === 'string' ? project.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : project.tags,
        live_demo_url: project.liveUrl,
        github_url: project.githubUrl,
        overview: project.summary,
        problem: project.problemStatement,
        solution: Array.isArray(project.solutionHighlights)
            ? project.solutionHighlights.join(', ')
            : project.solutionHighlights,
        impact: project.measuredImpact
    };

    const {data, error} = await supabase.from('projects').update(projectData).eq("id", id).select("*")

    if (error) throw error;
    return data || []
}