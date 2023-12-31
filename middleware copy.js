import { createIntlMiddleware } from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'de'];
const publicPages = [
  '/'
  // (/secret requires auth)
];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/',
    }
  }
);

export default function middleware(req) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
