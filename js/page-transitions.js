/* ============================================
   DIRECTIONAL PAGE TRANSITION HANDLER
   ============================================
   Intercepts internal link clicks to apply
   directional smooth slide/fade animations between pages.
   ============================================ */

const PAGES = [
  "index",
  "about",
  "skills",
  "projects",
  "experience",
  "certifications",
  "contact",
];

function getPageIndex(href) {
  // Check if it's the root path which usually implies index
  if (href === "" || href === "/") return 0;
  for (let i = 0; i < PAGES.length; i++) {
    if (href.includes(PAGES[i] + ".html")) return i;
  }
  // Default to index if no match
  return -1;
}

function initPageTransitions() {
  const loader = document.querySelector(".transition-loader");
  const pageContent = document.querySelector(".page-content");

  // 1. On Mount: Check sessionStorage for travel direction and animate in
  const direction =
    sessionStorage.getItem("pageTransitionDirection") || "forward";
  if (pageContent) {
    pageContent.classList.add(`slide-enter-${direction}`);
  }

  // 2. Intercept internal navigation
  const navLinks = document.querySelectorAll("a[href]");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip external, anchors, and non-html links
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#")
      )
        return;
      if (!href.endsWith(".html") && !link.hasAttribute("data-page")) return;

      const currentPath =
        window.location.pathname.split("/").pop() || "index.html";
      let currentIndex = getPageIndex(currentPath);
      if (currentIndex === -1) currentIndex = 0; // fallback

      const targetIndex = getPageIndex(href);

      // Skip if it's the exact same page
      if (currentIndex === targetIndex && targetIndex !== -1) {
        e.preventDefault();
        return;
      }

      // Calculate direction
      let outgoingDirection = "forward";
      if (targetIndex !== -1 && currentIndex !== -1) {
        outgoingDirection = targetIndex > currentIndex ? "forward" : "backward";
      }

      sessionStorage.setItem("pageTransitionDirection", outgoingDirection);

      e.preventDefault();

      // Step 1: Trigger slide exit animation
      if (pageContent) {
        // Remove enter classes to avoid conflict
        pageContent.classList.remove(
          "slide-enter-forward",
          "slide-enter-backward",
        );
        pageContent.classList.add(`slide-exit-${outgoingDirection}`);
      }

      // Step 2: Show loading indicator if taking time
      setTimeout(() => {
        if (loader) loader.classList.add("active");
      }, 150);

      // Step 3: Navigate after animation finishes
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
}
