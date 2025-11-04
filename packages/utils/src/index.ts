import currency from 'currency.js';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export type SupportedCurrency = 'EUR' | 'USD';

export const formatMoney = (value: number, currencyCode: SupportedCurrency) =>
  currency(value, { symbol: currencyCode === 'EUR' ? '€' : '$', precision: 2 }).format();

export const formatDate = (input: Date | string, locale: 'es' | 'en' = 'es') =>
  format(new Date(input), 'PPPP', { locale: locale === 'es' ? es : enUS });

export const buildCsp = (nonce: string) =>
  [
    "default-src 'self'",
    "img-src 'self' data: blob:",
    "script-src 'self' 'nonce-" + nonce + "'",
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self' https://api.stripe.com https://*.paypal.com",
    "frame-src 'self' https://js.stripe.com https://*.paypal.com"
  ].join('; ');

