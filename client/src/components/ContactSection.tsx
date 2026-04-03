import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Linkedin, Github } from "lucide-react";

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

const SocialLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
}> = ({ icon, label, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-lg transition-all duration-300 flex items-center justify-center"
      style={{
        backgroundColor: isHovered ? "rgba(81, 50, 41, 0.15)" : "rgba(81, 50, 41, 0.05)",
        border: `2px solid ${isHovered ? "#513229" : "rgba(81, 50, 41, 0.2)"}`,
        color: isHovered ? "#513229" : "#7a6255",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={label}
    >
      {icon}
    </a>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Something went wrong. Please email me directly at shiveesrivastava@gmail.com");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-32" style={{ backgroundColor: "#F1E6D2" }}>
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
            Contact
          </h2>
          <div className="w-16 h-1" style={{ backgroundColor: "#513229" }}></div>
        </div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight" style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}>
                Get in Touch
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: "#513229", fontFamily: "'Antic', sans-serif" }}>
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out!
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
                EMAIL
              </p>
              <a
                href="mailto:shiveesrivastava@gmail.com"
                className="text-lg font-semibold transition-colors duration-300 hover:opacity-80"
                style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}
              >
                shiveesrivastava@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold mb-4" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
                FIND ME ON
              </p>
              <div className="flex gap-3">
                <SocialLink icon={<Github size={24} />} label="GitHub" href="https://github.com/shiveesrivastava" />
                <SocialLink icon={<Linkedin size={24} />} label="LinkedIn" href="https://www.linkedin.com/in/shivee-srivastava/" />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                  style={{
                    borderColor: "rgba(81, 50, 41, 0.3)",
                    backgroundColor: "rgba(81, 50, 41, 0.05)",
                    color: "#513229",
                    fontFamily: "'Antic', sans-serif",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#513229"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(81, 50, 41, 0.3)"; }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                  style={{
                    borderColor: "rgba(81, 50, 41, 0.3)",
                    backgroundColor: "rgba(81, 50, 41, 0.05)",
                    color: "#513229",
                    fontFamily: "'Antic', sans-serif",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#513229"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(81, 50, 41, 0.3)"; }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none resize-none"
                  style={{
                    borderColor: "rgba(81, 50, 41, 0.3)",
                    backgroundColor: "rgba(81, 50, 41, 0.05)",
                    color: "#513229",
                    fontFamily: "'Antic', sans-serif",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#513229"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(81, 50, 41, 0.3)"; }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-3 rounded-lg font-bold uppercase tracking-tight transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#513229",
                  color: "#F1E6D2",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t-2" style={{ borderColor: "rgba(81, 50, 41, 0.2)" }}>
          <p className="text-center text-sm" style={{ color: "#7a6255", fontFamily: "'Antic', sans-serif" }}>
            © 2026 Shivee Srivastava. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}