// Bölümler ekrana girdiğinde yumuşak bir görünme efekti uygular.
// Kullanıcı "azaltılmış hareket" tercih ettiyse animasyon devre dışı kalır.

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const sections = document.querySelectorAll("main > section");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((s) => s.classList.add("is-visible"));
    return;
  }

  sections.forEach((s) => s.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((s) => observer.observe(s));
});
