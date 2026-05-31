import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function About() {
  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-accent-purple/30 pt-28 flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 flex-grow w-full text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white pt-10">About Us</h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto">
          AniYumi was founded with a single mission: to provide collectors worldwide with a seamless, authentic, and premium platform for acquiring the finest anime figures, mecha kits, and statues directly from Japan. 
        </p>
        <p className="text-gray-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
          Our specialized team bridges the gap between official Japanese studios and global fans, offering 100% genuine products, guaranteed pre-orders, and insured shipping. We curate only the best because we are collectors ourselves.
        </p>
      </div>
      <Footer />
    </div>
  );
}
