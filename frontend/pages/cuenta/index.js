import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import { fetchProfile, logout, updateLocalProfile } from '@/slices/userSlice';

export default function Cuenta() {
  const dispatch = useDispatch();
  const { profile, orders, favourites } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (!profile) {
    return (
      <Layout title="Cuenta">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <div className="skeleton h-6 w-32" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="skeleton h-32 rounded-3xl" />
            <div className="skeleton h-32 rounded-3xl" />
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Cuenta">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold text-white">Hola, {profile.firstName}</h1>
            <p className="mt-2 text-sm text-slate-300">Gestiona tus datos, pedidos y piezas favoritas.</p>
          </div>
          <button onClick={() => dispatch(logout())} className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200">
            Cerrar sesión
          </button>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="card-glass rounded-3xl p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">Datos personales</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Nombre', key: 'firstName' },
                { label: 'Apellidos', key: 'lastName' },
                { label: 'Email', key: 'email' },
                { label: 'Teléfono', key: 'phone' }
              ].map((field) => (
                <label key={field.key} className="text-sm text-slate-300">
                  {field.label}
                  <input
                    defaultValue={profile[field.key]}
                    onBlur={(event) => dispatch(updateLocalProfile({ [field.key]: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                  />
                </label>
              ))}
            </div>
          </article>
          <article className="card-glass rounded-3xl p-6">
            <h2 className="text-lg font-semibold text-white">Favoritos</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {favourites.map((item) => (
                <li key={item._id}>• {item.name}</li>
              ))}
              {favourites.length === 0 && <li>No tienes favoritos guardados.</li>}
            </ul>
          </article>
        </div>
        <article className="card-glass mt-6 rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-white">Historial de compras</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            {orders.map((order) => (
              <div key={order._id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="font-semibold text-white">Pedido {order.reference}</p>
                  <p>{order.items.length} artículos • {order.status}</p>
                </div>
                <div className="text-right">
                  <p>Total €{order.total.toFixed(2)}</p>
                  <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p>No hay pedidos todavía.</p>}
          </div>
        </article>
      </section>
    </Layout>
  );
}
