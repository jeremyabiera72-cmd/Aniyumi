import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ShoppingCart, Truck, ShieldCheck, Heart, Share2, Star } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useAppContext();
  const product = products.find(p => p.id === id || p.id === Number(id).toString());
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-base-dark text-white pt-24 font-sans flex flex-col items-center justify-center">
        <Navbar />
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-accent-cyan hover:underline">&larr; Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-dark text-white selection:bg-accent-purple/30 pt-28 flex flex-col">
      <Navbar />
      
      <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-8 flex-grow">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center text-sm">
          <Link to="/shop" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
          </Link>
          <span className="text-gray-600 mx-3">/</span>
          <span className="text-gray-400">{product.category}</span>
          <span className="text-gray-600 mx-3">/</span>
          <span className="text-gray-200 truncate">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-light border border-white/5 rounded-3xl p-8 aspect-square flex items-center justify-center relative shadow-2xl"
            >
              {product.stock && product.stock < 10 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  Low Stock
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-[300px] h-[300px] bg-accent-purple/20 rounded-full blur-[80px]"></div>
              </div>
              <img src={product.image} alt={product.name} className="h-[90%] w-auto object-contain mix-blend-screen relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-2">
               <span className="text-accent-cyan font-semibold text-sm tracking-widest uppercase">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1 text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" className="opacity-50" />
              </div>
              <span className="text-gray-400 text-sm">(24 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{product.price}</span>
              {product.oldPrice && <span className="text-lg text-gray-500 line-through pb-1">{product.oldPrice}</span>}
            </div>

            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Exquisitely detailed {product.scale} collector's piece. Featuring premium materials and intricate paint applications, this figure accurately captures the dynamic essence of the character. Ideal for centerpiece display.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-24 text-gray-500">Scale</div>
                <div className="text-white">{product.scale}</div>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-24 text-gray-500">Stock</div>
                <div className={product.stock && product.stock < 10 ? "text-red-400" : "text-emerald-400"}>{product.stock} Units Available</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex gap-4 h-14">
                <div className="flex items-center justify-between px-4 bg-surface-dark border border-white/10 rounded-xl w-32 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-white p-2">-</button>
                  <span className="font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-white p-2">+</button>
                </div>
                
                <button 
                  onClick={() => addToCart({ ...product, quantity })}
                  className="flex-grow bg-accent-purple hover:bg-white hover:text-base-dark text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_var(--color-accent-purple-glow)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsLiked(!isLiked)} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors ${isLiked ? 'border-pink-500 text-pink-500 bg-pink-500/10' : 'border-white/10 text-gray-400 hover:text-white bg-surface-light'}`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} /> {isLiked ? "Saved" : "Save"}
                </button>
                <button className="w-14 rounded-xl border border-white/10 text-gray-400 hover:text-white bg-surface-light flex items-center justify-center transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-400 shrink-0" size={20} />
                <span className="text-sm text-gray-300">100% Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-accent-cyan shrink-0" size={20} />
                <span className="text-sm text-gray-300">Insured Global Shipping</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
