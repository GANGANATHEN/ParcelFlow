import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("parcelflow_session");
  const isAuthenticated = !!sessionCookie?.value;

  // Protected application routes
  const protectedPaths = [
    "/",
    "/upload",
    "/verification",
    "/parcels",
    "/daily-excel",
    "/settings",
  ];

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || (path !== "/" && pathname.startsWith(path + "/"))
  );

  // If trying to access protected route without session, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and visiting login page, redirect to dashboard
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, svgs
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

