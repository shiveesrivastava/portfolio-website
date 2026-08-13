import PortfolioHero from "@/components/PortfolioHero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgressBar from "@/components/shared/ScrollProgressBar";
import CustomCursor from "@/components/shared/CustomCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Portfolio Home Page
 * 
 * Design Philosophy: Minimalist Brutalism with Lime Accent
 * - Pure black background with white text and lime (#C3E41D) accents
 * - Fira Code for headers (monospace, technical)
 * - Antic for body text (clean, geometric)
 * - Generous spacing and high contrast
 * - Blur animations on scroll for text reveal
 * 
 * Sections (in order):
 * 1. Hero - Full-screen introduction with name and tagline
 * 2. About - Personal introduction and background
 * 3. Skills - Technical skills organized by category
 * 4. Experience - Work experience and professional roles
 * 5. Projects - Featured work with descriptions and links
 * 6. Education - Academic background and certifications
 * 7. Contact - Contact information and message form
 */
export default function Home() {
  useSmoothScroll();

  return (
    <div className="w-full" style={{ backgroundColor: "#F1e6d2" }}>
      <ScrollProgressBar />
      <CustomCursor />
      <PortfolioHero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
