import { getSession } from "../utils/auth";
import { qs } from "../utils/dom";

export async function renderDashboard() {
    const app = document.getElementById('app');
    const events = await api.getEvents();
    const user = getSession();

    app.innerHTML = `
    <h2>events avialeble</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Capacity</th>
            </th>
        </thead>
        <tbody>
            ${events.map(event => {
                const enrolled = event.enrolled?.includes(user.id); 
                const full = event.enrolled && event.enrolled.length >= parseInt(event.capacity);   
                let action = '';
                if (full) {
                    action = '<span>Complete</span>';
                }else if (enrolled) {
                    action = `<button  data-id="`+event.id+`" class=unenroll>Cancel</button>`;
                } else {
                    action = `<button  data-id="`+event.id+`" class=enroll>inscribirme</button>`;
                }
                return `
                    <tr>
                        <td>${event.name}</td>
                        <td>${event.date} ${event.time}</td>
                        <td>${event.capacity}</td>
                        <td>${action}</td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    </table>
    `;

    qs(app, 'tbody').addEventListener('click', async (e) => {
        const id =e.target.dataset.id;
        if(!id) return;
        const event = await api.getEventById(id);
        event.enrolled = event.enrolled || [];
        if (e.target.classList.contains('enroll')) {
            if (event.enrolled.length >= event.capacity)return alert('Event is full');
                alert('Event is full');
                return;
                event.enrolled.push(user.id);
            }
            if (e.target.classList.contains('unenroll')) {
                event.enrolled = event.enrolled.filter(uid => uid !== user.id);
            }
            await api.updateEvent(id, event);
            renderDashboard();
        });
    }