import React, { useState, useEffect, useRef } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  startDelay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  startDelay = 0,
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
            transition: `all 0.5s ease-out ${startDelay + i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-32" style={{ backgroundColor: "#F1E6D2" }}>
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
            About
          </h2>
          <div className="w-16 h-1" style={{ backgroundColor: "#513229" }}></div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <BlurText
            text="I'm a Computer Science (AI & ML) student passionate about building intelligent systems that solve real-world problems. My work sits at the intersection of machine learning, backend engineering and information retrieval, with a particular interest in semantic search, vector databases, retrieval-augmented systems and computer vision."
            delay={40}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}
          />

          <BlurText
            text="I love building projects that combine strong engineering with modern AI. From developing semantic search engines powered by vector databases to architecting FastAPI backends for multi-model computer vision pipelines, I enjoy turning ambitious ideas into scalable systems."
            delay={40}
            startDelay={1900}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}
          />

          <BlurText
            text="Beyond writing code, I'm constantly learning, experimenting with emerging AI technologies and contributing to technical blogs and research. My goal is to build AI systems that are not only intelligent but also reliable, efficient and impactful."
            delay={40}
            startDelay={3900}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}
          />
        </div>
      </div>
    </section>
  );
}
