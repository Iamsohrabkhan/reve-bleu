function reInitWebflow() {
    if (window.Webflow) {
      window.Webflow.require("ix2").init();
    }
  }
  export default reInitWebflow