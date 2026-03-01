let allCoins = [];
let chart;

async function getCrypto() {

    const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100"
    );
    const data = await response.json();
    allCoins = data;
    displayCoins(data);
    drawChart(data);
    const lastUpdated = document.getElementById("last-updated");
    lastUpdated.innerText = `Last Updated: ${new Date().toLocaleTimeString()}`;

    lastUpdated.style.color = "#22c55e";
    setTimeout(() => {
    lastUpdated.style.color = "#94a3b8";
    }, 1000);
    }
    function displayCoins(coins) {
    const container = document.getElementById("crypto-container");
    container.innerHTML = "";
    coins.forEach(coin => {
        const change = coin.price_change_percentage_24h;
        const changeClass = change >= 0 ? "positive" : "negative";
        const coinElement = document.createElement("div");
        coinElement.className = "card";
        coinElement.innerHTML = `
        <div class="coin-header">
            <img src="${coin.image}" width="32">
            <h2>${coin.name}</h2>
        </div>
        <p>Symbol: ${coin.symbol.toUpperCase()}</p>
        <p>Price: $${coin.current_price.toLocaleString()}</p>
        <p class="${changeClass}">24h Change: ${change.toFixed(2)}%</p>
        <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
        `;
        container.appendChild(coinElement);
    });
    }

    function searchCrypto() {
    const input = document.getElementById("search-input").value.toLowerCase();
    const filtered = allCoins.filter(coin =>
        coin.name.toLowerCase().includes(input) ||
        coin.symbol.toLowerCase().includes(input)
    );
    displayCoins(filtered);
    drawChart(filtered);
    }
    function drawChart(coins) {
    const topCoins = coins.slice(0, 5);
    const labels = topCoins.map(c => c.symbol.toUpperCase());
    const prices = topCoins.map(c => c.current_price);
    const ctx = document.getElementById("priceChart").getContext("2d");
    if (chart) chart.destroy(); 
    chart = new Chart(ctx, {
        type: "line",
        data: {
        labels: labels,
        datasets: [{
            label: "Price (USD)",
            data: prices,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
            tension: 0.3,
            fill: true,
        }]
        },
        options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
            beginAtZero: false
            }
        }
        }
    });
}

getCrypto(); 

setInterval(() => {
    getCrypto();
}, 10000);