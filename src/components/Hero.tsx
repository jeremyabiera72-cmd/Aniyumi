import { motion } from "framer-motion";
import heroImg from "../assets/images/hero_anime_figure_1779890983903.png";
import showcaseImg from "../assets/images/showcase_mecha_1779891003991.png";
import shopImg1 from "../assets/images/shop_fig_1_1779891493551.png";
import shopImg2 from "../assets/images/shop_fig_2_1779891512682.png";

import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Background glow effects and Full-screen Image */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden bg-base-dark">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[100px]" />
        
        {/* The character image filling the background */}
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImg} 
          alt="Anime Figure" 
          className="absolute h-[110%] w-[110%] md:h-full md:w-full object-cover object-center mix-blend-screen drop-shadow-[0_0_50px_rgba(157,78,221,0.5)]" 
          style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }} 
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto text-center mt-12 md:mt-8 pointer-events-auto">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent-purple/30 bg-accent-purple/10 backdrop-blur-md text-accent-purple text-xs font-bold uppercase tracking-widest shadow-lg"
        >
          Premium Figures
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-xl"
        >
          A seamless way to collect <br className="hidden md:block" />
          <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">Premium Anime Figures</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 font-medium mb-8 max-w-2xl mx-auto backdrop-blur-sm px-4 py-2 rounded-2xl bg-black/10 border border-white/5"
        >
          AniYumi is the ultimate destination for authentic, high-end anime statues and mecha models. Pre-order exclusives, track your collection, and secure limited drops.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link to="/shop" className="w-full sm:w-auto text-center bg-accent-cyan hover:bg-white text-base-dark font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_var(--color-accent-cyan-glow)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] relative z-30">
            Explore Catalog
          </Link>
          <Link to="/about" className="w-full sm:w-auto text-center border border-white/20 bg-surface-dark/80 backdrop-blur-xl hover:bg-white/10 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg relative z-30 pointer-events-auto cursor-pointer">
            About Us
          </Link>
        </motion.div>
      </div>

      {/* Floating Cards simulating blueprint layout - positioned absolutely across the whole hero section */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden max-w-[1600px] mx-auto">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-32 lg:right-[4%] xl:right-[8%] bg-surface-dark/80 border border-white/10 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] w-[260px]"
        >
           <div className="flex items-center gap-3 mb-3">
             <img src={heroImg} alt="Limited Editions" className="w-14 h-14 rounded-2xl border-2 border-accent-purple/50 object-cover shadow-lg" />
             <h4 className="font-semibold text-base text-white">Limited Editions</h4>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed px-1">Access to rare 1/7 scale pre-orders with premium die-cast elements.</p>
        </motion.div>

        <motion.div 
           animate={{ y: [0, 15, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="hidden md:block absolute top-48 lg:left-[4%] xl:left-[8%] bg-surface-dark/80 border border-white/10 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] w-[260px]"
        >
           <div className="flex items-center gap-3 mb-3">
             <img src={shopImg2} alt="Handcrafted" className="w-14 h-14 rounded-2xl border-2 border-amber-500/50 object-cover object-top shadow-lg" />
             <h4 className="font-semibold text-base text-white">Handcrafted Detail</h4>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed px-1">Exquisite paint applications and intricate sculpting by master artists.</p>
        </motion.div>

        <motion.div 
           animate={{ y: [0, -12, 0] }}
           transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="hidden md:block absolute bottom-32 lg:right-[4%] xl:right-[8%] bg-surface-dark/80 border border-white/10 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] w-[260px]"
        >
           <div className="flex items-center gap-3 mb-3">
             <img src={showcaseImg} alt="Global Shipping" className="w-14 h-14 rounded-2xl border-2 border-accent-cyan/50 object-cover shadow-lg" />
             <h4 className="font-semibold text-base text-white">Global Shipping</h4>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed px-1">Secure, fully insured delivery mapping directly from Tokyo to your door.</p>
        </motion.div>

         <motion.div 
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
           className="hidden lg:block absolute bottom-24 lg:left-[6%] xl:left-[10%] bg-surface-dark/80 border border-white/10 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] w-[260px]"
        >
           <div className="flex items-center gap-3 mb-3">
             <img src={shopImg1} alt="100% Authentic" className="w-14 h-14 rounded-2xl border-2 border-emerald-500/50 object-cover object-top shadow-lg" />
             <h4 className="font-semibold text-base text-white">100% Authentic</h4>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed px-1">Verified items sourced exclusively from official manufacturer channels.</p>
        </motion.div>
      </div>

    </section>
  );
}
