import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'br'];
const publicPages = ['/login']; // Solo la página de inicio de sesión está disponible para usuarios no autenticados

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/',
    },
  }
);

export default async function middleware(req, res, next) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (req.headers.has('content-length')) {
    const contentLength = parseInt(req.headers.get('content-length'), 10);
    const maxBodySize = 10 * 1024 * 1024; // 10 MB

    if (contentLength > maxBodySize) {
      return NextResponse.json({ error: 'Body exceeded 10mb limit' }, { status: 413 });
    }
  }

  if (isPublicPage) {
    return intlMiddleware(req, res, next);
  } else {
    const authResult = await authMiddleware(req, res);
    return authResult;
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
