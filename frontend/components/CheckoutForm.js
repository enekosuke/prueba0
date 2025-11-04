import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PaymentOptions from '@/components/PaymentOptions';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function CheckoutForm({ totals }) {
  const { register, handleSubmit, formState } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post('/orders', { ...values, paymentMethod });
      toast.success('Pedido creado, redirigiendo al pago seguro');
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'No se pudo procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-slate-300">Nombre</label>
          <input
            {...register('firstName', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
          {formState.errors.firstName && <p className="mt-1 text-xs text-red-300">{formState.errors.firstName.message}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-300">Apellidos</label>
          <input
            {...register('lastName', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
          {formState.errors.lastName && <p className="mt-1 text-xs text-red-300">{formState.errors.lastName.message}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Teléfono</label>
          <input
            type="tel"
            {...register('phone', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-300">Dirección</label>
        <input
          {...register('address', { required: 'Campo obligatorio' })}
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm text-slate-300">Ciudad</label>
          <input
            {...register('city', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Código Postal</label>
          <input
            {...register('postalCode', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">País</label>
          <input
            {...register('country', { required: 'Campo obligatorio' })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          />
        </div>
      </div>
      <PaymentOptions value={paymentMethod} onChange={setPaymentMethod} totals={totals} />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/80 disabled:opacity-60"
      >
        {loading ? 'Procesando...' : 'Confirmar y pagar'}
      </button>
    </form>
  );
}
