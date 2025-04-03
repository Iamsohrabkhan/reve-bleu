import gsap from "gsap";

const homeLeave = (current, trigger) => {
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: "power4.inOut" },
  });
  const image = trigger.querySelector(".feature-image");
  const imageWrapper = trigger.querySelector(".feature-image-wrapper");

  tl.to(imageWrapper, {
    clipPath: "inset(12.5%)",
  });
  tl.to(
    image,
    {
      scale: 0.75,
      delay: 0.08,
    },
    0
  );
  tl.to(
    ".open",
    {
      yPercent: -100,
      duration: 0.6,
    },
    0
  );
  tl.to(
    ".close",
    {
      yPercent: 0,
      duration: 0.6,
    },
    "<"
  );

  return tl;
};

export default homeLeave;
