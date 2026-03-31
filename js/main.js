document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const about = document.getElementById("about");
  const tech = document.getElementById("tech-stack");
  const home = document.getElementById("home");
  const sections = [home, about, tech].filter(Boolean);

  if (!about || !tech) {
    return;
  }

  const getHeaderOffset = () => (header ? header.offsetHeight : 0);

  const setZ = (el, z) => {
    if (el) {
      el.style.zIndex = z;
    }
  };

  const updateOverlap = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const headerOffset = getHeaderOffset();
    const aboutStart = about.offsetTop - headerOffset;
    const techStart = tech.offsetTop - headerOffset;

    // default stacking: home on top, then about, then tech (no overlap)
    setZ(home, 3);
    setZ(about, 2);
    setZ(tech, 1);

    if (scrollY >= aboutStart) {
      about.classList.add("is-overlapping");
      about.style.top = `${headerOffset}px`;
      setZ(home, 1);
      setZ(about, 3);
    } else {
      about.classList.remove("is-overlapping");
      about.style.top = "";
    }

    if (scrollY >= techStart) {
      tech.classList.add("is-overlapping");
      tech.style.top = `${headerOffset}px`;
      setZ(home, 1);
      setZ(about, 2);
      setZ(tech, 3);
    } else {
      tech.classList.remove("is-overlapping");
      tech.style.top = "";
    }
  };

  updateOverlap();
  window.addEventListener("scroll", updateOverlap, { passive: true });
  window.addEventListener("resize", updateOverlap);

  sections.forEach((section) => section.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
});
