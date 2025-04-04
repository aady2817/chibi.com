import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected routes that require authentication
  const protectedRoutes = ["/checkout", "/profile", "/orders"]

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  // Get the user from the cookie
  const user = request.cookies.get("user")?.value

  // If the route is protected and the user is not logged in, redirect to login
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*", "/orders/:path*"],
}

