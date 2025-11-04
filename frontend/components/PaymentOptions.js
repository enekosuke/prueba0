import Image from 'next/image';

const methods = [
  {
    id: 'stripe',
    label: 'Stripe',
    description: 'Pago con tarjeta protegido por 3D Secure.',
    logo: '/images/stripe.svg'
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Conéctate con tu cuenta PayPal en un clic.',
    logo: '/images/paypal.svg'
  }
];

export default function PaymentOptions({ value, onChange, totals }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium text-slate-300">Método de pago</legend>
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition ${
            value === method.id ? 'border-secondary bg-white/10' : 'border-white/10 bg-white/5'
          }`}
        >
          <div>
            <p className="font-semibold text-white">{method.label}</p>
            <p className="text-xs text-slate-400">{method.description}</p>
            {method.id === 'stripe' && (
              <p className="mt-2 text-xs text-slate-500">Se cobrará €{totals.total.toFixed(2)}.</p>
            )}
          </div>
          <input
            type="radio"
            name="payment"
            checked={value === method.id}
            onChange={() => onChange(method.id)}
          />
          <div className="relative h-6 w-20">
            <Image src={method.logo} alt={method.label} fill className="object-contain" />
          </div>
        </label>
      ))}
    </fieldset>
  );
}
