let allCoins = [];

async function getCrypto() {

    const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100"
    );
    const data = await response.json();
    allCoins = data;
    displayCoins(data);

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

        <p>Current Price: $${coin.current_price.toLocaleString()}</p>

        <p class="${changeClass}">
            24h Change: ${change.toFixed(2)}%
        </p>

        <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>

        `;

        container.appendChild(coinElement);

    });

    }

    function searchCrypto() {
    const input = document
        .getElementById("search-input")
        .value
        .toLowerCase();
    const filtered = allCoins.filter(coin =>
        coin.name.toLowerCase().includes(input) ||
        coin.symbol.toLowerCase().includes(input)
    );

    displayCoins(filtered);

}

getCrypto();