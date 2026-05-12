// View toggle (Work ↔ Beyond Work)
function toggleView() {
  const isBeyond = document.body.classList.toggle('beyond-work');
  const btn = document.getElementById('viewToggle');
  btn.textContent = isBeyond ? '← Work' : 'Beyond Work →';
  btn.classList.toggle('active', isBeyond);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  localStorage.setItem('view', isBeyond ? 'beyond' : 'work');
}
(function () {
  if (localStorage.getItem('view') === 'beyond') {
    document.body.classList.add('beyond-work');
    const btn = document.getElementById('viewToggle');
    if (btn) { btn.textContent = '← Work'; btn.classList.add('active'); }
  }
})();

// Typewriter
const roles = ['FinTech Product Manager', 'Blockchain Evangelist', 'Environmentalist'];
let roleIndex = 0, charIndex = 0, deleting = false;
function typeWriter() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const current = roles[roleIndex];
  if (!deleting) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeWriter, deleting ? 55 : 90);
}
typeWriter();

// Theme toggle
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('themeToggle').textContent = isLight ? '☾' : '☀';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☾';
  }
})();

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });
reveals.forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// Contact form
function handleSubmit() {
  const btn = document.querySelector('.form-btn');
  btn.textContent = '✓ MESSAGE SENT';
  btn.style.background = '#3fb950';
  setTimeout(() => {
    btn.textContent = '→ SEND MESSAGE';
    btn.style.background = '';
  }, 3000);
}

// Active nav highlight
const sections = document.querySelectorAll('section[id], #hero');
const links = document.querySelectorAll('.nav-links a');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--amber)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => scrollSpy.observe(s));
