import { navigateTo } from "../router";
import { qs } from "../utils/dom";

export function showCreateEvents() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Create Event</h1>
        <form id="createEventForm">
            <input type="text" id="name" name="name" required>
            <textarea  name="description" placeholder="Event Description" required></textarea>
            <input type="date" id="date" name="date" required>
            <input type="number" id="capacity" name="capacity" required>
            <button type="submit">Create Event</button>
            <button type="button" id="cancelButton">Cancel</button>
        </form>
    `;
qs(app, '#cancelButton').addEventListener('click', () => navigateTo('/dashboard'));
qs(app, '#createEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.target).entries());
        body.id = Date.now(); 
        body.enrolled = []; 
        await api.createEvent(body);
        alert('Event created successfully');
        navigateTo('/dashboard');
    });
}