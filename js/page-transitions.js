/* ============================================
   PAGE TRANSITION HANDLER
   ============================================
   Intercepts internal link clicks to apply
   smooth exit/enter animations between pages.
   ============================================ */

function initPageTransitions() {
  const overlay = document.querySelector(".page-transition-overlay");
  const loader = document.querySelector(".transition-loader");
  const pageContent = document.querySelector(".page-content");
  const navLinks = document.querySelectorAll("a[data-page]");

  if (!overlay || !pageContent) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip if it's the current page
      if (link.classList.contains("active")) return;

      // Skip external links
      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel")
      )
        return;

      e.preventDefault();

      // Step 1: Trigger exit animation on content
      pageContent.classList.add("page-exit");

      // Step 2: Show transition overlay
      setTimeout(() => {
        overlay.classList.add("active");
        if (loader) loader.classList.add("active");
      }, 200);

      // Step 3: Navigate to new page after overlay covers screen
      setTimeout(() => {
        window.location.href = href;
      }, 650);
    });
  });

  // Handle hero CTA buttons and other internal links
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    // Only intercept internal .html links that aren't already data-page links
    if (href.endsWith(".html") && !link.hasAttribute("data-page")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        pageContent.classList.add("page-exit");
        setTimeout(() => {
          overlay.classList.add("active");
          if (loader) loader.classList.add("active");
        }, 200);
        setTimeout(() => {
          window.location.href = href;
        }, 650);
      });
    }
  });
}
