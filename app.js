const BACKEND_URL = "http://127.0.0.1:8000/items";

// 1. Fetch data from Python Backend and render it on screen
async function loadDashboardData() {
    try {
        const response = await fetch(BACKEND_URL);
        const data = await response.json();
        
        const grid = document.getElementById("dataGrid");
        grid.innerHTML = ""; // Clear existing grid items

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Type:</strong> ${item.type}</p>
                <p class="odds">Multiplier: ${item.odds.toFixed(2)}x</p>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error communicating with backend:", error);
    }
}

// 2. Send new UI form data down to the Python Backend
async function submitData() {
    const name = document.getElementById("itemName").value;
    const type = document.getElementById("itemType").value;
    const odds = parseFloat(document.getElementById("itemOdds").value);

    if (!name || !type || isNaN(odds)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const payload = { name, type, odds, active: true };

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.status === 201) {
            // Clear inputs and refresh dashboard items view
            document.getElementById("itemName").value = "";
            document.getElementById("itemType").value = "";
            document.getElementById("itemOdds").value = "";
            loadDashboardData();
        }
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

// Run automatically when the webpage loads
window.onload = loadDashboardData;