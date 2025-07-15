import { api } from '../services/api.js';
import { navigateTo } from '../router/index.js';
import { qs } from '../utils/dom.js';
// function to render the edit event view
export async function renderEditEvent() {
  const app = document.getElementById('app');
  const id = location.hash.split('/').pop();
  const event = await api.getEventById(id);

  if (!event) {
    return app.innerHTML = '<p>Event no found </p>';
  }
//render the edit event form
  app.innerHTML = `
    <h2>Edit event</h2>
    <form id="eventForm">
      <input name="name"  placeholder="Enter your name "  value="${event.name}"  required />
      <textarea name="description" placeholder="Enter Description">${event.description   }</textarea>
      <input name="date" type="date"  required  value="${event.date}" />
      <input name="capacity" type="number"  placeholder="Capacity" value="${event.capacity}" required />
      <button type="submit">Save</button>
      <button type="button" id="cancelBtn">Cancel</button>
    </form>
  `;
// Add event listeners for the form submission and cancel button
  qs(app, '#cancelBtn').addEventListener('click', () => navigateTo('/dashboard'));
  qs(app, '#eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target).entries());
    body.enrolled = ev.enrolled || [];
    await api.updateEvent(id, body);
    navigateTo('/dashboard');
  });
}
