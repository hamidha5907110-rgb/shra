document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const sellForm = document.getElementById("sell-form");

    // 1. Fetch and Load Initial Data from JSON
    // Note: To fetch local JSON files, you must run this via a local server (like VS Code Live Server)
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => renderProduct(product));
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
            productGrid.innerHTML = "<p>Error loading products. Make sure you are running a local server.</p>";
        });

    // 2. Function to Render a Product Card to the UI
    function renderProduct(product) {
        const card = document.createElement("div");
        card.classList.add("glass-card");
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${parseFloat(product.price).toFixed(2)}</p>
            <p style="font-size: 0.8rem; color: #bbb; margin-bottom: 15px;">${product.description}</p>
            <button class="glow-btn" onclick="buyItem('${product.name}')">Buy Now</button>
        `;
        
        productGrid.appendChild(card);
    }

    // 3. Handle the "Sell" Form Submission (Dynamic Data Handling)
    sellForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        // Gather data from the form
        const newProduct = {
            id: Date.now(), // Generate a unique ID
            name: document.getElementById("itemName").value,
            price: document.getElementById("itemPrice").value,
            image: document.getElementById("itemImage").value,
            description: document.getElementById("itemDesc").value
        };

        // Render the new item dynamically into the grid
        renderProduct(newProduct);

        // Reset the form and alert the user
        sellForm.reset();
        alert(`Success! "${newProduct.name}" is now listed for sale.`);
        
        // Scroll back up to the purchase section to see the new item
        window.location.href = "#purchase-section";
    });
});

// Simple function to simulate buying
function buyItem(itemName) {
    alert(`Initiating secure checkout for: ${itemName}`);
}
