import {clerkMiddleware , createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/billing/popularcars/:id', '/billing/recommendedcars/:id', 'forum'])

export default clerkMiddleware(async (auth , req) => {

  if (req.nextUrl.pathname.startsWith('/studio')) {
    // console.log('Bypassing Clerk for Sanity Studio route:', req.nextUrl.pathname);
    return; // Skip Clerk processing for this route
  }

  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [ 
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Include the /studio 
    '/studio',
    // Include the /studio route
    '/studio/:path*',

  ],
}


