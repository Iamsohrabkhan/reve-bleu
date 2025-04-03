const convertToAnchor = () => {
  // const isTouchDevice =
    // "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isTouchDevice = false;

  document.querySelectorAll("div[data-href]").forEach((div) => {
    const href = div.getAttribute("data-href");

    if (isTouchDevice) {
      // Ensure divs remain as divs on touch devices
      div.style.cursor = "pointer"; // Optional: Make it look clickable
    } else {
      // Convert to anchor on non-touch devices
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.innerHTML = div.innerHTML;
      anchor.className = div.className;
      anchor.setAttribute("data-barba", "link");
      div.replaceWith(anchor);
    }
  });
};

export default convertToAnchor;
