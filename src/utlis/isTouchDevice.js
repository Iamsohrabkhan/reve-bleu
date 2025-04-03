const isTouchDevice = () => {
    return (
      ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
      window.matchMedia("(hover: none)").matches // Excludes devices with a mouse
    );
  };
  
  console.log(isTouchDevice()); // Should return false on laptops without touchscreens
  
  export default isTouchDevice