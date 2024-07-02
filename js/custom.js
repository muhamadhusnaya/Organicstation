// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// owl carousel 

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 6
        }
    }
})


// SEARCH BAR 
function handleSearch(event){
    const searchTerm = event.target.value.toLowerCase();
    const productList = document.getElementById('row');
    const products = productList.getElementsByClassName('col-sm-6 col-md-4 col-lg-3');

    Array.from(products).forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add event listener to search bar
document.getElementById('searchInput').addEventListener('input', handleSearch);

// LIST BARANG YANG AKAN DIBELI
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
