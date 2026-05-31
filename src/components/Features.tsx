import { motion } from "framer-motion";
import { Globe2, Sparkles, HeartHandshake } from "lucide-react";

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">What We Offer</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 leading-tight">We provide exactly what you need to curate your perfect collection.</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          AniYumi was created to curate and find rare JP exclusives. We handle the discovery, proxies, and tracking so you spend less time refreshing and more time enjoying your grails.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.05)] group">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-accent-purple group-hover:scale-110 transition-transform">
            <Globe2 size={24} />
          </div>
          <h3 className="text-xl font-bold text-base-dark mb-4 group-hover:text-accent-purple transition-colors">AniYumi is Global and 24/7</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            We source globally and track Japanese releases around the clock, meaning you won't miss out on those lightning-fast pre-orders.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.05)] group">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
            <Sparkles size={24} />
          </div>
          <h3 className="text-xl font-bold text-base-dark mb-4 group-hover:text-accent-purple transition-colors">Optimize Trends and Discovery</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            Using machine learning, we uncover the most sought-after statues and engagement trends, distributing alerts right to your inbox immediately.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.05)] group">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform">
            <HeartHandshake size={24} />
          </div>
          <h3 className="text-xl font-bold text-base-dark mb-4 group-hover:text-accent-purple transition-colors">Lifelong Matchmaking</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            Our team acts as your personal proxy. We find the figures you're looking for, handle negotiations, and track secure shipment to your home.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
