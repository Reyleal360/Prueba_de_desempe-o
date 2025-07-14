import { navigateTo } from "../router";
import { api } from "../services/api";
import { saveSession } from "../utils/auth";
import { qs } from "../utils/dom";

export function renderLogin(){
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h1>Login</h1>
            <form id="loginForm">
                <input   name="email"  type="email" placeholder="Email" required> 
                <input  name="password" type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
                <a href="#/register">Don't have an account? Register</a>
            </form>
        </div>
    `;
    qs(app, '#loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.target).entries());
        const users = await api.getUsers();
        const user = users.find(u => u.email === body.email && u.password === body.password);
        if (user) {
            saveSession(user);
            navigateTo = '/dashboard';
        } else {
            alert('Invalid credentials');
        }
    });
}