import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export function GlobalUI() {
  const { isCartOpen, setIsCartOpen, isAuthOpen, setIsAuthOpen, toast, showToast, cart, updateQuantity, removeFromCart, clearCart, user } = useAppContext();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartTotal = cart.reduce((total, item) => {
    const priceStr = item.price.toString().replace('$', '').replace(',', '');
    const price = parseFloat(priceStr);
    return total + (price * item.quantity);
  }, 0);

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 z-[100] px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] border ${
              toast.type === 'success' ? 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100' :
              toast.type === 'error' ? 'bg-red-900/90 border-red-500/50 text-red-100' :
              'bg-surface-dark border-white/10 text-white'
            } backdrop-blur-md`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-base-dark/80 backdrop-blur-sm z-[90]"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-dark border-l border-white/10 z-[100] flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-accent-cyan" />
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded-full">{cart.reduce((t, i) => t + i.quantity, 0)} items</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                  <X />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                    <p>Your cart is empty.</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-6 text-accent-cyan hover:underline">Continue Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-base-dark/50 p-3 rounded-2xl border border-white/5 relative group">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-semibold text-sm line-clamp-2 leading-tight">{item.name}</h4>
                          <p className="text-accent-cyan font-bold mt-1">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-surface-dark w-fit rounded-lg border border-white/10">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"><Minus size={14} /></button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"><Plus size={14} /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="absolute top-3 right-3 text-gray-500 hover:text-red-400 md:opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-base-dark/50">
                  <div className="flex items-center justify-between font-bold text-lg mb-6">
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <button 
                    disabled={isCheckingOut}
                    onClick={async () => {
                      if (!user) {
                        showToast('Please sign in to checkout', 'info');
                        setIsCartOpen(false);
                        setIsAuthOpen(true);
                        return;
                      }

                      setIsCheckingOut(true);
                      try {
                        const batchOrders = cart.map(item => {
                          return addDoc(collection(db, 'orders'), {
                            customer: user.uid,
                            email: user.email || 'unknown',
                            product: item.name,
                            amount: (parseFloat(item.price.toString().replace('$', '').replace(',', '')) * item.quantity),
                            status: 'pending',
                            date: new Date().toISOString()
                          });
                        });
                        
                        await Promise.all(batchOrders);
                        showToast('Order placed successfully!', 'success');
                        clearCart();
                        setIsCartOpen(false);
                      } catch (error: any) {
                        showToast(error.message, 'error');
                      } finally {
                        setIsCheckingOut(false);
                      }
                    }}
                    className="w-full bg-accent-purple hover:bg-white hover:text-base-dark text-white font-semibold py-4 rounded-xl transition-all shadow-[0_0_20px_var(--color-accent-purple-glow)] disabled:opacity-50"
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAuthOpen(false)}
              className="fixed inset-0 bg-base-dark/80 backdrop-blur-sm z-[90]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20, x: '-50%', translateY: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: '-50%', translateY: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: 20, x: '-50%', translateY: '-50%' }}
              className="fixed top-1/2 left-1/2 w-[90%] max-w-md bg-surface-dark border border-white/10 rounded-3xl p-8 z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <button onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white p-2">
                <X size={20} />
              </button>
              
              <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{isLoginMode ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-gray-400 text-sm">
                  {isLoginMode ? 'Sign in securely to your AniYumi account.' : 'Join AniYumi for exclusive drops & perks.'}
                </p>
              </div>

              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                setIsAuthenticating(true);
                try {
                  if (isLoginMode) {
                    await signInWithEmailAndPassword(auth, email, password);
                    showToast('Successfully logged in!', 'success');
                  } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                    showToast('Account created successfully!', 'success');
                  }
                  setIsAuthOpen(false);
                  setEmail('');
                  setPassword('');
                } catch (error: any) {
                  showToast(error.message, 'error');
                } finally {
                  setIsAuthenticating(false);
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-base-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors" placeholder="collector@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5 flex justify-between">
                    <span>Password</span>
                    {isLoginMode && <a href="#" className="text-accent-cyan hover:underline text-xs">Forgot?</a>}
                  </label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-base-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors" placeholder="••••••••" required />
                </div>
                
                <button type="submit" disabled={isAuthenticating} className="w-full bg-accent-cyan hover:bg-white text-base-dark font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_var(--color-accent-cyan-glow)] mt-6 disabled:opacity-50">
                  {isAuthenticating ? 'Processing...' : isLoginMode ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLoginMode(!isLoginMode)} type="button" className="text-white hover:text-accent-purple transition-colors font-semibold border-b border-accent-purple/30 pb-0.5">
                  {isLoginMode ? 'Join the Club' : 'Sign In'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
