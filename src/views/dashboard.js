import { getSession } from '../utils/auth.js';
import { navigateTo } from '../router/index.js';
import { renderAdminDashboard } from './dashboardAdmin.js';
import { renderVisitorDashboard } from './dashboardVisitor.js';

export function renderDashboard() {
  const user = getSession();
  if (!user) return navigateTo('/login');

  if (user.role === 'admin') {
    renderAdminDashboard();
  } else {
    renderVisitorDashboard();
  }
}
