let cart = {};

function addToCart(productName, price) {
    if (cart[productName]) {
        cart[productName].quantity += 1;
    } else {
        cart[productName] = { price: price, quantity: 1 };
    }
    updateCart();
}

function removeFromCart(productName) {
    if (cart[productName]) {
        if (cart[productName].quantity > 1) {
            cart[productName].quantity -= 1;
        } else {
            delete cart[productName];
        }
    }
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    let total = 0;
    for (let product in cart) {
        const item = cart[product];
        total += item.price * item.quantity;
        cartElement.innerHTML += `
            <div>
                <h3>${product}</h3>
                <p>Harga: Rp ${item.price}</p>
                <p>Jumlah: ${item.quantity}</p>
                <button onclick="addToCart('${product}', ${item.price})">Tambah</button>
                <button onclick="removeFromCart('${product}')">Kurangi</button>
            </div>
            <hr>
        `;
    }

    if (total === 0) {
        cartElement.innerHTML = '<p>Keranjang masih kosong.</p>';
    } else {
        cartElement.innerHTML += `<h3>Total: Rp ${total}</h3>`;
    }
}

// FITUR TRANSFER DATA TO NEW WINDOW
function goToProductPage(productName, price) {
    const url = `keranjang.html?name=${encodeURIComponent(productName)}&price=${price}`;
    window.location.href = url;
}

// FITUR GO BACK 
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        price: params.get('price')
    };
}

function displayProductDetails() {
    const { name, price } = getQueryParams();
    const detailsElement = document.getElementById('product-details');
    if (name && price) {
        detailsElement.innerHTML = `
            <h2>${name}</h2>
            <p>Harga: Rp ${price}</p>
        `;
    } else {
        detailsElement.innerHTML = '<p>Detail produk tidak tersedia.</p>';
    }
}

function goBack() {
    window.location.href = 'index.html';
}

// Tampilkan detail produk saat halaman dimuat
window.onload = displayProductDetails;


// BUTTON + - AND HARGA TOTAL
document.addEventListener('DOMContentLoaded', () => {
    const unitPrice = parseInt(document.getElementById('unitPrice').innerText);
    const quantityElement = document.getElementById('quantity');
    const totalPriceElement = document.getElementById('totalPrice');
    const allTotal = document.getElementById('allTotal')
    const increaseButton = document.getElementById('increaseButton');
    const decreaseButton = document.getElementById('decreaseButton');

    let quantity = parseInt(quantityElement.innerText);

    function updateTotalPrice() {
        const totalPrice = unitPrice * quantity;
        totalPriceElement.innerText = totalPrice;

        const allTotalPrice = (unitPrice * quantity) + 24500;
        allTotal.innerText = allTotalPrice;
    }

    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityElement.innerText = quantity;
        updateTotalPrice();
    });

    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityElement.innerText = quantity;
            updateTotalPrice();
        }
    });

    // Initial calculation
    updateTotalPrice();
});
