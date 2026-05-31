import { motion } from "framer-motion";

export function Stats() {
  return (
    <section className="py-20 border-t border-white/10 mt-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start"
        >
          <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">3x</div>
          <p className="text-gray-400 font-medium">Cheaper than other proxies</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center md:items-start"
        >
          <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">2.4k</div>
          <p className="text-gray-400 font-medium">Clients and collectors worldwide</p>
        </motion.div>
      </div>
    </section>
  );
}
