async function scrollToTop() {
    return new Promise((resolve) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      // Check when scrolling stops
      const checkScroll = () => {
        if (window.scrollY === 0) {
          resolve(); 
        } else {
          requestAnimationFrame(checkScroll);
        }
      };
  
      checkScroll(); // Start checking
    });
  }
  
  export default scrollToTop