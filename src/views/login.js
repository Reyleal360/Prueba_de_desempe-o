export function showLogin(){
    if(localStorage.getItem('currentUser')) {
        location.hash = '/dashboard';
        return;
    }
    document.getElementById('app').innerHTML = `
    <div class="container">    
    <h1>Login to Event Manager</h1>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="btn-submit">Login</button>
        </form>
        a href="#/register">Don't have an account? Register</a>
    </div>
    `;

    document.getElementById('loginForm').onsubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const input = form.username.value.trim();
        const password = form.password.value.trim();

        const query = input.includes('@') 
        ? 'email=${encodeURIComponent(username)}'
        : 'username=${encodeURIComponent(username)}'; 

        const res = await fetch(`http://localhost:3000/users?${query}`);
        const users = await res.json();
        const user = users[0];

        if (!user || user.password !== password) {
            alert('Invalid username or password');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        location.hash = '/dashboard';
    } 
} 

