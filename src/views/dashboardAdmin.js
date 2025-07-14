import { navigateTo } from "../router";
import { api } from "../services/api";
import { qs } from "../utils/dom";

export async function renderDashboardAdmin(){
    const app = document.getEkementById('app');
    const events = await api.getEvents();
    app.innerHTML = `
        <h2>admin panel</h2>
        <button id="createEventBtn">Create Event</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Capacity</th>
                    </tr>
            </thead>
            <tbody>
                ${events.map(event => `
                    <tr>
                        <td>${event.name}</td>
                        <td>${event.date}</td>
                        <td>${event.capacity}</td>
                        <td>
                            <button data-id="${event.id}" class="edit">Edit</button>
                            <button data-id="${event.id}" class="delete">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
qs(app, '#createEventBtn').addEventListener('click', () => navigateTo(`/dashboard/events/create`));
qs(app, 'tbody').addEventListener('click', async (e) => {
const id = e.target.dataset.id;
    if(e.target.classList.contains('edit')) {
        navigateTo(`/dashboard/events/edit/${id}`);
    }
    if(e.target.classList.contains('delete')) {
        if(confirm('Are you sure you want to delete this event?')) {
            await api.deleteEvent(id);
            alert('Event deleted successfully');
            renderDashboardAdmin();
        }
    }
});
}