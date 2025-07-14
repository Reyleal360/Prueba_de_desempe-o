const SESSION_KEY = 'event_session';

export function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function loadSessionFromStorage() {
    const data = localStorage.getItem(SESSION_KEY);
    if (data) {
        window.__SESSION__ = JSON.parse(data);
    }
}

export function getSession() {
    return window.__SESSION__ || null;
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.__SESSION__ = null;
}