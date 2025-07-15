import { api } from '../services/api.js';
import { navigateTo } from '../router/index.js';
import { qs } from '../utils/dom.js';

export function renderCreateEvent() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>create Event</h2>
    <form id="eventForm">
      <input name="name" placeholder="name" required />
      <textarea name="description" placeholder="description"></textarea>
      <input name="date" type="date" required />
      <input name="capacity" type="number" placeholder="Capacity" required />
      <button type="submit">Save</button>
      <button type="button" id="cancelBtn">cancel</button>
    </form>
  `;

  qs(app, '#cancelBtn').addEventListener('click', () => navigateTo('/dashboard'));
  qs(app, '#eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target).entries());
    body.id = Date.now();
    body.enrolled = [];
    await api.createEvent(body);
    navigateTo('/dashboard');
  });
}
