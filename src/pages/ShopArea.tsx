import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Shield, Sword, Ghost, Sparkles, Gem, ShoppingCart } from 'lucide-react';
import heroImg from '../assets/images/hero_anime_figure_1779890983903.png';
import shopImg2 from '../assets/images/shop_fig_2_1779891512682.png';

const RadioOption = ({ label, checked }: { label: string, checked?: boolean }) => (
  <label className="flex items-center gap-3 cursor-pointer group mb-3">
    <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${checked ? 'border-accent-purple' : 'border-white/20 group-hover:border-white/50'}`}>
      {checked && <div className="w-2.5 h-2.5 bg-accent-purple rounded-full" />}
    </div>
    <span className={`text-sm transition-colors ${checked ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
      {label}
    </span>
  </label>
);

import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { addToCart } = useAppContext();
  
  return (
  <Link to={`/product/${product.id}`} className="flex flex-col group cursor-pointer w-full h-full p-3 bg-surface-light/30 rounded-[2rem] border border-white/5 hover:bg-surface-light transition-colors relative">
    <div className="bg-surface-light rounded-3xl p-4 aspect-square flex flex-col items-center justify-center mb-4 relative overflow-hidden ring-1 ring-white/5 group-hover:ring-accent-purple/50 transition-all duration-300">
      <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-500" />
    </div>
    <h4 className="font-bold text-sm text-white truncate px-1">{product.name}</h4>
    <div className="text-xs text-gray-500 mb-2 px-1">{product.scale}</div>
    <div className="flex items-end gap-2 mb-1 px-1">
      <span className="font-bold text-base text-white">{product.price}</span>
      <span className="text-xs text-gray-500 line-through pb-0.5">{product.oldPrice}</span>
    </div>
    <div className="text-xs font-semibold text-accent-cyan px-1 mb-2">{product.stock} Left</div>
    <button 
      onClick={(e) => { 
        e.preventDefault(); 
        addToCart(product);
      }} 
      className="w-full bg-white/5 hover:bg-accent-purple text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto relative z-10"
    >
      <ShoppingCart size={16} />
      Add to Cart
    </button>
  </Link>
  );
};

export function ShopArea() {
  const { products, isLoading } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    { name: 'All', icon: <Star size={16} /> },
    { name: 'Scale Figures', icon: <Star size={16} /> },
    { name: 'Mecha', icon: <Sword size={16} /> },
    { name: 'Action Figures', icon: <Shield size={16} /> },
    { name: 'Idols', icon: <Sparkles size={16} /> },
    { name: 'Dark Fantasy', icon: <Ghost size={16} /> },
    { name: 'Exclusive', icon: <Gem size={16} /> },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-accent-purple/30 pt-28 flex flex-col">
      <Navbar />
      
      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 py-4 flex flex-col lg:flex-row gap-8 lg:gap-12 flex-grow">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-lg text-white">Filters</h2>
            <button onClick={() => setActiveCategory('All')} className="text-accent-purple text-sm font-medium hover:underline">Reset</button>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-white mb-4">Status</h3>
            <RadioOption label="Deals" />
            <RadioOption label="New Arrivals" checked />
            <RadioOption label="Pre-order" />
            <RadioOption label="In Stock" />
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-white mb-4">Price</h3>
            <RadioOption label="All" checked />
            <RadioOption label="$0-$50" />
            <RadioOption label="$50-$150" />
            <RadioOption label="$150 & Above" />
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-white mb-4">Studio</h3>
            <RadioOption label="All" checked />
            <RadioOption label="Good Smile Company" />
            <RadioOption label="Bandai Spirits" />
            <RadioOption label="Kotobukiya" />
            <RadioOption label="Alter" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow min-w-0">
          
          {/* Top Categories Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <button 
              onClick={() => setActiveCategory('All')} 
              className={`text-sm font-medium mr-4 transition-colors ${activeCategory !== 'All' ? 'text-accent-purple hover:underline hover:text-accent-purple/80' : 'text-gray-500 cursor-default'}`}
            >
              Reset
            </button>
            {categories.filter(cat => cat.name !== 'All').map(cat => (
              <div 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border cursor-pointer transition-colors shadow-sm ${
                  activeCategory === cat.name 
                  ? 'border-accent-purple bg-accent-purple/10 text-white shadow-[0_4px_20px_rgba(157,78,221,0.3)]'
                  : 'border-white/10 bg-surface-light text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.icon}
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Promo Banners */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-12">
            <div className="bg-gradient-to-r from-blue-900/50 to-accent-cyan/20 border border-accent-cyan/30 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center min-h-[220px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 w-2/3">
                <span className="bg-blue-600/80 text-white text-[10px] uppercase font-bold px-2 py-1 rounded inline-block mb-3 tracking-wider">Summer Drops • Jun 7th</span>
                <h3 className="text-3xl font-display font-bold text-white leading-tight mb-2">Save up to <br/><span className="text-accent-cyan text-4xl">50% off</span></h3>
                <p className="text-sm text-gray-300 font-medium">Exclusive pre-order sale</p>
              </div>
              <img src={heroImg} alt="Promo 1" className="absolute -right-4 -bottom-4 h-48 object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]" />
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-pink-600/20 border border-accent-purple/30 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center min-h-[220px]">
               <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 w-2/3">
                 <span className="bg-pink-600/80 text-white text-[10px] uppercase font-bold px-2 py-1 rounded inline-block mb-3 tracking-wider">618 Shopping Festival</span>
                 <h3 className="text-3xl font-display font-bold text-white leading-tight mb-2">Limited <br/><span className="text-pink-400 text-4xl">Editions</span></h3>
                 <p className="text-sm text-gray-300 font-medium">Fill your collection with rarities</p>
               </div>
               <img src={shopImg2} alt="Promo 2" className="absolute -right-4 -bottom-4 h-48 object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(255,100,200,0.3)]" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold font-display text-white">{activeCategory === 'All' ? 'All Products' : activeCategory}</h3>
              <div className="text-sm text-gray-400">{filteredProducts.length} items</div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-surface-light border border-white/5 rounded-3xl">
                <Ghost size={48} className="mx-auto text-gray-500 mb-4 opacity-50" />
                <h4 className="text-xl font-bold text-white mb-2">No products found</h4>
                <p className="text-gray-400">Try selecting a different category or resetting filters.</p>
              </div>
            )}
          </div>

        </main>
      </div>
      
      <Footer />
    </div>
  );
}
