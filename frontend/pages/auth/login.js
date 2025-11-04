import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import { login, socialLogin } from '@/slices/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { status, error } = useSelector((state) => state.user);

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  const handleSocial = (provider) => {
    dispatch(socialLogin({ provider, token: 'mock-token' }));
  };

  return (
    <Layout title="Acceso">
      <section className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-3xl font-semibold text-white">Accede a tu cuenta</h1>
        <p className="mt-2 text-sm text-slate-300">
          Inicia sesión con correo o usa acceso rápido con Google o Facebook.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Contraseña</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            />
          </div>
          {error && <p className="text-xs text-red-300">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white"
          >
            {status === 'loading' ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => handleSocial('google')}
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
          >
            Continuar con Google
          </button>
          <button
            onClick={() => handleSocial('facebook')}
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
          >
            Continuar con Facebook
          </button>
        </div>
      </section>
    </Layout>
  );
}
