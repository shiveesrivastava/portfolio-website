import React, { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";
import TiltCard from "@/components/shared/TiltCard";

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
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
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

const ProjectCard: React.FC<{
  index: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}> = ({ index, title, description, technologies, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TiltCard className="group">
        <div
          className="border-2 p-8 rounded-lg transition-colors duration-300 cursor-pointer"
          style={{
            borderColor: isHovered ? "#513229" : "rgba(81, 50, 41, 0.2)",
            backgroundColor: isHovered ? "rgba(81, 50, 41, 0.05)" : "transparent",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-baseline gap-4">
              <span
                className="text-sm font-bold tabular-nums"
                style={{ color: "rgba(81, 50, 41, 0.35)", fontFamily: "'Fira Code', monospace" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
                {title}
              </h3>
            </div>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110 hover:rotate-12">
                <ExternalLink size={24} style={{ color: "#513229" }} />
              </a>
            )}
          </div>

          <p className="mb-6 leading-relaxed" style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}>
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded"
                style={{
                  backgroundColor: "rgba(81, 50, 41, 0.08)",
                  color: "#513229",
                  border: "1px solid rgba(81, 50, 41, 0.3)",
                  fontFamily: "'Antic', sans-serif",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const projects = [
    {
      title: "Semantic Music Discovery Engine",
      description: "Built a semantic mood-based music search engine as independent preparation for production vector database work, implementing a full embed, store, query pipeline, which generated embeddings for a curated 5000-song dataset using all-MiniLM-L6-v2 (sentence-transformers), indexed in Qdrant for semantic similarity search.",
      technologies: ["Python", "Sentence-Transformers", "Qdrant", "Streamlit"],
      link: "https://github.com/shiveesrivastava/moodify", 
    },
    {
      title: "Competitor Analysis System",
      description: "Backend system that analyzes a given website URL to identify and generate top competitor websites using web scraping and automated data extraction. Designed structured API workflows and integrated MongoDB for efficient storage and retrieval of analyzed insights.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Web Scraping"],
      link: "https://github.com/shiveesrivastava/competitor-analysis", 
    },
    {
      title: "AI Interior Designer with AR Overlay (In Progress)",
      description:
        "AI-powered interior design system that allows users to visualize and replace furniture in their space using Augmented Reality. Combines computer vision and diffusion models to understand room structure, segment objects and generate personalized design suggestions in real time.",
      technologies: [
        "Python", "FastAPI","Stable Diffusion","ControlNet","CLIP","Segment Anything","Depth Estimation","MongoDB"],
      link: "https://github.com/shiveesrivastava/ai-interior-design",
    },
    {
      title: "Gmail Management System",
      description:
        "Backend email management system enabling custom tagging and categorization of emails. Implemented OAuth-based authentication using Gmail API and built secure workflows for storing and managing categorized email data.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Gmail API", "OAuth"],
      link: "https://github.com/shiveesrivastava/email-manager", // replace
    },
    {
      title: "Meetrix",
      description:
        "Full-stack web application for planning trips with friends by managing users, tracking locations and calculating optimal meeting points using geographic midpoint logic. Built secure session-based authentication and server-side computations.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
      link: "https://github.com/shiveesrivastava/meetrix", 
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-32" style={{ backgroundColor: "#F1E6D2" }}>
      <div className="max-w-4xl mx-auto w-full">
        <SectionTitle title="Projects" />

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              index={idx}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}