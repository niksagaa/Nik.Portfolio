import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function createRedirectWithCookies(
  req: NextRequest,
  targetPathname: string,
  sourceResponse: NextResponse
) {
  const url = req.nextUrl.clone();
  url.pathname = targetPathname;
  url.search = "";

  const redirectResponse = NextResponse.redirect(url);

  sourceResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

export async function proxy(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("[PROXY GET_USER ERROR]", {
      message: error.message,
      cause: (error as { cause?: unknown }).cause ?? null,
    });
  }

  let user = data?.user ?? null;

  if (!user && error?.message?.includes("fetch failed")) {
    const { data: sessionData } = await supabase.auth.getSession();
    user = sessionData?.session?.user ?? null;
  }

  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" && user) {
    return createRedirectWithCookies(req, "/admin/dashboard", response);
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !user) {
    return createRedirectWithCookies(req, "/admin/login", response);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};