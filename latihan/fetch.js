// Script latihan / uji coba Fetch API terpisah
console.log("Menguji koneksi ke DummyJSON API...");

fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then(data => console.log("Hasil Uji Coba Fetch:", data))
    .catch(err => console.error("Error uji coba:", err));