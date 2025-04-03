import gsap from "gsap";

const imageshover = () => {
  let zIndexCounter = 1;
  let lastHoveredIndex = 0; // Assume the first image was previously hovered
  const navImagesContainer = document.querySelector(".nav-images");
  const navImages = document.querySelectorAll(".nav-images .nav-img");
  const navItems = document.querySelectorAll(".nav-links .nav-link");
  const cross = document.querySelector(".cross-icon");
  cross.addEventListener("click", () => {
    lastHoveredIndex = 0;
    console.log("cross clicked");
    
  });

  // Set active class based on current path
  navItems.forEach((item) => {
    if (item.getAttribute("href") === window.location.pathname) {
      item.classList.add("nav-active");
    } else {
      item.classList.remove("nav-active");
    }
  });

  navItems.forEach((curr, i) => {
    curr.addEventListener("mouseenter", () => {
      curr.style.fontStyle = "italic";
      curr.style.opacity = 1;

      const originalImage = navImages[i];

      // If the last hovered index was the same as the current one OR it's the first image on first hover
      if (lastHoveredIndex === i || (lastHoveredIndex === 0 && i === 0)) {
        // Clone the original image
        const clonedImage = originalImage.cloneNode(true);
        navImagesContainer.appendChild(clonedImage);

        zIndexCounter++;
        clonedImage.style.zIndex = zIndexCounter;
        originalImage.style.zIndex = zIndexCounter - 1;

        gsap.fromTo(
          clonedImage,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.5 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            onComplete: () => {
              clonedImage.remove();
              originalImage.style.zIndex = zIndexCounter - 1;
            },
          }
        );
      } else {
        // Animate the original image directly
        zIndexCounter++;
        originalImage.style.zIndex = zIndexCounter;

        gsap.fromTo(
          originalImage,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.5 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
          }
        );
      }

      lastHoveredIndex = i; // Update last hovered index
    });

    curr.addEventListener("mouseleave", () => {
      curr.style.fontStyle = "normal";
      curr.style.opacity = 0.8;
    });
  });
};

export default imageshover;
