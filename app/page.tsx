import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CollectionsSection } from '@/components/home/collections-section';
import { BrandStory } from '@/components/home/brand-story';
import { CategoriesGrid } from '@/components/home/categories-grid';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramFeed } from '@/components/home/instagram-feed';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CollectionsSection />
      <BrandStory />
      <CategoriesGrid />
      <Testimonials />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
