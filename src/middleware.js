import { NextResponse } from "next/server";
import { auth } from "./auth";

export const middleware = async (request) => {
  const session = await auth();
  const url = request.nextUrl; // Extract nextUrl from request
  const pathname = url.pathname; // Get the pathname

  if (!session) {
    // Redirect to login if user is not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && pathname === "/") {
    // If authenticated and on "/", redirect to "/workspace"
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/workspace/:path*"], // Apply middleware to root ("/") and workspace routes
};
