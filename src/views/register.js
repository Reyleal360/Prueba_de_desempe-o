import { api } from '../services/api.js';
import { saveSession } from '../utils/auth.js';
import { navigateTo } from '../router/index.js';
import { qs } from '../utils/dom.js';

export function renderRegister() { //reder the table register
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Registro</h2>
    <form id="registerForm">
      <input name="name" placeholder="name" required/>
      <input name="email" type="email" placeholder="email" required/>
      <input name="password" type="password" placeholder="password" required/>
      <select name="role" required>
        <option value="">Select your rol</option>
        <option value="visitor">visitor</option>
        <option value="admin">admin</option>
      </select>
      <button type="submit">Create account</button>
      <p>¿Ya tienes cuenta? <a href="#/login">Login</a></p>
    </form>
  `;
// Add event listeners for form submission and cancel button
  qs(app, '#registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target).entries());
    body.id = Date.now();
    await api.createUser(body);
    saveSession(body);
    navigateTo('/dashboard');
  });
}
