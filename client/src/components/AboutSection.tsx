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
        {/* Content */}
        <div className="space-y-8">
          <BlurText
            text="I'm a full-stack developer with a strong focus on backend systems and intelligent applications, passionate about building solutions that are both efficient and meaningful. With experience in Node.js, MongoDB and data-driven tools, I enjoy turning complex ideas into structured, real-world systems."
            delay={40}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}
          />

          <BlurText
            text="Through my work, I've focused on writing clean code, designing reliable architectures and solving problems that go beyond the surface. Beyond development, I've contributed to tech communities by mentoring students and creating coding challenges, which has strengthened both my technical depth and ability to simplify complex concepts."
            delay={40}
            startDelay={1900}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}
          />
      
          <BlurText
            text="Let's build something amazing together."
            delay={100}
            startDelay={3900}
            animateBy="words"
            direction="top"
            className="text-lg md:text-xl leading-relaxed font-semibold"
            style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}
          />
        </div>
      </div>
    </section>
  );
}
