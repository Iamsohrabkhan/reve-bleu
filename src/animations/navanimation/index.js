import menuClose from './menu-close';
import menuOpen from './menu-open';
import imageshover from './imageshover';

const navAnimation = () => {
  const hamburger = document.querySelector('.hamburger');
  const cross = document.querySelector('.cross-icon');
  const overlay = document.createElement('div');
  overlay.className = 'scroll-lock-overlay';
  const lockScroll = () => {
    document.body.appendChild(overlay);
  };

  const unlockScroll = () => {
    overlay.remove();
  };

  hamburger.addEventListener('click', () => {
    menuOpen();
    lockScroll();
  });

  cross.addEventListener('click', () => {
    menuClose();
    unlockScroll();
  });

  if (window.innerWidth > 766) {
    imageshover();
  }
};

export default navAnimation;
