import navAnimation from './animations/navanimation';
import imageTransition from './animations/image-transition';
import homeLeave from './animations/image-transition/homeleave';
import initializeSwipers from './animations/crousel/initializeSwipers';
import projectLeave from './animations/image-transition/projectleave';
import barba from '@barba/core';
import scrollToElement from './utlis/scrolltoElement';
import scrollToTop from './utlis/scrolltotop';
import instantScroll from './utlis/instantScroll';
import cursor from './animations/image-transition/cursor';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import navBackgroundAnimation from './animations/navanimation/navbarbackgroundanimation';
import navBackgroundAnimationMobille from './animations/navanimation/navbarBackgroundAnimationMobile';

import convertToAnchor from './utlis/converttoanchor';
import checkRoute from './utlis/checkRoute';
import { restartWebflow } from '@finsweet/ts-utils';
// import smoothScroll from "./animations/smooth/smoothscroll";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  navAnimation();
  if (window.innerWidth < 766) {
    initializeSwipers();
    navBackgroundAnimationMobille();
  }

  const navElement = document.querySelector('.navbar-home');
  if (navElement) {
    let navHeight = navElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
  }
});

// window.addEventListener("load", () => {
//   window.scrollTo(0, 0);
// });

if (window.innerWidth > 766) {
  let prevLink = null;

  barba.hooks.beforeEnter(({ next, trigger }) => {
    let namespace = next.namespace;
    cursor(namespace);
    convertToAnchor();
  });

  barba.hooks.after(async () => {
    await restartWebflow();
    const videos = document.querySelectorAll('video');
    if (videos) {
      videos.forEach((video) => {
        video.autoplay = true;
        video.load(); // Ensure the autoplay is triggered
      });
    }
  });

  barba.hooks.afterEnter(({ next, trigger }) => {
    let namespace = next.namespace;
    navBackgroundAnimation(namespace);
  });

  barba.init({
    views: [
      {
        namespace: 'project',
        beforeEnter() {
          instantScroll();
        },
        afterEnter() {
          initializeSwipers();
        },
        beforeLeave({ current }) {
          prevLink = current.url.path;
        },
      },
      {
        namespace: 'home',
        beforeEnter() {
          if (prevLink) {
            let i = checkRoute(prevLink);
            const element = document.querySelectorAll('._01-charter')[i];
            instantScroll(element);
          }
          const link = document.querySelector('.link-06');
          const image = document.querySelector('.image-20._6');

          if (link && image) {
            image.style.transition = 'opacity 0.5s ease-in-out';
            link.addEventListener('mouseenter', () => {
              image.style.opacity = '1';
            });
            link.addEventListener('mouseleave', () => {
              image.style.opacity = '0';
            });
          }
        },
      },
    ],
    transitions: [
      {
        name: 'home-to-project',
        from: { namespace: ['home'] },
        to: { namespace: ['project'] },
        async leave({ current, trigger }) {
          let targetTrigger = trigger.classList.contains('feature-section')
            ? trigger
            : trigger.closest('.feature-section');
          await scrollToElement(targetTrigger);
          await homeLeave(current, targetTrigger);
        },
      },
      {
        name: 'project-to-home',
        from: { namespace: ['project'] },
        to: { namespace: ['home'] },
        async leave({ current, trigger }) {
          await scrollToTop();
          let targetTrigger = trigger.classList.contains('content-wrapper')
            ? trigger
            : trigger.closest('.content-wrapper');
          await projectLeave(current, targetTrigger);
        },
      },
    ],
  });
}
