import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PreorderContainer {
  id: string;
  containerId: string;
  items: string;
  eta: string;
  status: string;
  totalStock: number;
  filled: number;
}

export function PreOrders() {
  const { addToCart, products } = useAppContext();
  const preOrderProducts = products.filter(p => p.tag === 'Pre-order').map(p => ({
    ...p,
    stockStatus: 'Releases Aug 2026',
  }));

  const [containers, setContainers] = useState<PreorderContainer[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'preorders'), (snapshot) => {
      const data: PreorderContainer[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as PreorderContainer);
      });
      setContainers(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-base-dark text-white font-sans selection:bg-accent-purple/30 pt-28 flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex-grow w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Upcoming Pre-orders</h1>
          <p className="text-gray-400 text-lg">Secure your grails before they manufacture. Limited slots available.</p>
        </div>

        {containers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Box className="text-accent-purple" /> Active Container Tracking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {containers.map((container) => (
                <div key={container.id} className="bg-surface-light border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold font-display text-lg">{container.containerId}</h3>
                      <p className="text-xs text-gray-400">ETA: {container.eta}</p>
                    </div>
                    {container.status === 'Planning' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
                        Planning
                      </span>
                    ) : container.status === 'In Transit' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                        In Transit
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-emerald-400 ring-1 ring-inset ring-green-500/20">
                        {container.status}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-300 mb-6 truncate" title={container.items}>
                    Includes: {container.items}
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Filled Capacity</span>
                      <span className="text-white font-medium">{container.filled} / {container.totalStock}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-purple rounded-full" 
                        style={{ width: `${Math.min(100, Math.max(0, (container.filled / container.totalStock) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preOrderProducts.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full bg-surface-light border border-white/5 rounded-[2rem] overflow-hidden hover:border-accent-purple/50 transition-colors shadow-lg group flex flex-col"
              >
                <div className="relative h-72 overflow-hidden bg-black">
                  <div className="absolute top-4 left-4 z-10 bg-accent-purple text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_var(--color-accent-purple-glow)]">
                    {product.tag}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-screen opacity-90 object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    <Star size={14} className="fill-current" />
                    <span className="text-xs font-bold text-gray-300">5.0 Expected</span>
                  </div>
                  <h3 className="font-bold text-xl mb-1 group-hover:text-accent-cyan transition-colors">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.scale}</p>
                  <p className="text-xs text-accent-cyan mb-6">{product.stockStatus}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-2xl font-display font-bold text-white">{product.price}</div>
                    <button onClick={(e) => { e.preventDefault(); addToCart({ ...product, quantity: 1, stock: 99 }); }} className="w-12 h-12 rounded-full bg-white/5 hover:bg-accent-purple flex items-center justify-center text-white transition-colors">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
