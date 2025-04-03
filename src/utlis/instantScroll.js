function instantScroll(element) {
  const elementTop = element
    ? element.getBoundingClientRect().top + window.scrollY
    : 0;

  window.scrollTo(0, elementTop);
}

export default instantScroll;
