import Navbar from '@/components/Navbar';
import HeroSequence from '@/components/HeroSequence';
import dynamic from 'next/dynamic';

const BestSellers = dynamic(() => import('@/components/BestSellers'));
const Categories = dynamic(() => import('@/components/Categories'));
const Storytelling = dynamic(() => import('@/components/Storytelling'));
const Science = dynamic(() => import('@/components/Science'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const Footer = dynamic(() => import('@/components/Footer'));
const VerticalVideoSection = dynamic(() => import('@/components/VerticalVideoSection'));

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSequence />
      <BestSellers />
      <Categories />
      <Storytelling />
      <Science />
      <Reviews />
      <VerticalVideoSection />
      <Footer />
    </main>
  );
}
