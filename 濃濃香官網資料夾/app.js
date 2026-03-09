document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-carousel]").forEach((el) => {
    initCarousel(el, { intervalMs: 3500 });
  });
});

function initCarousel(root, { intervalMs = 3500 } = {}) {
  const track = root.querySelector(".carousel-track");
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const prevBtn = root.querySelector(".carousel-btn.prev");
  const nextBtn = root.querySelector(".carousel-btn.next");
  const dotsWrap = root.querySelector(".carousel-dots");

  if (!track || slides.length === 0) return;

  let idx = 0;
  let timer = null;

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-dot" + (i === 0 ? " active" : "");
      b.setAttribute("aria-label", `跳到第 ${i + 1} 張`);
      b.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(b);
    });
  }

  function getDots() {
    return dotsWrap ? Array.from(dotsWrap.querySelectorAll(".carousel-dot")) : [];
  }

  function render() {
    track.style.transform = `translateX(${-idx * 100}%)`;
    getDots().forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  function goTo(i, userAction = false) {
    idx = (i + slides.length) % slides.length;
    render();
    if (userAction) restart();
  }

  function next(userAction = false) { goTo(idx + 1, userAction); }
  function prev(userAction = false) { goTo(idx - 1, userAction); }

  function start() {
    stop();
    timer = setInterval(() => next(false), intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() { start(); }

  if (nextBtn) nextBtn.addEventListener("click", () => next(true));
  if (prevBtn) prevBtn.addEventListener("click", () => prev(true));

  // Pause on hover
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  // Touch swipe
  let startX = 0;
  let dx = 0;
  root.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    dx = 0;
    stop();
  }, { passive: true });

  root.addEventListener("touchmove", (e) => {
    dx = e.touches[0].clientX - startX;
  }, { passive: true });

  root.addEventListener("touchend", () => {
    const threshold = 40;
    if (dx > threshold) prev(true);
    else if (dx < -threshold) next(true);
    start();
  });

  // Keyboard
  root.setAttribute("tabindex", "0");
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev(true);
    if (e.key === "ArrowRight") next(true);
  });

  render();
  start();
}