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

    document.getElementById('registerForm').onsubmit = async e => {
        e.preventDefault();
        const f = e.target;
        const newUser ={
         username : f.username.value.trim(),
         email : f.email.value.trim(),
         password : f.password.value.trim(),
         roleID : 2 // Default role for new users
        };

    const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, roleID })
    });

}



}