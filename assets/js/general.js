let hideTimer;
let lastTop = 0;

function scrollToTop(e) {
  e.stopPropagation();
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}


function updateHeaderTop() {
  const header = document.querySelector(".app-header");
  const backToTop = document.querySelector(".app-header-back-to-top");

  if (header && window.innerWidth > 960) {
    header.style.removeProperty("top");
    return;
  }

  if (!header || !backToTop) return;

  requestAnimationFrame(() => {
    const headerHeight = header.offsetHeight;
    const backToTopHeight = backToTop.offsetHeight;
    const topValue = -headerHeight + backToTopHeight;
    header.style.top = `${topValue}px`;
  });
}

window.addEventListener("load", updateHeaderTop);
window.addEventListener("resize", updateHeaderTop);

window.addEventListener("scroll", () => {
  const header = document.querySelector(".app-header");
  const backToTop = document.querySelector(".app-header-back-to-top");
  clearTimeout(hideTimer);

  if (header) {
    header.classList.remove("hidden");
  }

  if (window.innerWidth > 960) {
    return;
  }

  if (!header || !backToTop) {
    return;
  }

  const headerHeight = header.offsetHeight;
  const backToTopHeight = backToTop.offsetHeight;
  const topValue = Math.round(-headerHeight + backToTopHeight);
  const rect = header.getBoundingClientRect();
  const rectTop = Math.round(rect.top);

  if (rectTop > topValue) {
    clearTimeout(hideTimer);
    lastTop = rectTop;
    backToTop.style.removeProperty("opacity");
    return;
  }


  backToTop.style.opacity = "1.0";
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    header.classList.add("hidden");
  }, 1000);
});
