import { motion } from "framer-motion";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4"
        style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.15 }}
        className="w-16 h-1 origin-left"
        style={{ backgroundColor: "#513229" }}
      />
    </div>
  );
}
