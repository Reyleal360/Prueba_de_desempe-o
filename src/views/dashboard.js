export async function showDashboard() {
    document.getElementById('app').innerHTML = `
    <div class="container">    
    <h1>Dashboard (${user.rolID === 1 ? "worker" : "customer"})</h1>
    <p>Welcome ${user.name}</p>
    <button id="logoutButton">Logout</button>
    <div id="eventsList"></div>
    </div>
        `; 
    
    
    
    
    
    }