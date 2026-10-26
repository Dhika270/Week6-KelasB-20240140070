// Objek rules untuk aturan validasi
const rules = {
    name: {
        required: true,
        minLength: 3,
        maxLength: 60,
        pattern: /[a-zA-Z]/
    },
    price: {
        required: true,
        min: 1000,
        max: 100000000
    }
};

// Objek templates untuk menyimpan pilihan template caption
const templates = {
    promo: (name, price, hashtag) => `🔥 PROMO SPESIAL HARI INI! 🔥\n\nDapatkan ${name} sekarang juga hanya dengan harga ${price}!\nJangan sampai kehabisan, stok terbatas sob! 🏃💨\n\nOrder sekarang via link di bio ya!\n\n${hashtag} #PromoSpesial #DiskonAkhirBulan`,
    santai: (name, price, hashtag) => `✨ Hai bestie! Lagi cari yang seger-seger atau asyik buat nemenin hari kamu?\n\nNih kenalin ${name}, harganya ramah banget di kantong cuman ${price} aja lho. Yuk langsung di-order! ☕✨\n\n${hashtag} #TemanSetia #DailyVibes`,
    formal: (name, price, hashtag) => `Pemberitahuan Produk Unggulan\n\nKami mempersembahkan ${name}, produk pilihan terbaik untuk kebutuhan Anda dengan penawaran harga sebesar ${price}.\n\nInformasi pemesanan lebih lanjut dapat menghubungi layanan pelanggan kami.\n\n${hashtag} #ProdukTerbaik #KualitasPremium`
};

const captionForm = document.getElementById('captionForm');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const templateChoice = document.getElementById('templateChoice');

const nameError = document.getElementById('nameError');
const priceError = document.getElementById('priceError');
const resultSection = document.getElementById('resultSection');
const captionOutput = document.getElementById('captionOutput');

// Fungsi pembantu mengubah nama produk jadi hashtag
function generateHashtag(name) {
    return '#' + name
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

// Validasi berdasarkan objek rules
function validateName(showError = false) {
    const val = productNameInput.value.trim();
    const r = rules.name;

    if (val === "") {
        if (showError) nameError.textContent = "Nama produk wajib diisi!";
        return false;
    } else if (val.length < r.minLength || val.length > r.maxLength) {
        if (showError) nameError.textContent = `Nama produk harus ${r.minLength}–${r.maxLength} karakter!`;
        return false;
    } else if (!r.pattern.test(val)) {
        if (showError) nameError.textContent = "Nama produk harus mengandung huruf!";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validatePrice(showError = false) {
    const val = productPriceInput.value.trim();
    const num = Number(val);
    const r = rules.price;

    if (val === "") {
        if (showError) priceError.textContent = "Harga wajib diisi!";
        return false;
    } else if (!Number.isInteger(num)) {
        if (showError) priceError.textContent = "Harga harus berupa angka bulat!";
        return false;
    } else if (num < r.min || num > r.max) {
        if (showError) priceError.textContent = `Harga harus antara Rp ${r.min.toLocaleString('id-ID')} – Rp ${r.max.toLocaleString('id-ID')}!`;
        return false;
    }
    priceError.textContent = "";
    return true;
}

productNameInput.addEventListener('input', () => validateName(true));
productPriceInput.addEventListener('input', () => validatePrice(true));

// Event Submit Form menggunakan objek templates
captionForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameValid = validateName(true);
    const isPriceValid = validatePrice(true);

    if (!isNameValid || !isPriceValid) return;

    const name = productNameInput.value.trim();
    const priceNum = Number(productPriceInput.value);
    const formattedPrice = 'Rp ' + priceNum.toLocaleString('id-ID');
    const selectedTemplateKey = templateChoice.value;
    const hashtag = generateHashtag(name);

    // Ambil fungsi generator dari objek templates
    if (templates[selectedTemplateKey]) {
        const generatedText = templates[selectedTemplateKey](name, formattedPrice, hashtag);
        captionOutput.textContent = generatedText;
        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
});