import { navigateTo } from "../router";
import { renderDashboardAdmin } from "./dashboardAdmin";

export function renderDashboard() {
    const user = getSession();
    if (!user) return navigateTo('/login');

    if (user.role !== 'admin') {
        renderDashboardAdmin();
    }else {
        renderDashboardVisitor();
    }
}