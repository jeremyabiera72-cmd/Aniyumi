import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export function Shop() {
  const { addToCart, products } = useAppContext();
  const topProducts = products.slice(0, 4);

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Trending Drops</h2>
          <p className="text-gray-400 text-lg">
            Secure the most sought-after figures before they sell out.
          </p>
        </div>
        <Link to="/shop" className="bg-white/5 hover:bg-white text-white hover:text-base-dark font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-white/10 hover:border-white shadow-lg whitespace-nowrap">
          Go to Shop Area
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topProducts.map((product, index) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full bg-surface-light border border-white/5 rounded-3xl overflow-hidden hover:border-accent-purple/50 transition-colors shadow-lg group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-black flex items-center justify-center p-4">
                <div className="absolute top-4 left-4 z-10 bg-base-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                  {product.category === 'Mecha' ? 'Pre-order' : 'In Stock'}
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-screen opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  <Star size={14} className="fill-current" />
                  <span className="text-xs font-bold text-gray-300">4.9</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-accent-cyan transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.scale}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-xl font-display font-bold text-white">{product.price}</div>
                  <button onClick={(e) => { e.preventDefault(); addToCart({ ...product, quantity: 1 }); }} className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-purple flex items-center justify-center text-white transition-colors">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
