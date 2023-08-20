import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'es','br'];
const publicPages = ['/login']; // Solo la página de inicio de sesión está disponible para usuarios no autenticados

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/'
    }
  }
);

export default async function middleware(req, res, next) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req, res, next);
  } else {
    const authResult = await authMiddleware(req, res);
    return authResult;
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
