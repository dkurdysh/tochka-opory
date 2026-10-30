const motion = true;

document.body.classList.add("motion-enabled");
document.body.classList.remove("no-motion");

const observed = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observed.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => {
  observed.observe(el);
});
const progress = document.querySelector(".reading-progress"),
  up = document.querySelector(".back-top"),
  explosion = document.querySelector(".explosion img");
let scheduled = false;
function updateScroll() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${total > 0 ? Math.min(1, scrollY / total) : 0})`;
  up.classList.toggle("shown", scrollY > innerHeight);
  if (motion) {
    const r = explosion.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) {
      const amount = Math.min(
        1,
        Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)),
      );
      explosion.style.transform = `scale(${0.96 + amount * 0.06})`;
    }
  }
  scheduled = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateScroll);
    }
  },
  { passive: true },
);
addEventListener("resize", updateScroll);
updateScroll();
up.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: motion ? "smooth" : "instant" }),
);
