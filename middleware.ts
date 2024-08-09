import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let response = NextResponse.next();

    if (request.nextUrl.pathname === '/google') {
        response = NextResponse.redirect('https://www.google.com', {
            status: 302,
            statusText: 'Found',
            headers: {
                // This header is fine locally, but on Netlify will cause the rewrite to take precedence over the redirect.
                'x-middleware-rewrite': `${request.nextUrl.origin}`
            }
        });
    }

    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/(.*)']
};
