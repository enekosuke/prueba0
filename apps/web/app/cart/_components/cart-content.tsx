'use client';

import { Button } from '@aurora/ui';
import { formatMoney } from '@aurora/utils';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { useCartStore } from '@/stores/cart-store';

const SHIPPING_MESSAGE = 'Calculado en checkout';

export const CartContent = () => {
  const { cart, status, error, ensureCart, updateItem, removeItem, applyCoupon } = useCartStore((state) => ({
    cart: state.cart,
    status: state.status,
    error: state.error,
    ensureCart: state.ensureCart,
    updateItem: state.updateItem,
    removeItem: state.removeItem,
    applyCoupon: state.applyCoupon
  }));
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  useEffect(() => {
    ensureCart().catch(() => {
      // handled in store state
    });
  }, [ensureCart]);

  useEffect(() => {
    if (status === 'error' && error) {
      setCouponFeedback(error);
    }
  }, [status, error]);

  const isLoading = status === 'loading' || !cart;

  const totals = useMemo(
    () => ({
      subtotal: formatMoney(cart?.totals.subtotal ?? 0, cart?.currency ?? 'EUR'),
      taxes: formatMoney(cart?.totals.taxes ?? 0, cart?.currency ?? 'EUR'),
      total: formatMoney(cart?.totals.total ?? 0, cart?.currency ?? 'EUR')
    }),
    [cart?.totals, cart?.currency]
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-40 animate-pulse rounded-3xl bg-muted" />
        <div className="h-32 animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
        No pudimos recuperar tu carrito. Inténtalo de nuevo más tarde.
      </div>
    );
  }

  const handleQuantityChange = async (itemId: string, nextQuantity: number) => {
    await updateItem(itemId, nextQuantity);
  };

  const handleRemove = async (itemId: string) => {
    await removeItem(itemId);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      setCouponFeedback('Introduce un código válido.');
      return;
    }

    try {
      await applyCoupon(couponCode);
      setCouponCode('');
      setCouponFeedback('¡Cupón aplicado correctamente!');
    } catch (couponError) {
      setCouponFeedback(couponError instanceof Error ? couponError.message : 'No fue posible aplicar el cupón');
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tu carrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gestiona las cantidades, aplica cupones y confirma tu pedido con reservas de stock en tiempo real.
          </p>
        </div>
        {cart.items.length === 0 ? (
          <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
            Añade productos desde el catálogo para comenzar tu experiencia de compra.
          </div>
        ) : (
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li key={item.id} className="flex flex-col gap-4 rounded-3xl border bg-card/60 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-primary/70">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                      {item.variantName}
                    </span>
                    <span className="text-muted-foreground">{item.productTitle}</span>
                  </div>
                  <dl className="grid gap-1 text-sm text-muted-foreground md:grid-cols-2">
                    <div>
                      <dt className="font-medium text-foreground">Precio unidad</dt>
                      <dd>{formatMoney(item.unitPrice, cart.currency)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Importe</dt>
                      <dd>{formatMoney(item.total, cart.currency)}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="font-medium text-foreground">Atributos</dt>
                      <dd>
                        {Object.entries(item.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(' · ')}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="font-medium text-foreground">Stock disponible</dt>
                      <dd>{item.stock} unidades</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                  <div className="flex items-center gap-2 text-sm">
                    <label htmlFor={`quantity-${item.id}`} className="text-muted-foreground">
                      Cantidad
                    </label>
                    <select
                      id={`quantity-${item.id}`}
                      className="rounded-full border bg-background px-3 py-1 text-sm"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(item.id, Number(event.target.value))}
                    >
                      {[...Array(Math.min(10, Math.max(5, item.stock || 5))).keys()].map((index) => {
                        const value = index + 1;
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                      <option value={0}>0 (Eliminar)</option>
                    </select>
                  </div>
                  <Button variant="ghost" className="text-sm" onClick={() => handleRemove(item.id)}>
                    Eliminar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="rounded-3xl border bg-muted/30 p-6">
          <h2 className="text-lg font-semibold">¿Tienes un cupón?</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
              placeholder="Introduce tu código"
              className="flex-1 rounded-full border bg-background px-4 py-2 text-sm"
            />
            <Button onClick={handleApplyCoupon} disabled={status === 'loading'}>
              Aplicar
            </Button>
          </div>
          {couponFeedback && <p className="mt-3 text-sm text-muted-foreground">{couponFeedback}</p>}
        </div>
      </div>
      <aside className="space-y-6 rounded-3xl border bg-card p-6">
        <div>
          <h2 className="text-lg font-semibold">Resumen</h2>
          <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{totals.subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Impuestos (IVA)</dt>
              <dd>{totals.taxes}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Envío estimado</dt>
              <dd>{SHIPPING_MESSAGE}</dd>
            </div>
            {cart.totals.discounts > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <dt>Descuentos</dt>
                <dd>-{formatMoney(cart.totals.discounts, cart.currency)}</dd>
              </div>
            )}
            {cart.coupons.length > 0 && (
              <div className="space-y-1 text-xs">
                <dt className="font-medium text-foreground">Cupones aplicados</dt>
                {cart.coupons.map((coupon) => (
                  <dd key={coupon.id} className="flex justify-between text-muted-foreground">
                    <span>{coupon.code}</span>
                    <span>-{formatMoney(coupon.value, cart.currency)}</span>
                  </dd>
                ))}
              </div>
            )}
            <div className="flex justify-between font-semibold text-foreground">
              <dt>Total</dt>
              <dd>{totals.total}</dd>
            </div>
          </dl>
        </div>
        <Button size="lg" className="w-full" asChild>
          <Link href="/checkout">Ir al checkout</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Las reservas de stock se mantienen durante 20 minutos una vez inicies el checkout. Recibirás un resumen con impuestos
          desglosados al confirmar el pago.
        </p>
      </aside>
    </div>
  );
};
