import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navBackgroundAnimationMobile = () => {
  const navbar = document.querySelector('.navbar-home');
  const hero = document.querySelector('.home-hero');

  if (!navbar) return;

  const targets = ['.hamburger', '.navbar-log h2', '.navbar-home .cta-01'];
  const pathname = window.location.pathname;

  if (pathname.includes('charter') || pathname.includes('purchase')) {
    gsap.set(navbar, { backgroundColor: 'var(--bs-cream)' });
    gsap.set('.hamburger', { filter: 'invert(0%)' });
    gsap.set('.navbar-log h2', {
      filter: 'invert(0%)',
      color: 'var(--bleu-soverain-bleu)',
    });

    const ham = document.querySelector('.hamburger');
    if (ham) {
      setTimeout(() => {
        ham.style.setProperty('filter', 'invert(100%)', 'important');
      }, 1);
    } else {
      console.error('Hamburger element not found.');
    }
    return;
  }

  if (pathname === '/') {
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom 100vh',
      scrub: true,
      onUpdate({ progress }) {
        const invertValue = progress * 100;
        gsap.to(targets, {
          filter: `invert(${invertValue}%)`,
          duration: 0.1,
          overwrite: 'auto',
        });
        gsap.to(navbar, {
          backgroundColor: `rgba(244, 243, 241, ${progress})`,
          duration: 0.1,
          overwrite: 'auto',
        });
      },
    });
    return;
  }

  // Default case
  gsap.set(navbar, { backgroundColor: 'var(--bs-cream)' });
  gsap.set('.hamburger', { filter: 'invert(0%)' });
  gsap.set('.navbar-log h2', {
    filter: 'invert(0%)',
    color: 'var(--bleu-soverain-bleu)',
  });
};

export default navBackgroundAnimationMobile;
