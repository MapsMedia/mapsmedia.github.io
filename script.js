const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

document.body.classList.add('is-loading');

window.addEventListener('load', () => {
  let n = 0;
  const counter = $('#loaderCount');
  const timer = setInterval(() => {
    n += Math.floor(Math.random() * 16) + 8;
    if (n >= 100) {
      n = 100;
      clearInterval(timer);
      setTimeout(() => {
        $('.loader').classList.add('is-done');
        document.body.classList.remove('is-loading');
      }, 350);
    }
    counter.textContent = String(n).padStart(2,'0');
  }, 65);
});

$('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$('.reveal').forEach(el => observer.observe(el));

const cursor = $('.cursor');
if (cursor && matchMedia('(pointer:fine)').matches) {
  let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
  });
  const loop = () => {
    cx += (mx-cx)*.16;
    cy += (my-cy)*.16;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
  };
  loop();
  $$('.magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
      el.style.transform = '';
    });
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left+r.width/2))*.12;
      const y = (e.clientY - (r.top+r.height/2))*.12;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
  });
}

$$('.project__visual').forEach(card => {
  card.addEventListener('mousemove', e => {
    if (matchMedia('(pointer:fine)').matches) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      const child = card.querySelector('.road-ui,.commerce-card,.studio-word,.dash-window');
      if (child) child.style.translate = `${x*10}px ${y*10}px`;
    }
  });
  card.addEventListener('mouseleave', () => {
    const child = card.querySelector('.road-ui,.commerce-card,.studio-word,.dash-window');
    if (child) child.style.translate = '';
  });
});

const hero = $('.hero');
addEventListener('scroll', () => {
  const y = scrollY;
  const orb1 = $('.hero__orb--one');
  const orb2 = $('.hero__orb--two');
  if (orb1) orb1.style.transform = `translate3d(0,${y*.08}px,0)`;
  if (orb2) orb2.style.transform = `translate3d(0,${y*.04}px,0)`;
  if (hero && y < innerHeight) hero.style.setProperty('--scroll-opacity', Math.max(0, 1-y/innerHeight));
}, {passive:true});

// Smooth anchor movement for a slightly more deliberate feel.
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
