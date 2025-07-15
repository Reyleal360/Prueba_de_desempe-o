import { renderLogin } from '../views/login.js';
import { renderRegister } from '../views/register.js';
import { renderDashboard } from '../views/dashboard.js';
import { renderCreateEvent } from '../views/createEvents.js';
import { renderEditEvent } from '../views/editEvents.js';
import { getSession } from '../utils/auth.js';
import { renderNotFound } from '../views/notFound.js';

const routes = {
  '/login': renderLogin,
  '/register': renderRegister,
  '/dashboard': renderDashboard,
  '/dashboard/events/create': renderCreateEvent,
  // dynamic edit route handled manually
};

function parseLocation() {
  return location.hash.slice(1).toLowerCase() || '/login';
}

function findComponentByPath(path) {
  if (path.startsWith('/dashboard/events/edit')) {
    return renderEditEvent;
  }
  return routes[path] || null;
}

export function navigateTo(path) {
  location.hash = path;
}

export function initRouter() {
  window.addEventListener('hashchange', router);
  router();
}

function router() {
  const path = parseLocation();
  const isAuth = !!getSession();

  // protección de rutas
  if (!isAuth && path.startsWith('/dashboard')) {
    return navigateTo('/login');
  }
  if (isAuth && (path === '/login' || path === '/register')) {
    return navigateTo('/dashboard');
  }

  const component = findComponentByPath(path);
  if (component) {
    component();
  } else {
    renderNotFound();
  }
}
