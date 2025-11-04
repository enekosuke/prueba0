import { Button } from '@aurora/ui';

import { LayoutShell } from '@/components/layout-shell';

export default function CheckoutPage() {
  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Checkout protegido</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Completa el flujo en tres pasos: datos de envío, pago seguro (Stripe / PayPal) y confirmación con factura PDF.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="rounded-3xl border bg-card p-6">
                <p className="text-sm font-semibold text-muted-foreground">Paso {step}</p>
                <h2 className="mt-2 text-lg font-semibold">Formulario guiado</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Validación en tiempo real con React Hook Form + Zod, autocompletado de direcciones y verificación 3DS.
                </p>
              </div>
            ))}
          </div>
          <Button size="lg" asChild className="w-full sm:w-auto">
            <a href="/">Volver a la tienda</a>
          </Button>
        </div>
      </section>
    </LayoutShell>
  );
}
