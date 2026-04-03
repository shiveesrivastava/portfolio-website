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

const EducationCard: React.FC<{
  institution: string;
  degree: string;
  field: string;
  year: string;
  details?: string;
}> = ({ institution, degree, field, year, details }) => {
  return (
    <div className="border-l-4 pl-6 py-6" style={{ borderColor: "#513229" }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
          {degree}
        </h3>
        <span className="text-sm font-semibold" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
          {year}
        </span>
      </div>
      <p className="text-lg mb-2" style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}>
        {institution}
      </p>
      <p className="text-base mb-3" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
        {field}
      </p>
      {details && (
        <p className="text-sm leading-relaxed" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
          {details}
        </p>
      )}
    </div>
  );
};

export default function EducationSection() {
  const education = [
    {
      institution: "Computer Science (Artificial Intelligence & Machine Learning), CGPA: 8.68",
      degree: "RNS Institute of Technology, Bengaluru",
      field: "Bachelor of Technology (B.Tech)" ,
      year: "2023 - Present",
    },
    {
      institution: "CBSE, Grade 12, Percentage: 89.4%",
      degree: "BGS National Public School, Bengaluru",
      field: "PCMC",
      year: "2021 - 2023",
    },
  ];

  return (
    <section id="education" className="min-h-screen flex items-center justify-center px-6 py-32" style={{ backgroundColor: "#F1E6D2" }}>
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
            Education
          </h2>
          <div className="w-16 h-1" style={{ backgroundColor: "#513229" }}></div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {education.map((edu, idx) => (
            <EducationCard
              key={idx}
              institution={edu.institution}
              degree={edu.degree}
              field={edu.field}
              year={edu.year}
            />
          ))}
        </div>
      </div>
    </section>
  );
}