import React, { useState, useEffect, useRef, useMemo, use } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
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

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

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

export default function PortfolioHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cursor-parallax for the hero name/photo block
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 120, mass: 0.6 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), springConfig);
  const photoParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), springConfig);
  const photoParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "experience", "projects", "education", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
  { label: "HOME", href: "#home", id: "home" },
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "SKILLS", href: "#skills", id: "skills" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "PROJECTS", href: "#projects", id: "projects" },
  { label: "EDUCATION", href: "#education", id: "education" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

  return (
    <div 
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: "#f1e6d2",
        color: "#ffffff",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <motion.button
              ref={buttonRef}
              type="button"
              className="p-2 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X className="w-8 h-8" strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu className="w-8 h-8" strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                  style={{
                    backgroundColor: "#513229",
                  }}
                >
                  {menuItems.map((item, idx) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.04 * idx, ease: "easeOut" }}
                      className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                      style={{
                        color: activeSection === item.id ? "#F1E6D2" : "#ffffff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#EFE4B4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = activeSection === item.id ? "#F1E6D2" : "#ffffff";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col" id="home">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <motion.div className="relative text-center" style={{ x: parallaxX, y: parallaxY }}>
            <div>
              <BlurText
                text="SHIVEE"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="SRIVASTAVA"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#513229", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ x: photoParallaxX, y: photoParallaxY }}
            >
              <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                style={{ border: "3px solid #513229" }}>
                <img
                  src="/image.jpeg"
                  alt="Shivee Srivastava"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 transition-colors duration-300" style={{ color: "#513229" }} />
        </motion.button>
      </main>
    </div>
  );
}
