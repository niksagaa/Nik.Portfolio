import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function login(email: string, password: string): Promise<boolean> {
    try {
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        console.log(`[AUTH] Attempting login for: ${cleanEmail}`);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: cleanPassword,
        });

        if (error) {
            console.log('[AUTH ERROR DETAIL]:', error.message, '| Code:', error.status);
            return false;
        }

        if (!data.session) {
            console.log('[AUTH ERROR]: No active session returned from Supabase.');
            return false;
        }

        console.log('[AUTH SUCCESS]: Session authenticated successfully.');
        return true;
    } catch (error) {
        console.error('[AUTH UNEXPECTED ERROR]:', error);
        return false;
    }
}