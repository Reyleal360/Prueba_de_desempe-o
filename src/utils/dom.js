
export function qs(root, selector) {
    return root.querySelector(selector);
  }
  // Function to select multiple elements
  export function qsa(root, selector) {
    return Array.from(root.querySelectorAll(selector));
  }
  