import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { createServerClient } from "@supabase/ssr";
import AdminLoginClient from "./AdminLoginClient";

async function LoginSessionCheck() {
    await connection();
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {

                    }
                },
            },
        }
    );

    const { data, error } = await supabase.auth.getUser();

    if (error && error.message !== "Auth session missing!") {
        console.error("[LOGIN PAGE GET_USER ERROR]", {
            message: error.message,
            cause: (error as { cause?: unknown }).cause ?? null,
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        });
    }

    let user = data?.user ?? null;

    if (!user && error?.message?.includes("fetch failed")) {
        const { data: sessionData } = await supabase.auth.getSession();
        user = sessionData?.session?.user ?? null;
    }

    if (user) {
        redirect("/admin/dashboard");
    }

    return null;
}

export default function AdminLoginPage() {
    return (
        <>
            <Suspense fallback={null}>
                <LoginSessionCheck />
            </Suspense>
            <AdminLoginClient />
        </>
    );
}