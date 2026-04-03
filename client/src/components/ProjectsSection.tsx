import React, { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

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
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}> = ({ title, description, technologies, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border-2 p-8 rounded-lg transition-all duration-300 cursor-pointer"
      style={{
        borderColor: isHovered ? "#513229" : "rgba(81, 50, 41, 0.2)",
        backgroundColor: isHovered ? "rgba(81, 50, 41, 0.05)" : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
          {title}
        </h3>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
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
  );
};

export default function ProjectsSection() {
  const projects = [
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
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
            Projects
          </h2>
          <div className="w-16 h-1" style={{ backgroundColor: "#513229" }}></div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
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