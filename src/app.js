import { initRouter } from './router/index.js';
import { loadSessionFromStorage } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  loadSessionFromStorage(); //  Load session from localStorage if exists
  initRouter(); // Run the router to handle initial navigation
});
