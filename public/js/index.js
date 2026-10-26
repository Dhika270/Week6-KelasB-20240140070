let allProducts = [];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('errorBox');

// Ambil data dari API
async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=30');
        if (!response.ok) throw new Error('Gagal mengambil data dari server.');
        
        const data = await response.json();
        allProducts = data.products;

        loading.classList.add('hidden');
        populateCategories(allProducts);
        displayProducts(allProducts);
    } catch (error) {
        loading.classList.add('hidden');
        errorBox.textContent = `Terjadi kesalahan: ${error.message}`;
        errorBox.classList.remove('hidden');
    }
}

// Isi pilihan kategori ke dropdown filter
function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.toUpperCase();
        categorySelect.appendChild(option);
    });
}

// Tampilkan produk ke halaman web
function displayProducts(products) {
    productGrid.innerHTML = '';

    if (products.length === 0) {
        productGrid.innerHTML = '<p class="loading">Produk tidak ditemukan.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Badge stok jika di bawah 10 sesuai instruksi gambar
        let stockBadgeHTML = '';
        if (product.stock < 10) {
            stockBadgeHTML = `<span class="stock-badge">Stok Menipis</span>`;
        }

        card.innerHTML = `
            ${stockBadgeHTML}
            <img src="${product.thumbnail}" alt="${product.title}">
            <div>
                <div class="category">${product.category}</div>
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Filter dan Search event listeners
function filterAndSearch() {
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filtered = allProducts.filter(product => {
        const matchesName = product.title.toLowerCase().includes(keyword);
        const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
        return matchesName && matchesCategory;
    });

    displayProducts(filtered);
}

searchInput.addEventListener('input', filterAndSearch);
categorySelect.addEventListener('change', filterAndSearch);

// Jalankan saat pertama kali dibuka
window.addEventListener('DOMContentLoaded', fetchProducts);