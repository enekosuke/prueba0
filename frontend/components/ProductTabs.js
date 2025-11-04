import { useState } from 'react';

const tabs = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'especificaciones', label: 'Especificaciones' },
  { id: 'cuidado', label: 'Cuidado' }
];

export default function ProductTabs({ product }) {
  const [active, setActive] = useState('descripcion');

  const content = {
    descripcion: product.description,
    especificaciones: product.specifications?.join(' • ') || 'Hecho a mano con materiales éticos y certificados.',
    cuidado: product.care || 'Limpieza suave con paño de microfibra. Guardar en bolsa protectora Lumina.'
  };

  return (
    <div className="card-glass rounded-3xl p-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
              active === tab.id ? 'bg-secondary text-slate-900' : 'bg-white/5 text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-slate-300">{content[active]}</p>
    </div>
  );
}
