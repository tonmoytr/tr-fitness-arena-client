import { NextResponse } from "next/server";

export function middleware(request) {
  // Better Auth stores its session token in one of these cookies depending on dev/prod protocol
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // If no session token is present, redirect to the signIn page
  if (!sessionToken) {
    const signInUrl = new URL("/signIn", request.url);
    
    // Capture the original page URL path + query params so the user returns after signin
    const currentPath = request.nextUrl.pathname + request.nextUrl.search;
    signInUrl.searchParams.set("callbackUrl", currentPath);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Map Next.js matchers to private endpoints only
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/payment",
    "/classes/:id",
    "/forum/:id",
  ],
};
