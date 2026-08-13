import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = text.split(animateBy === "words" ? " " : "");

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

const SkillCard: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => {
  return (
    <div
      className="border-l-4 pl-6 py-4"
      style={{ borderColor: "#513229" }} 
    >
      <h3
        className="text-2xl font-bold mb-3 uppercase tracking-tight"
        style={{
          color: "#513229",
          fontFamily: "'Fira Code', monospace",
        }}
      >
        {title}
      </h3>

      <motion.div
        className="flex flex-wrap gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {skills.map((skill, idx) => (
          <motion.span
            key={idx}
            className="px-4 py-2 rounded text-sm font-medium cursor-default"
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.08, rotate: idx % 2 === 0 ? -2 : 2, y: -2 }}
            style={{
              backgroundColor: "rgba(81, 50, 41, 0.08)",
              color: "#513229",
              border: "1px solid #513229",
              fontFamily: "'Antic', sans-serif",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "Java", "C", "C++", "JavaScript"],
    },
    {
      title: "Machine Learning and Deep Learning",
      skills: ["Vision Transformers (ViT)", "Sentence-Transformers", "Embeddings", "Vector Databases"],
    },
    {
      title: "Research and Retrieval Systems",
      skills: ["Semantic Search", "RASL-inspired Schema Linking", "RAG pipelines", "Recall@k benchmarking"],
    },
    {
      title: "Web and Backend",
      skills: ["Node.js", "Express.js", "RESTful APIs", "FastAPI"],
    },
    {
      title: "Databases and Cloud",
      skills: ["SQL", "MongoDB", "Supabase", "Redis"],
    },
    {
      title: "Developer Tools",
      skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Postman"],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 py-32"
      style={{ backgroundColor: "#F1E6D2" }}
    >
      <div className="max-w-4xl mx-auto w-full">

        <SectionTitle title="Skills" />

        {/* Skills Grid */}
        <div className="space-y-6">
          {skillCategories.map((category, idx) => (
            <SkillCard key={idx} title={category.title} skills={category.skills} />
          ))}
        </div>
      </div>
    </section>
  );
}