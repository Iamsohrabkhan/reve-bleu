import gsap from "gsap/all";

const menuClose = () => {
  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "power4.inOut",
    },
  });

  const navMenu = document.querySelector(".nav-menus");
  const navImages = document.querySelectorAll(".nav-menus .nav-images");

  tl.fromTo(
    ".background-overlay",
    { opacity: 0.8 },
    { opacity: 0, duration: 1 }
  );
  tl.fromTo(
    navImages,
    { clipPath: "inset(0% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 100% 0%)" },
    0
  );
  tl.to(
    navMenu,
    // { clipPath: "inset(0% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 100% 0%)",
      delay: 0.05,
      onComplete() {
        navMenu.style.pointerEvents = "none";
      },
    },
    0
  );
};

export default menuClose;
