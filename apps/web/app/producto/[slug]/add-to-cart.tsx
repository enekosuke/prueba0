'use client';

import { Button } from '@aurora/ui';
import { formatMoney } from '@aurora/utils';
import { useState } from 'react';

import type { Variant } from '@/lib/types';
import { useCartStore } from '@/stores/cart-store';

interface AddToCartProps {
  variants: Variant[];
  currency: 'EUR' | 'USD';
}

export const AddToCart = ({ variants, currency }: AddToCartProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const variant = variants.find((item) => item.id === selectedVariant) ?? variants[0];
  const unitPrice = Number(variant?.price ?? variants[0]?.price ?? 0);
  const totalPrice = unitPrice * quantity;
  const priceLabel = formatMoney(totalPrice, currency);

  const handleAdd = async () => {
    if (!selectedVariant) {
      setFeedback('Selecciona una variante para continuar.');
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await addItem(selectedVariant, quantity);
      setFeedback('Producto añadido al carrito.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'No fue posible añadir el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="variant" className="text-sm font-medium text-muted-foreground">
          Variante
        </label>
        <select
          id="variant"
          className="w-full rounded-3xl border bg-background px-4 py-2 text-sm"
          value={selectedVariant}
          onChange={(event) => setSelectedVariant(event.target.value)}
        >
          {variants.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} · {formatMoney(Number(item.price ?? unitPrice), currency)} · Stock{' '}
              {item.inventory?.stock ?? item.stock ?? 0}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="quantity" className="text-sm font-medium text-muted-foreground">
            Cantidad
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(event) => {
              const next = Number(event.target.value);
              setQuantity(Number.isNaN(next) ? 1 : Math.min(10, Math.max(1, next)));
            }}
            className="mt-1 w-24 rounded-2xl border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-muted-foreground">Total estimado</p>
          <p className="text-lg font-semibold text-foreground">{priceLabel}</p>
          <p className="text-xs text-muted-foreground">
            Precio unitario {formatMoney(unitPrice, currency)} · IVA calculado en el carrito
          </p>
        </div>
      </div>
      <Button className="w-full" size="lg" onClick={handleAdd} disabled={isSubmitting}>
        {isSubmitting ? 'Añadiendo…' : 'Añadir al carrito'}
      </Button>
      {feedback && <p className="text-sm text-muted-foreground">{feedback}</p>}
    </div>
  );
};
