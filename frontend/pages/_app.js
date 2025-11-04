import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import store from '@/store';

const defaultSEO = {
  title: 'Lumina Boutique',
  description: 'Boutique de lujo con experiencias inmersivas, checkout seguro y recomendaciones inteligentes.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://lumina-boutique.com',
    site_name: 'Lumina Boutique'
  }
};

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DefaultSeo {...defaultSEO} />
        <Component {...pageProps} />
        <Toaster position="top-right" toastOptions={{ style: { background: '#0F172A', color: '#fff' } }} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
