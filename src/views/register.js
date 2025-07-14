import { api } from "../services/api";
import { saveSession } from "../utils/auth";
import { navigateTo } from '../router/index.js';
import { qs } from "../utils/dom";

export function showRegiter(){
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="container">    
    <h1>Register for Event Manager</h1>
        <form id="registerForm">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <select  name="rolID" required>
                <option value="1">Worker</option>
                <option value="2">Customer</option>
            </select>
            <button type="submit">Register</button>
            <a href="#/login">Already have an account? Login</a>

        </form>
    </div>
    `;


    qs(app, '#registerForm').onsubmit = async e => {
        e.preventDefault();
       const body = Object.fromEntries(new FormData(e.target).entries());
        body.id = Date.now();
        await api.createUser(body);
        saveSession(body);
        navigateTo('/dashboard');

    }}