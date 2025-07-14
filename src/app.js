import { loadSessionFromStorage } from "./utils/auth";

document.addEventListener('DOMContentLoaded', () => {
    loadSessionFromStorage();
    initRouter();
});