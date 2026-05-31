import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { Features } from '../components/Features';
import { Showcase } from '../components/Showcase';
import { Shop } from '../components/Shop';
import { Stats } from '../components/Stats';
import { Footer } from '../components/Footer';
import { Categories } from '../components/Categories';

export function Home() {
  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-accent-purple/30">
      <Navbar />
      <Hero />
      <TrustedBy />
      <div className="bg-surface-dark relative z-10 -mt-[100px] pt-[150px] rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Features />
        <Categories />
        <Showcase />
        <Shop />
        <Stats />
        <Footer />
      </div>
    </div>
  );
}
