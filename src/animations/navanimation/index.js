import menuClose from "./menu-close";
import menuOpen from "./menu-open";
import imageshover from "./imageshover";

const navAnimation = () => {
  const hamburger = document.querySelector(".hamburger");
  const cross = document.querySelector(".cross-icon");
  let originalPaddingRight = ""; // Store the original padding

  const disableScroll = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    originalPaddingRight = document.body.style.paddingRight; // Store original padding

    document.body.style.overflow = "hidden"; // Prevent scrolling
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Compensate for scrollbar width
  };

  const enableScroll = () => {
    document.body.style.overflow = ""; // Restore scrolling
    document.body.style.paddingRight = originalPaddingRight; // Restore original padding
  };

  hamburger.addEventListener("click", () => {
    menuOpen();
    disableScroll();
  });

  cross.addEventListener("click", () => {
    menuClose();
    enableScroll();
  });

  if (window.innerWidth > 766) {
    imageshover();
  }
};

export default navAnimation;
