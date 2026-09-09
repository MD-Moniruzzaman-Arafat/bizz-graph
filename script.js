// mobile menu
const ham = document.getElementById('hamburger');
const mm = document.getElementById('mobileMenu');
ham?.addEventListener('click', () => mm.classList.toggle('open'));
mm?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

// reveal on scroll
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// counters
const cio = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count || '0', 10);
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur;
    }, 30);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

// lead form demo
const form = document.getElementById('leadForm');
form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const fd = new FormData(form);
  const name = fd.get('name');
  document.getElementById('formMsg').textContent = `✅ ধন্যবাদ ${name}! আমরা ২৪ ঘণ্টার মধ্যে কল করবো ইনশাআল্লাহ। অথবা জরুরি হলে কল করুন 01910-320467`;
  form.reset();
});

// about slider
(() => {
  const slider = document.getElementById('aboutSlider');
  if (!slider) return;
  const track = slider.querySelector('.as-track');
  const slides = slider.querySelectorAll('.as-slide');
  const dotsBox = slider.querySelector('.as-dots');
  let i = 0, timer;

  slides.forEach((_, n) => {
    const d = document.createElement('button');
    d.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    d.addEventListener('click', () => { go(n); restart(); });
    dotsBox.appendChild(d);
  });
  const dots = dotsBox.querySelectorAll('button');

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 4000); }

  slider.querySelector('.prev').addEventListener('click', () => { go(i - 1); restart(); });
  slider.querySelector('.next').addEventListener('click', () => { go(i + 1); restart(); });
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restart);

  go(0); restart();
})();
