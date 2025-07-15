import { navigateTo } from '../router/index.js';
import { api } from '../services/api.js';
import { getSession } from '../utils/auth.js';
import { qs } from '../utils/dom.js';

export async function renderVisitorDashboard() {
  const app = document.getElementById('app');
  const events = await api.getEvents();
  const user = getSession();

  app.innerHTML = `
  <div class="dashboard">
    <h2>events available</h2>
    </div>
        <button id="logoutBtn">Logout</button>
    <table>
      <thead><tr><th>Name</th><th>Date</th><th>Capacity</th><th></th></tr></thead>
      <tbody>
        ${events.map(ev => {
          const enrolled = ev.enrolled?.includes(user.id);
          const full = ev.enrolled && ev.enrolled.length >= parseInt(ev.capacity);
          let action = '';
          if (full) {
            action = '<span>Completado</span>';
          } else if (enrolled) {
            action = '<button data-id="' + ev.id + '" class="unenroll">Cancel</button>';
          } else {
            action = '<button data-id="' + ev.id + '" class="enroll">Sign up</button>';
          }
          return `
            <tr>
              <td>${ev.name}</td>
              <td>${ev.date}</td>
              <td>${ev.capacity}</td>
              <td>${action}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('eventos_session');
    navigateTo = ('/login');
  });
  qs(app, 'tbody').addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    const event = await api.getEventById(id);
    event.enrolled = event.enrolled || [];

    
    if (e.target.classList.contains('enroll')) {
      if (event.enrolled.length >= event.capacity) return alert('Full capacity');
      event.enrolled.push(user.id);
    }
    if (e.target.classList.contains('unenroll')) {
      event.enrolled = event.enrolled.filter(uid => uid !== user.id);
    }
    await api.updateEvent(id, event);
    renderVisitorDashboard();
  });
}
