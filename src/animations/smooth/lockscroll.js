const lockScroll = () => {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };
  
  export default lockScroll;