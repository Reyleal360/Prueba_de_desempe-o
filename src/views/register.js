export function showRegiter(){
    if(localStorage.getItem('currentUser')) {
        location.hash = '/dashboard';
        return;
    }
    document.getElementById('app').innerHTML = `
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
            <button type="submit">Register</button>
        </form>
        <a href="#/login">Already have an account? Login</a>
    </div>
    `;
}