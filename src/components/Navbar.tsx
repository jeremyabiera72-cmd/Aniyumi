import { motion } from "framer-motion";
import { Ghost, LogIn, LogOut, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const { setIsAuthOpen, setIsCartOpen, cart, user } = useAppContext();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-5 bg-base-dark/80 backdrop-blur-md border-b border-white/5"
    >
      <Link to="/" className="flex items-center gap-2 cursor-pointer group">
        <span className="font-display font-semibold text-xl md:text-2xl tracking-tight transition-colors">
          <span className="text-accent-purple">Ani</span><span className="text-white">Yumi</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/" className={`${isActive('/') ? 'text-white border-b-2 border-accent-purple' : 'text-gray-400 hover:text-accent-cyan'} transition-colors py-1`}>Home</Link>
        <Link to="/shop" className={`${isActive('/shop') ? 'text-white border-b-2 border-accent-purple' : 'text-gray-400 hover:text-accent-cyan'} transition-colors py-1`}>Shop Area</Link>
        <Link to="/preorders" className={`${isActive('/preorders') ? 'text-white border-b-2 border-accent-purple' : 'text-gray-400 hover:text-accent-cyan'} transition-colors py-1`}>Pre-orders</Link>
        <Link to="/contact" className={`${isActive('/contact') ? 'text-white border-b-2 border-accent-purple' : 'text-gray-400 hover:text-accent-cyan'} transition-colors py-1`}>Contact</Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4 text-sm font-medium">
        <button onClick={() => setIsCartOpen(true)} className="relative text-gray-300 hover:text-white transition-colors p-2">
          <ShoppingBag size={20} />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-accent-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
        
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-2 text-gray-300">
              <User size={16} className="text-accent-cyan" />
              <span className="max-w-[100px] truncate text-xs">{user.email}</span>
            </div>
            <button onClick={handleLogout} className="text-gray-300 hover:text-red-400 transition-colors p-2" title="Log Out">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsAuthOpen(true)} className="text-gray-300 hover:text-white transition-colors px-2 md:px-4 py-2 hidden sm:block">
              Login
            </button>
            <button onClick={() => setIsAuthOpen(true)} className="sm:hidden text-gray-300 hover:text-white transition-colors p-2">
              <LogIn size={20} />
            </button>
            <button onClick={() => setIsAuthOpen(true)} className="bg-accent-purple hover:bg-white hover:text-base-dark text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_var(--color-accent-purple-glow)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              Join Club
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
