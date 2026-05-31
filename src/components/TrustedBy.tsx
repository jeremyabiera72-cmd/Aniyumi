import { motion } from "framer-motion";
import { Anchor, Triangle, Hexagon, Circle, Square, Infinity as Infinite } from "lucide-react";

export function TrustedBy() {
  return (
    <div className="bg-white text-base-dark py-12 px-8 mx-4 md:mx-auto max-w-6xl rounded-3xl -mt-16 relative z-20 shadow-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="lg:w-1/3 text-center lg:text-left">
          <h3 className="font-display font-bold text-xl mb-2">Trusted by Studios</h3>
          <p className="text-gray-500 text-sm">
            Top tier Japanese animation studios and manufacturers trust us to deliver authenticity securely.
          </p>
        </div>
        
        <div className="lg:w-2/3 w-full grid grid-cols-3 sm:grid-cols-6 gap-6 items-center place-items-center opacity-60">
          <div className="flex items-center gap-2 font-bold text-gray-400 hover:text-accent-purple transition-colors cursor-pointer">
            <Triangle size={24} className="fill-current" />
            <span className="hidden sm:inline-block">StudioA</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-400 hover:text-accent-purple transition-colors cursor-pointer">
            <Hexagon size={24} className="fill-current" />
            <span className="hidden sm:inline-block">MechCo</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-400 hover:text-accent-purple transition-colors cursor-pointer">
            <Circle size={24} className="fill-current" />
            <span className="hidden sm:inline-block">SmileArt</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-400 hover:text-accent-purple transition-colors cursor-pointer">
            <Anchor size={24} className="fill-current" />
            <span className="hidden sm:inline-block">Kotob</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-400 hover:text-accent-purple transition-colors cursor-pointer">
            <Square size={24} className="fill-current" />
            <span className="hidden sm:inline-block">Alters</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-400 hover:text-accent-purple transition-colors cursor-pointer">
            <Infinite size={24} />
            <span className="hidden sm:inline-block">Bandai</span>
          </div>
        </div>
      </div>
    </div>
  );
}
