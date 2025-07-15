import { api } from '../services/api.js';
import { saveSession } from '../utils/auth.js';
import { navigateTo } from '../router/index.js';
import { qs } from '../utils/dom.js';

export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input name="email" type="email" placeholder="email" required />
      <input name="password" type="password" placeholder="password" required />
      <button type="submit">submit</button>
      <p> Don´t have account?  <a href="#/register">Register</a></p>
    </form>
  `;

  qs(app, '#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const users = await api.getUsers();
    const found = users.find(u => u.email === data.email && u.password === data.password);
    if (found) {
      saveSession(found);
      navigateTo('/dashboard');
    } else {
      alert('Password or email incorrect');
    }
  });
}