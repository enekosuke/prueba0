import { LayoutShell } from '@/components/layout-shell';

const metrics = [
  { label: 'Ventas 7d', value: '€48.2K', delta: '+18% vs semana previa' },
  { label: 'Conversion rate', value: '3.7%', delta: '+0.6 puntos' },
  { label: 'Clientes activos', value: '12.4K', delta: '+9% mensual' }
];

export default function AdminDashboardPage() {
  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="space-y-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Panel ejecutivo</p>
              <h1 className="mt-2 text-3xl font-bold">Indicadores clave</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Seguimiento en tiempo real de ventas, márgenes, engagement y estado operativo de pedidos, envíos y promociones.
              </p>
            </div>
            <a href="/admin" className="rounded-full border px-4 py-2 text-sm font-medium">
              Volver a ajustes
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-emerald-500">{metric.delta}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border bg-muted/30 p-6">
            <h2 className="text-lg font-semibold">Resumen de operaciones</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Pedidos pendientes: 42 (procesados automáticamente con reglas BullMQ)</li>
              <li>• Incidencias logísticas: 2 envíos en revisión con Sendcloud</li>
              <li>• Webhooks activos: Stripe, PayPal, Sendcloud, Meilisearch</li>
            </ul>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
