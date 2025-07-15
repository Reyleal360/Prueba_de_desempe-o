import { api } from '../services/api.js';
import { navigateTo } from '../router/index.js';
import { qs } from '../utils/dom.js';
// Function to render the admin dashboard
export async function renderAdminDashboard() {
  const app = document.getElementById('app');
  const events = await api.getEvents();
  app.innerHTML = `
    <h2>Panel Administrador</h2>
    <button id="newEventBtn">Create event </button>
    <button id="logoutBtn"> Log out </button>
    <table>
      <thead><tr><th>Name</th><th>Date</th><th>Capicity</th><th>Accions</th></tr></thead>
      <tbody>
        ${events.map(ev => `
          <tr>
            <td>${ev.name}</td>
            <td>${ev.date}</td>
            <td>${ev.capacity}</td>
            <td>
              <button data-id="${ev.id}" class="edit">edit</button>
              <button data-id="${ev.id}" class="del">delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('eventos_session');
    navigateTo = ('/login')
  });
  // Add event listeners for creating new events and editing existing ones
  qs(app, '#newEventBtn').addEventListener('click', () => navigateTo('/dashboard/events/create'));
  qs(app, 'tbody').addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('edit')) {
      navigateTo('/dashboard/events/edit/' + id);
    }
    if (e.target.classList.contains('del')) {
      if (confirm('¿Eliminar evento?')) {
        await api.deleteEvent(id);
        renderAdminDashboard();
      }
    }
  });

}
