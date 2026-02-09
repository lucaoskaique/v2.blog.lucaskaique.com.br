import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

// Supported locales for your application
const SUPPORTED_LOCALES = ['pt-BR', 'en'];
const DEFAULT_LOCALE = 'pt-BR';
const LOCALE_COOKIE = 'NEXT_LOCALE';

// Mapping of countries to locales (fallback for IP-based detection)
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  // English-speaking countries
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ZA: 'en',

  // Portuguese-speaking countries
  BR: 'pt-BR',
  PT: 'pt-BR',
  AO: 'pt-BR',
  MZ: 'pt-BR',
};

/**
 * Get locale from Accept-Language header (primary method)
 * This respects the user's browser language preferences
 */
function getLocaleFromAcceptLanguage(request: NextRequest): string | null {
  try {
    const acceptLanguage = request.headers.get('accept-language');
    if (!acceptLanguage) return null;

    const headers = { 'accept-language': acceptLanguage };
    const languages = new Negotiator({ headers }).languages();

    // Use intl-localematcher to find the best match
    const locale = match(languages, SUPPORTED_LOCALES, DEFAULT_LOCALE);

    return locale;
  } catch (error) {
    console.error('Error parsing Accept-Language header:', error);
    return null;
  }
}

/**
 * Get country from IP address (fallback method)
 * Only used when Accept-Language header doesn't provide a clear preference
 */
async function getCountryFromIP(ip: string | null): Promise<string | null> {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    // Local development - return null to use default
    return null;
  }

  try {
    // Using ipapi.co free API (no key required for basic usage)
    // Limit: 1000 requests/day on free tier
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      headers: {
        'User-Agent': 'nodejs',
      },
      // Add timeout
      signal: AbortSignal.timeout(3000),
    });

    if (response.ok) {
      const country = await response.text();
      return country.trim();
    }
  } catch (error) {
    console.error('Error fetching country from IP:', error);
  }

  return null;
}

function getLocaleFromCountry(country: string | null): string {
  if (!country) return DEFAULT_LOCALE;
  return COUNTRY_LOCALE_MAP[country] || DEFAULT_LOCALE;
}

function getIPFromRequest(request: NextRequest): string | null {
  // Try different headers for IP address
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Vercel uses x-forwarded-for, other platforms may use different headers
  // In development, this will return null and default locale will be used
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip middleware for non-page routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Always redirect root path to default locale
  if (pathname === '/') {
    const newUrl = new URL(`/${DEFAULT_LOCALE}${search}`, request.url);
    const response = NextResponse.redirect(newUrl);
    response.cookies.set(LOCALE_COOKIE, DEFAULT_LOCALE, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
    return response;
  }

  // Check if user already has a locale cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  // Check if URL already has a locale prefix
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If user has a cookie preference and URL doesn't have locale, redirect
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale) && !pathnameHasLocale) {
    const newUrl = new URL(`/${cookieLocale}${pathname}${search}`, request.url);
    const response = NextResponse.redirect(newUrl);
    return response;
  }

  // If URL already has a locale, just set the cookie and continue
  if (pathnameHasLocale) {
    const currentLocale = SUPPORTED_LOCALES.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (currentLocale && currentLocale !== cookieLocale) {
      const response = NextResponse.next();
      response.cookies.set(LOCALE_COOKIE, currentLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });
      return response;
    }

    return NextResponse.next();
  }

  // No cookie and no locale in URL - detect locale using multiple strategies
  let detectedLocale = DEFAULT_LOCALE;

  // Strategy 1: Check Accept-Language header (browser preference)
  const browserLocale = getLocaleFromAcceptLanguage(request);
  if (browserLocale && SUPPORTED_LOCALES.includes(browserLocale)) {
    detectedLocale = browserLocale;

    if (process.env.NODE_ENV === 'development') {
      console.log(`Locale detected from Accept-Language: ${browserLocale}`);
    }
  } else {
    // Strategy 2: Fallback to IP-based detection
    const ip = getIPFromRequest(request);
    const country = await getCountryFromIP(ip);
    if (country) {
      detectedLocale = getLocaleFromCountry(country);

      if (process.env.NODE_ENV === 'development') {
        console.log(`Locale detected from IP: ${ip} -> ${country} -> ${detectedLocale}`);
      }
    }
  }

  // Redirect to detected locale
  const newUrl = new URL(`/${detectedLocale}${pathname}${search}`, request.url);
  const response = NextResponse.redirect(newUrl);

  // Set cookie to remember preference
  response.cookies.set(LOCALE_COOKIE, detectedLocale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });

  return response;
}

// Configure which routes should run through middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
