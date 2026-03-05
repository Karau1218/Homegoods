//place front-end JavaScript here...
    const searchInput = document.getElementById('global-search');
    const resultsDiv = document.getElementById('search-results');

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length < 2) {
            resultsDiv.innerHTML = '';
            return;
        }

        // The REST call
        const response = await fetch(`/api/products?search=${query}`);
        const products = await response.json();

        // Display results
        resultsDiv.innerHTML = products.map(p => `
            <div class="result-item">
                <a href="/products">${p.name} - ${p.price}</a>
            </div>
        `).join('');
    });
