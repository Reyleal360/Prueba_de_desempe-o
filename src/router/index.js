import { router } from "json-server";
import { renderDashboard } from "../views/dashboardAdmin";
import { showEditEvents } from "../views/editEvents";
import { renderLogin } from "../views/login";
import { showRegiter } from "../views/register";
import { getSession } from "../utils/auth";
import { notFound } from "../views/notFound";
//dynamic import for the dashboard
const routes = {
    '/login':renderLogin,
    '/register': showRegiter,
    '/dashboard': renderDashboard,
    '/dashboard/events/create': showEditEvents,
};// dynamic edit route handled 


function parseLocation() {
   return location.hash.slice(1).toLowerCase() || '/login';
}

function findComponent(path) {
    if(path.startsWith('/dashboard/events/edit/')) {
        return showEditEvents;
    }
    return routes[path] || null;
}
export function navigateTo(path) {
    location.hash = path;
}

export function initRouter() {
    window.addEventListener('hashchange',router);
    router();
}

function router() {
    const path = parseLocation();
    const isAuthenticated =  !!getSession();
    
    // protect routes
if(!isAuthenticated && path.startsWith('/dashboard')) {
        return navigateTo('/login');
    }
    if(isAuthenticated && path === '/login' || path === '/register') {
        return navigateTo ('/dashboard');
    }

    const componet = findComponent(path);
    if(componet) {
        componet();
    }
    else {
        notFound();
    }
}