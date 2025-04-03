import gsap from "gsap";

const cursor = (namespace) => {
  // Check if the device is touch-enabled
  // const isTouchDevice =
    // "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isTouchDevice = false

  if (!isTouchDevice) {
    if (namespace === "home") {
      gsap.to(".open", { yPercent: 0 });
      gsap.to(".close", { yPercent: 120 });
    } else {
      gsap.to(".open", { yPercent: -120 });
      gsap.to(".close", { yPercent: 0 });
    }

    const projectsWrapper = document.querySelector("._01-charter");

    window.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
      gsap.to(".cursor", { x: x + 10, y: y + 20 });
    });

    document.addEventListener("mouseover", (event) => {
      if (
        event.target.closest("._01-charter") ||
        event.target.closest(".home-split") 
      ) {
        gsap.killTweensOf(".cursor");
        gsap.to(".cursor", { scale: 1, duration: 0.4 });
      }
    });

    document.addEventListener("mouseout", (event) => {
      if (
        event.target.closest("._01-charter") ||
        event.target.closest(".home-split") 
      ) {
        gsap.killTweensOf(".cursor");
        gsap.to(".cursor", { scale: 0, duration: 0.4 });
      }
    });
  }
};

export default cursor;

// import gsap from "gsap";

// const cursor = (namespace) => {
//   if (namespace === "home") {
//     gsap.to(".open", {
//       yPercent: 0,
//     });
//     gsap.to(".close", {
//       yPercent: 120,
//     });
//   } else {
//     gsap.to(".open", {
//       yPercent: -120,
//     });
//     gsap.to(".close", {
//       yPercent: 0,
//     });
//   }

//   const projectsWrapper = document.querySelector("._01-charter");
//   window.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
//     gsap.to(".cursor", {
//       x: x + 10,
//       y: y + 20,
//     });
//   });

//   document.addEventListener("mouseover", (event) => {
//     if (event.target.closest("._01-charter")) {
//       gsap.killTweensOf(".cursor");
//       gsap.to(".cursor", {
//         scale: 1,
//         duration: 0.4,
//       });
//     }
//   });

//   document.addEventListener("mouseout", (event) => {
//     if (event.target.closest("._01-charter")) {
//       gsap.killTweensOf(".cursor");
//       gsap.to(".cursor", {
//         scale: 0,
//         duration: 0.4,
//       });
//     }
//   });
// };

// export default cursor;
