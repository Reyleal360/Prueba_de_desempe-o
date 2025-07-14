export async function showDashboard(user) {
    document.getElementById('app').innerHTML = `
    <div class="container">    
    <h1>Dashboard (${user.rolID === 1 ? "worker" : "customer"})</h1>
    <p>Welcome ${user.name}</p>
    <button id="logoutButton">Logout</button>
    <div id="eventsList"></div>
    </div>
        `; 
    
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        location.hash = '/';
    });
    
}