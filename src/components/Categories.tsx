import { motion } from "framer-motion";
import { Ghost, Sword, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Categories() {
  const categories = [
    { name: "Mecha & Armor", icon: <Sword size={24} />, desc: "Sci-fi robots and armored figures", color: "text-accent-cyan", bg: "bg-accent-cyan/10" },
    { name: "Fantasy Heroes", icon: <Star size={24} />, desc: "Swordsmen, mages, and legends", color: "text-amber-400", bg: "bg-amber-400/10" },
    { name: "Idol & Pop", icon: <Sparkles size={24} />, desc: "Bright stages and pop culture", color: "text-pink-400", bg: "bg-pink-400/10" },
    { name: "Dark Variants", icon: <Ghost size={24} />, desc: "Villains and shadow forms", color: "text-accent-purple", bg: "bg-accent-purple/10" },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 mt-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Explore Collections</h2>
        <p className="text-gray-400 text-lg">
          Dive into premium curated categories for every collector.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <Link
            to="/shop"
            key={cat.name}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`h-full cursor-pointer rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 group ${cat.bg} hover:bg-surface-light backdrop-blur-sm`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-surface-dark border border-white/5 group-hover:scale-110 transition-transform ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">{cat.name}</h3>
              <p className="text-sm text-gray-400">{cat.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
