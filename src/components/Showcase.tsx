import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldAlert, BarChart3, Users, Star, Activity, Cpu, Hexagon, Maximize, Zap, Play } from "lucide-react";
import { useState } from "react";
import showcaseImg from "../assets/images/showcase_mecha_1779891003991.png";
import heroImg from "../assets/images/hero_anime_figure_1779890983903.png";

export function Showcase() {
  const [activeMockTab, setActiveMockTab] = useState('Details');
  const [activeInfoTab, setActiveInfoTab] = useState('Showcase');

  const renderInfoContent = () => {
    switch(activeInfoTab) {
      case 'Team':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Meet the Experts</h2>
            <p className="text-gray-400 text-lg mb-10 mr-4">
              Our team consists of veteran collectors, appraisers, and preservationists dedicated to maintaining the hobby's integrity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500/20 text-orange-400">
                   <Users size={20} />
                 </div>
                 <h4 className="font-bold text-sm">Community Driven</h4>
               </div>
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-rose-500/20 text-rose-400">
                   <Star size={20} />
                 </div>
                 <h4 className="font-bold text-sm">Veteran Curators</h4>
               </div>
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/20 text-blue-400">
                   <CheckCircle2 size={20} />
                 </div>
                 <h4 className="font-bold text-sm">Trusted Source</h4>
               </div>
            </div>
          </motion.div>
        );
      case 'Campaign':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Latest Campaigns</h2>
            <p className="text-gray-400 text-lg mb-10 mr-4">
               Participate in limited-time curation events and gain access to exclusive prototype releases before they hit the market.
            </p>
            <div className="bg-surface-light border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Zap className="text-amber-400" /> Origin Project: Genesis</h3>
              <p className="text-sm text-gray-400 mb-4">A crowdfunding initiative to bring the original mecha designs to 1/4 scales.</p>
              <div className="w-full bg-base-dark rounded-full h-2 mb-2">
                <div className="bg-accent-cyan h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs text-gray-500">75% Funded • 12 Days Left</span>
            </div>
          </motion.div>
        );
      case 'Analyzer':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Market Analyzer</h2>
            <p className="text-gray-400 text-lg mb-10 mr-4">
               Track historical price trends, auction results, and overall sentiment to make smart additions to your collection.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-surface-light border border-white/5 rounded-2xl p-5">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Global Index</p>
                 <div className="text-3xl font-display font-bold text-white flex items-center gap-3">
                   $14,290 <TrendingUp className="text-emerald-400" size={24} />
                 </div>
               </div>
               <div className="bg-surface-light border border-white/5 rounded-2xl p-5">
                 <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Market Heat</p>
                 <div className="text-3xl font-display font-bold text-white flex items-center gap-3">
                   Very High <Activity className="text-rose-400" size={24} />
                 </div>
               </div>
            </div>
          </motion.div>
        );
      case 'Showcase':
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">View Useful Statistic</h2>
            <p className="text-gray-400 text-lg mb-10 mr-4">
              For collectors wanting to verify rare items, you can always check current market valuation and authenticity records dynamically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/20 text-blue-400">
                   <BarChart3 size={20} />
                 </div>
                 <h4 className="font-bold text-sm">Market Valuation</h4>
               </div>
               
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/20 text-emerald-400">
                   <ShieldAlert size={20} />
                 </div>
                 <h4 className="font-bold text-sm">Authenticity Check</h4>
               </div>
               
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/20 text-purple-400">
                   <CheckCircle2 size={20} />
                 </div>
                 <h4 className="font-bold text-sm">Data & Box Requirements</h4>
               </div>
            </div>
          </motion.div>
        );
    }
  };

  const renderMockContent = () => {
    switch(activeMockTab) {
      case 'Specs':
        return (
          <motion.div key="Specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[300px] mb-4 bg-base-dark rounded-2xl border border-white/5 p-6 flex flex-col justify-center">
             <h4 className="text-lg font-bold mb-4 text-white">Technical Specifications</h4>
             <ul className="space-y-3">
               <li className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-gray-400"><Hexagon size={16} className="inline mr-2 text-accent-cyan" />Material</span>
                 <span className="text-white font-medium">Die-cast & ABS</span>
               </li>
               <li className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-gray-400"><Maximize size={16} className="inline mr-2 text-accent-cyan" />Scale</span>
                 <span className="text-white font-medium">1/4 Massive</span>
               </li>
               <li className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-gray-400"><CheckCircle2 size={16} className="inline mr-2 text-accent-cyan" />Articulation</span>
                 <span className="text-white font-medium">40+ Points</span>
               </li>
               <li className="flex justify-between">
                 <span className="text-gray-400"><Cpu size={16} className="inline mr-2 text-accent-cyan" />Features</span>
                 <span className="text-white font-medium">LED Integration</span>
               </li>
             </ul>
          </motion.div>
        );
      case 'Gallery':
        return (
          <motion.div key="Gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[300px] mb-4 grid grid-cols-2 grid-rows-2 gap-2">
             <div className="rounded-xl bg-surface-light overflow-hidden relative group">
               <img src={showcaseImg} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="rounded-xl bg-surface-light overflow-hidden relative group">
               <img src={heroImg} className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="rounded-xl bg-surface-light overflow-hidden relative group">
               <div className="w-full h-full flex items-center justify-center bg-base-dark border border-white/5 cursor-pointer hover:border-accent-cyan transition-colors">
                  <Play className="text-accent-cyan" size={32} />
               </div>
             </div>
             <div className="rounded-xl bg-surface-light overflow-hidden relative group">
               <img src={showcaseImg} className="w-full h-full object-cover object-bottom opacity-60 group-hover:opacity-100 transition-opacity" />
             </div>
          </motion.div>
        );
      case 'Details':
      default:
        return (
          <motion.div key="Details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative rounded-2xl overflow-hidden h-[300px] mb-4 bg-black group">
             <img 
               src={showcaseImg} 
               alt="Showcase Mecha" 
               className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-screen" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
             <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                   <h4 className="text-white font-bold text-lg">EVA Unit-01 Premium</h4>
                   <p className="text-accent-cyan text-sm">1/4 Scale • Die-cast</p>
                </div>
                <div className="bg-white text-base-dark font-bold px-3 py-1 rounded-lg text-sm">
                  $649
                </div>
             </div>
          </motion.div>
        );
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side mock UI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="relative bg-surface-light border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden group">
            {/* Mock Header */}
            <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex gap-8 text-sm font-medium ml-4">
                 <button onClick={() => setActiveMockTab('Details')} className={`${activeMockTab === 'Details' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4' : 'text-gray-400 hover:text-white transition-colors cursor-pointer'}`}>Details</button>
                 <button onClick={() => setActiveMockTab('Specs')} className={`${activeMockTab === 'Specs' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4' : 'text-gray-400 hover:text-white transition-colors cursor-pointer'}`}>Specs</button>
                 <button onClick={() => setActiveMockTab('Gallery')} className={`${activeMockTab === 'Gallery' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4' : 'text-gray-400 hover:text-white transition-colors cursor-pointer'}`}>Gallery</button>
              </div>
            </div>

            {/* Mock Content */}
            <AnimatePresence mode="wait">
               {renderMockContent()}
            </AnimatePresence>

            {/* Mock Stats below image */}
            <div className="bg-accent-purple text-white rounded-2xl p-5 flex items-center justify-between shadow-[0_10px_30px_var(--color-accent-purple-glow)]">
               <div>
                 <p className="text-purple-200 text-xs font-medium uppercase tracking-wider mb-1">Pre-order Status</p>
                 <div className="text-2xl font-bold font-display">2,194 Sold</div>
               </div>
               <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <TrendingUp size={16} />
                  <span>+12%</span>
               </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 bg-accent-cyan/10 blur-[80px] -z-10 rounded-full"></div>
          </div>
        </motion.div>

        {/* Right Side Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="flex gap-6 mb-8 text-sm font-semibold border-b border-white/10 pb-4">
             <button onClick={() => setActiveInfoTab('Showcase')} className={`${activeInfoTab === 'Showcase' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4 px-2' : 'text-gray-500 hover:text-white transition-colors px-2'}`}>Showcase</button>
             <button onClick={() => setActiveInfoTab('Team')} className={`${activeInfoTab === 'Team' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4 px-2' : 'text-gray-500 hover:text-white transition-colors px-2'}`}>Team</button>
             <button onClick={() => setActiveInfoTab('Campaign')} className={`${activeInfoTab === 'Campaign' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4 px-2' : 'text-gray-500 hover:text-white transition-colors px-2'}`}>Campaign</button>
             <button onClick={() => setActiveInfoTab('Analyzer')} className={`${activeInfoTab === 'Analyzer' ? 'text-white border-b-2 border-accent-cyan pb-4 -mb-4 px-2' : 'text-gray-500 hover:text-white transition-colors px-2'}`}>Analyzer</button>
          </div>

          <div className="relative min-h-[250px]">
             <AnimatePresence mode="wait">
               {renderInfoContent()}
             </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
