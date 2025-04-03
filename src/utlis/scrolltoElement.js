async function scrollToElement(element) {
    return new Promise((resolve) => {
      if (!element) {
        resolve();
        return;
      }
  
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
  
      window.scrollTo({ top: elementTop, behavior: "smooth" });
  
      // Check when scrolling stops
      const checkScroll = () => {
        if (Math.abs(window.scrollY - elementTop) < 1) {
          resolve(); // Resolve the promise when scrolling is complete
        } else {
          requestAnimationFrame(checkScroll);
        }
      };
  
      checkScroll(); // Start checking
    });
  }
  
  export default scrollToElement;
  