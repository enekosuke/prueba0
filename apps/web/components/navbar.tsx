'use client';

import { Button, cn } from '@aurora/ui';
import { ShoppingBag, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/blog', label: 'Editorial' },
  { href: '/account', label: 'Mi cuenta' }
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container-responsive flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Aurora Shop
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Cambiar tema" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild variant="default" className="hidden md:inline-flex">
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Carrito
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Abrir menú">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div className={cn('md:hidden', open ? 'block' : 'hidden')}>
        <nav className="space-y-2 border-t bg-background px-4 py-6">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block text-base font-medium">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
