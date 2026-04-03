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

const ExperienceCard: React.FC<{
  title: string;
  organization: string;
  period: string;
  achievements: string[];
}> = ({ title, organization, period, achievements }) => {
  return (
    <div className="border-l-4 pl-6 py-6" style={{ borderColor: "#513229" }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
          {title}
        </h3>
        <span className="text-sm font-semibold" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
          {period}
        </span>
      </div>
      <p className="text-lg font-semibold mb-1" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
        {organization}
      </p>
      <ul className="space-y-3">
        {achievements.map((achievement, idx) => (
          <li key={idx} className="flex gap-3 text-base leading-relaxed" style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}>
            <span style={{ color: "#513229", flexShrink: 0 }}>•</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Software Development Intern",
      organization: "BambooBox, Bengaluru",
      period: "June 2025 - August 2025",
      achievements: [
        "Contributed to backend development for 2 internal web applications, including an email management system and a competitor analysis tool, working on API design, server-side logic and database integration across multiple modules.",
        "Built and tested 10+ REST API endpoints using a Node.js-based stack and integrated MongoDB for structured data storage, working both independently and within a 3-member development team.",
      ],
    },
    {
      title: "Core Committee Member",
      organization: "IEEE RAS, RNSIT, Bengaluru",
      period: "April 2025 - Present",
      achievements: [
        "Created and authored 15+ coding questions for preliminary rounds and co-organized a department-level coding competition with 150+ student participants.",
        "Supported event planning, evaluation, and smooth execution of the competition across multiple rounds.",
      ],
    },
    {
      title: "Technical Team Member",
      organization: "InnovAIton, RNSIT, Bengaluru",
      period: "August 2024 - Present",
      achievements: [
        "Conducted hands-on, peer-to-peer workshops teaching 4 Data Structures and Algorithms topic fundamentals to 50+ junior students.",
        "Strengthened participants' conceptual understanding through practical examples and guided problem-solving sessions.",
      ],
    },
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-32" style={{ backgroundColor: "#F1E6D2" }}>
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
            Experience
          </h2>
          <div className="w-16 h-1" style={{ backgroundColor: "#513229" }}></div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={idx}
              title={exp.title}
              organization={exp.organization}
              period={exp.period}
              achievements={exp.achievements}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
