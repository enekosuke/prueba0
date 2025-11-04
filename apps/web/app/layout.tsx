import './globals.css';

import { cn } from '@aurora/ui';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Aurora Shop',
  description: 'Ecommerce moderno y elegante para experiencias memorables.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(inter.variable, 'min-h-screen bg-background font-sans text-base')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
