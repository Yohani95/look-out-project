import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'es', 'br'];
const publicPages = ['/login']; // Páginas públicas accesibles sin autenticación

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
      signIn: '/',
    }
  }
);

// Middleware principal que maneja la lógica de autenticación e internacionalización
export default async function middleware(req, res, next) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // Verificar el tamaño del cuerpo de la solicitud
  if (req.headers.has('content-length')) {
    const contentLength = parseInt(req.headers.get('content-length'), 10);
    const maxBodySize = 10 * 1024 * 1024; // 10 MB

    if (contentLength > maxBodySize) {
      return res.status(413).json({ error: 'Body exceeded 10mb limit' });
    }
  }

  // Procesar solicitudes públicas y privadas
  if (isPublicPage) {
    return intlMiddleware(req, res, next);
  } else {
    const authResult = await authMiddleware(req, res);
    return authResult;
  }
}

// Configuración opcional para el matcher
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
