import { LayoutShell } from '@/components/layout-shell';

const documents: Record<string, { title: string; content: string[] }> = {
  privacidad: {
    title: 'Política de privacidad',
    content: [
      'Cumplimos con el Reglamento General de Protección de Datos (UE) 2016/679.',
      'Puedes solicitar exportación o borrado de tus datos escribiendo a privacidad@aurora.shop.'
    ]
  },
  terminos: {
    title: 'Términos y condiciones',
    content: [
      'Aurora Shop opera desde España bajo régimen OSS de IVA.',
      'Las compras incluyen protección al consumidor y derecho de desistimiento de 14 días.'
    ]
  },
  cookies: {
    title: 'Política de cookies',
    content: [
      'Ofrecemos banner de consentimiento granular compatible con Consent Mode v2.',
      'Puedes modificar tus preferencias en cualquier momento desde el centro de privacidad.'
    ]
  }
};

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = documents[params.slug as keyof typeof documents];

  return (
    <LayoutShell>
      <section className="container-responsive py-16">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold">{doc?.title ?? 'Documento legal'}</h1>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {(doc?.content ?? ['Este documento se publicará próximamente.']).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
