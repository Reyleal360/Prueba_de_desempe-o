import { navigateTo } from "../router";
import { api } from "../services/api";
import { qs} from "../utils/dom";

export async function showEditEvents() {
    const app = document.getElementById('app');
    const id = location.hash.split('/').pop();
    const event = await api.getEventById(id);

    if (!event) {
        app.innerHTML = `<p>Event not found</p>`;
        return;
    }
    app.innerHTML = `
        <h2>Edit Event</h2>
        <form id="editEventForm">
        <input type="name" value="${event.name}" name="name" placeholder="Event Name" required>
        <textarea name="description" placeholder="Event Description" required>${event.description || ''}</textarea>
        <input type="date" value="${event.date}" name="date" required>
        <input type="time" value="${event.time}" name="time" required>
        <input type="number" value="${event.location}" name="capacity" placeholder="Capacity" required>
        <button type="submit">Save Changes</button>
        <button type="button" id="cancelButton">Cancel</button>
        </form>
    `;

    qs(app, '#cancelBtn').addEventListener('click', () => navigateTo('/dashboard'));
    qs(app, '#editEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.target).entries());
        body.enlorlled = event.enrolled  || [];
        await api.updateEvent(id, body);
        alert('Event updated successfully');
        navigateTo('/dashboard');
    });

}