import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';

const ExperiencePreview = dynamic(() => import('@/components/ExperiencePreview'));
const EditorialHighlights = dynamic(() => import('@/components/EditorialHighlights'));

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ProductCarousel />
      <PersonalizedRecommendations />
      <ExperiencePreview />
      <EditorialHighlights />
    </Layout>
  );
}
