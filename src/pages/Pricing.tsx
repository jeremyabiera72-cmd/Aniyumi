import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-accent-purple/30 pt-28 flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 flex-grow w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Collector Memberships</h1>
          <p className="text-gray-400 text-lg">A clear and simple membership tier to start curating your elite anime collection.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-light border border-white/5 rounded-[2rem] p-10 hover:border-white/10 transition-colors shadow-xl"
          >
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Basic</h3>
              <p className="text-gray-300 text-sm mb-6">Percentage amount fee from figure purchase.</p>
              <div className="text-6xl font-display font-bold mb-2">$0</div>
            </div>

            <div className="mb-6 space-y-4">
               <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">What's included?</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li className="flex items-center gap-3">
                   <div className="bg-gray-800 rounded-full p-1"><Check size={14} /></div>
                   Standard dashboard access
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="bg-gray-800 rounded-full p-1"><Check size={14} /></div>
                   Basic customer support
                 </li>
                 <li className="flex items-center gap-3 text-gray-500">
                   <div className="bg-transparent border border-gray-600 rounded-full p-1"><Check size={14} className="opacity-0" /></div>
                   No guaranteed pre-orders
                 </li>
                 <li className="flex items-center gap-3 text-gray-500">
                   <div className="bg-transparent border border-gray-600 rounded-full p-1"><Check size={14} className="opacity-0" /></div>
                   Standard Shipping
                 </li>
               </ul>
            </div>

            <button className="w-full bg-base-dark border border-white/10 hover:bg-white hover:text-base-dark text-white font-semibold py-4 rounded-xl transition-colors mt-8">
              Current Plan
            </button>
          </motion.div>

          {/* Premium Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white text-base-dark rounded-[2rem] p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[60px] -mr-20 -mt-20"></div>
            
            <div className="mb-8 relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent-purple mb-2">Premium</h3>
              <p className="text-gray-500 text-sm mb-6">Priority processing and guaranteed stock.</p>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-6xl font-display font-bold">$79</div>
                <div className="text-gray-500 font-medium">/ per month</div>
              </div>
            </div>

            <div className="mb-6 space-y-4 relative z-10">
               <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-4">What's included?</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li className="flex items-center gap-3">
                   <div className="bg-accent-purple/20 text-accent-purple rounded-full p-1"><Check size={14} strokeWidth={3} /></div>
                   Total dashboard access
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="bg-accent-purple/20 text-accent-purple rounded-full p-1"><Check size={14} strokeWidth={3} /></div>
                   Priority 24/7 Support
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="bg-accent-purple/20 text-accent-purple rounded-full p-1"><Check size={14} strokeWidth={3} /></div>
                   Guaranteed Pre-orders
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="bg-accent-purple/20 text-accent-purple rounded-full p-1"><Check size={14} strokeWidth={3} /></div>
                   Expedited Global Shipping
                 </li>
               </ul>
            </div>

            <Link to="/shop" className="block w-full text-center bg-accent-purple hover:bg-black text-white font-semibold py-4 rounded-xl transition-colors relative z-10 shadow-[0_10px_20px_var(--color-accent-purple-glow)] mt-8">
              Upgrade to Premium
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
