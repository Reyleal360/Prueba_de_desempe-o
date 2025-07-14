const BASE_URL = 'http://localhost:3000';

async function request(endpoint, options = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export const api = {
  // USERS
  getUsers: () => request('/users'),
  createUser: (body) => request('/users', { method: 'POST', body: JSON.stringify(body) }),
  // EVENTS
  getEvents: () => request('/events'),
  getEventById: (id) => request(`/events/${id}`),
  createEvent: (body) => request('/events', { method: 'POST', body: JSON.stringify(body) }),
  updateEvent: (id, body) => request(`/events/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),
};
