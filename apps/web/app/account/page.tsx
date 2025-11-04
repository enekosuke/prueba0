import { Button } from '@aurora/ui';

import { LayoutShell } from '@/components/layout-shell';

export default function AccountPage() {
  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Centro de clientes</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Gestiona tus pedidos, direcciones, métodos de pago, favoritos y preferencias de privacidad con autenticación multifactor.
              </p>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <h2 className="text-lg font-semibold">Historial de pedidos</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Una vez conectado, verás tus pedidos con seguimiento de envío, facturas descargables y solicitudes de devolución.
              </p>
              <Button className="mt-4">Iniciar sesión</Button>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-3xl border bg-muted/40 p-6">
              <h3 className="text-base font-semibold">Seguridad reforzada</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Activamos 2FA opcional, OAuth con Google/Facebook y detección de sesiones sospechosas con revocación automática.
              </p>
            </div>
            <div className="rounded-3xl border bg-muted/40 p-6">
              <h3 className="text-base font-semibold">Preferencias de comunicación</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Control granular sobre newsletters, promociones y notificaciones críticas cumpliendo con GDPR.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </LayoutShell>
  );
}
