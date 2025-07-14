export function qs(root, selector) {
    return root.querySelector(selector);
}
export function qsa(root, selector) {
    return Array.from(root.querySelectorAll(selector));
}