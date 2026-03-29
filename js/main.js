/* ============================================
   MAIN ENTRY POINT
   ============================================
   Initializes all modules on DOMContentLoaded.
   Each feature is imported via separate <script>
   tags in the HTML pages before this file.
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Background Animations
  const canvas = document.getElementById("particle-canvas");
  if (canvas) new ParticleNetwork(canvas);

  const matrix = new MatrixRain();
  matrix.init();

  // Hero Typing Effect (only on index.html)
  const typedElement = document.getElementById("typed-text");
  if (typedElement) {
    new TypeWriter(
      typedElement,
      [
        "DevOps Engineer",
        "Cloud Enthusiast",
        "CI/CD Automation",
        "Docker & AWS",
        "Linux Administrator",
      ],
      2000,
    );
  }

  // UI Features
  initCursorGlow();
  initScrollReveal();
  initNavbar();
  initPageTransitions();

  // Only init these if elements exist on the page
  if (document.getElementById("contact-form")) initContactForm();
  if (document.querySelectorAll(".skill-tag").length) initSkillTagEffects();
  if (document.querySelectorAll("[data-tilt]").length) initTiltEffect();
});
