import React, { useState, useEffect, useRef } from "react";

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

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "rgba(81, 50, 41, 0.08)",
              color: "#513229",
              border: "1px solid #513229",
              fontFamily: "'Antic', sans-serif",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "Java", "C", "Javascript"],
    },
    {
      title: "Web and Software Development",
      skills: ["HTML", "CSS", "Node.js", "Express.js", "RESTful APIs", "Web Scraping", "Full Stack Development"],
    },
    {
      title: "Data and AI Tools",
      skills: ["SQL", "MongoDB", "NumPy", "Pandas", "Matplotlib", "NLTK", "Tkinter", "Power BI", "Tableau"],
    },
    {
      title: "Developer Tools and Platforms",
      skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Postman", "Linux", "Unix"],
    },
    {
      title: "Design and Productivity Tools",
      skills: ["Figma", "Canva", "Adobe After Effects"],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 py-32"
      style={{ backgroundColor: "#F1E6D2" }}
    >
      <div className="max-w-4xl mx-auto w-full">

        {/* Section Title */}
        <div className="mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4"
            style={{
              color: "#513229",
              fontFamily: "'Fira Code', monospace",
            }}
          >
            Skills
          </h2>

          <div
            className="w-16 h-1"
            style={{ backgroundColor: "#513229" }}
          ></div>
        </div>

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