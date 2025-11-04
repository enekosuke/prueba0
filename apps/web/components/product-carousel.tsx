'use client';

import { Button } from '@aurora/ui';
import { formatMoney } from '@aurora/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import type { Product } from '@/lib/types';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const duplicated = useMemo(() => [...products, ...products], [products]);

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-background/60 p-6">
      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        {duplicated.map((product, index) => {
          const price = product.prices[0];
          return (
            <Link
              key={`${product.id}-${index}`}
              href={`/producto/${product.slug}`}
              className="flex min-w-[240px] flex-col gap-3 rounded-2xl bg-card p-4 shadow-lg"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-xl">
                <Image src={product.heroImage} alt={product.title} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-base font-semibold">{product.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{formatMoney(Number(price?.amount ?? 0), 'EUR')}</span>
                <Button variant="ghost" size="sm">
                  Ver
                </Button>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
