import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function Timeline({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative pl-8">
      {/* Track (always visible, faint) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
        style={{ backgroundColor: "rgba(81, 50, 41, 0.15)" }}
      />
      {/* Drawing line that fills in as you scroll */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full origin-top"
        style={{ scaleY, backgroundColor: "#513229" }}
      />
      <div className="space-y-8">{children}</div>
    </div>
  );
}

export function TimelineItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative pl-6"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Dot marker sitting on the timeline */}
      <span
        className="absolute -left-[38px] top-2 w-3 h-3 rounded-full"
        style={{
          backgroundColor: "#513229",
          boxShadow: "0 0 0 4px #F1E6D2",
        }}
      />
      {children}
    </motion.div>
  );
}
