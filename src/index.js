import navAnimation from './animations/navanimation';
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


import convertToAnchor from './utlis/converttoanchor';
import checkRoute from './utlis/checkRoute';
import { restartWebflow, WEBFLOW_BREAKPOINTS } from '@finsweet/ts-utils';
import navBackgroundAnimationMobile from './animations/navanimation/navbarBackgroundAnimationMobile';

gsap.registerPlugin(ScrollTrigger);


document.addEventListener('DOMContentLoaded', () => {
  navAnimation();
  if (window.innerWidth < 766) {
    initializeSwipers();
    navBackgroundAnimationMobile();
  }

  const navElement = document.querySelector('.navbar-home');
  if (navElement) {
    let navHeight = navElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
  }
});

window.addEventListener('popstate', () => {
  if (!document.querySelector('[data-barba="wrapper"]')) {
    location.reload();
  }
});


if (window.innerWidth > 766 && document.querySelector('[data-barba="wrapper"]')) {
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
        video.load();
      });
    }
  });

  barba.hooks.afterEnter(({ next, trigger }) => {
    let namespace = next.namespace;
    navBackgroundAnimation(namespace);
  });

  barba.init({
    timeout: 7000,
    views: [
      {
        namespace: 'project',
        beforeEnter(data) {
          instantScroll();
        if (data.current.namespace === 'project' && data.next.namespace === 'project') {
          if (data.current.url !== data.next.url) {
            window.location.reload();
          }
        }
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
