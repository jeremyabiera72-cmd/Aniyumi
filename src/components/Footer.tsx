import { Link } from 'react-router-dom';
import { Ghost, Twitter, Instagram, Github, Facebook } from 'lucide-react';

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

export function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-white/5 bg-surface-dark mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/5 pb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 cursor-pointer group">
              <span className="font-display font-semibold text-2xl tracking-tight">
                <span className="text-accent-purple">Ani</span><span className="text-white">Yumi</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              The premier destination for authentic anime figures, limited editions, and mecha model kits sourced directly from Japan and exported from import from philippines, davao del sur.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <TikTokIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Site</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-accent-cyan transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-accent-cyan transition-colors">Shop Catalog</Link></li>
              <li><Link to="/preorders" className="text-gray-400 hover:text-accent-cyan transition-colors">Pre-Orders</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-accent-cyan transition-colors">Membership</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-accent-cyan transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">Shipping Info</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} AniYumi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Yumi Inc</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
