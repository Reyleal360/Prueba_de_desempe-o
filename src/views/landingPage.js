export function showLanding(){
    document.getElementById('app').innerHTML = `
    <div class="container">    
    <h1>Welcome to our event manager</h1>
        <p>This is the starting point of our application.</p>
        a href="#/login">Go to Login</a>
        <a href="#/register">Go to register</a>
    `;
}
