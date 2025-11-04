import type { ReactNode } from 'react';

import { Navbar } from './navbar';
import { Footer } from './footer';

export const LayoutShell = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);
