import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'vi'
});

export default function middleware(request) {
  console.log('Middleware running for:', request.nextUrl.pathname);
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/en', '/ko']
};