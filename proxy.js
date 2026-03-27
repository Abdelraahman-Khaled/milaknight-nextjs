import { NextResponse } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export default function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // Check if it's already a localized route
  const localeIsPresent = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If already localized, check for static assets that need rewriting to root
  if (localeIsPresent) {
    if (pathname.match(/\.(woff2|svg|png|jpg|js|css)$/)) {
      const newPathname = pathname.replace(/^\/(ar|en)/, '');
      return NextResponse.rewrite(new URL(newPathname, request.url));
    }
    return;
  }

  // Handle locale missing - drive from cookie or default
  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url),
    301 // use 301 for SEO permanence
  );
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and common static extensions
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|css|webfonts|js|profile|manifest|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
