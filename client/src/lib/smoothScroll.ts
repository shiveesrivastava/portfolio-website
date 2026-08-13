/**
 * Smooth scroll navigation utility
 * Enables smooth scrolling to anchor links throughout the portfolio
 */

export const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Initialize smooth scroll for all anchor links
 */
export const initializeSmoothScroll = () => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor: HTMLAnchorElement) => {
    anchor.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (href && href !== "#") {
        const targetId = href.substring(1);
        smoothScrollToSection(targetId);
      }
    });
  });
};
