import { navigateTo } from "../router";
import { getSession } from "../utils/auth";
import { renderDashboardAdmin } from "./dashboardAdmin";
import { renderDashboardVisitor } from "./dashboardVisitor";

export function renderDashboard() {
    const user = getSession();
    if (!user) return navigateTo('/login');

    if (user.role !== 'admin') {
        renderDashboardAdmin();
    }else {
        renderDashboardVisitor();
    }
}