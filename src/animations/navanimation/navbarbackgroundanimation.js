import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance = null; // Store ScrollTrigger instance globally

const navBackgroundAnimation = (namespace) => {
  const navbar = document.querySelector('.navbar-home');
  const hero = document.querySelector('.home-hero');
  const cream = getComputedStyle(document.documentElement).getPropertyValue('--inital-logo-color').trim();
const blue = getComputedStyle(document.documentElement).getPropertyValue('--bleu-soverain-bleu').trim();

// Function to interpolate color based on progress (0 to 1)
const getInterpolatedColor = gsap.utils.interpolate(cream, blue);

  if (!navbar) return;

  const targets = ['.hamburger', '.navbar-log h2', '.navbar-home .cta-01'];
  const scrollY = window.scrollY || window.pageYOffset; // Get current scroll position

  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    scrollTriggerInstance = null;
  }

  if (namespace === 'home') {
    const heroHeight = hero?.offsetHeight || 1; // Avoid division by zero
    const initialProgress = Math.min(scrollY / heroHeight, 1); // Get initial progress (0 to 1)

    // Set navbar and targets immediately based on initial scroll position
    gsap.set(targets, { filter: `invert(${initialProgress * 100}%)` });
    gsap.set(navbar, { backgroundColor: `rgba(244, 243, 241, ${initialProgress})` });
    gsap.set('.navbar-log h2', { color: getInterpolatedColor(initialProgress), filter: 'invert(0%)' });

    // Create a new ScrollTrigger instance
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom 100vh',
      scrub: true,
      onUpdate({ progress }) {
        gsap.to(['.hamburger', '.navbar-home .cta-01'], {
          filter: `invert(${progress * 100}%)`,
          duration: 0.1,
          overwrite: 'auto',
        });
        gsap.to('.navbar-log h2', {
          color: getInterpolatedColor(progress),
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

    // Small delay to ensure ScrollTrigger resets properly
    setTimeout(() => ScrollTrigger.refresh(), 100);
  } else if (namespace === 'project') {
    let ham = document.querySelector('.hamburger');
    if (ham) {
      setTimeout(() => {
        ham.style.setProperty('filter', 'invert(100%)', 'important');
      }, 1); // 1-second delay
    } else {
      console.log('no ham');
    }

    gsap.set(targets, { filter: `invert(100%)` });
    gsap.set(navbar, { backgroundColor: 'var(--bs-cream)' });

    gsap.set('.navbar-log h2', { filter: 'invert(0%)', color: 'var(--bleu-soverain-bleu)' });
  }
};

export default navBackgroundAnimation;
