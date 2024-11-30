$(document).ready(function () {
    let cart = [];

    // Load cart from localStorage if available
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        renderCart();
    }

    // Add to Cart
    $('.add-cart-btn').on('click', function (e) {
        e.preventDefault();
        const productCard = $(this).closest('.product-card');
        const product = {
            id: productCard.find('.product-name').text().trim(),
            name: productCard.find('.product-name').text().trim(),
            price: parseFloat(productCard.find('.product-price').text().replace('$', '')),
            img: productCard.find('.product-img img').attr('src'),
            quantity: 1
        };

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        saveCart();
        renderCart();
    });

    // Add to Cart for view.html
    $('.add-cart-view-btn').on('click', function (e) {
        e.preventDefault();
        const product = {
            id: document.querySelector('.product-name h2').textContent.trim(),  
            name: document.querySelector('.product-name h2').textContent.trim(),
            price: parseFloat(document.querySelector('.product-detail span').textContent.replace('$', '').trim()),
            img: document.querySelector('.product-view img').getAttribute('src'),
            quantity: parseInt(document.querySelector('.quantity input[name="quantity"]').value.trim()),
        };

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        saveCart();
        renderCart();
    });

    // Render Cart
    function renderCart() {
        const cartContainer = $('.shopping-cart');
        const cartItems = cartContainer.find('.item').not('.cart-footer').remove();

        let totalPrice = 0;
        cart.forEach((item) => {
            const cartItem = `
                <div class="item" data-id="${item.id}">
                    <div class="image"><img src="${item.img}" alt="${item.name}" /></div>
                    <div class="product_name">${item.name}</div>
                    <div class="quantity">
                        <button class="plus-btn" type="button">+</button>
                        <input type="text" value="${item.quantity}" />
                        <button class="minus-btn" type="button">-</button>
                    </div>
                    <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="delete-btn buttons">X</button>
                </div>`;
            cartContainer.find('.cart-footer').before(cartItem);
            totalPrice += item.price * item.quantity;
        });

        $('.total-price span').text(`$${totalPrice.toFixed(2)}`);
    }

    // Save Cart
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update Quantity
    $(document).on('click', '.plus-btn, .minus-btn', function () {
        const itemId = $(this).closest('.item').data('id');
        const product = cart.find((item) => item.id === itemId);

        if ($(this).hasClass('plus-btn')) {
            product.quantity++;
        } else if ($(this).hasClass('minus-btn') && product.quantity > 1) {
            product.quantity--;
        }

        saveCart();
        renderCart();
    });

    // Delete Item
    $(document).on('click', '.delete-btn', function () {
        const itemId = $(this).closest('.item').data('id');
        cart = cart.filter((item) => item.id !== itemId);

        saveCart();
        renderCart();
    });

    // Clear Cart
    $('.clear-cart-btn').on('click', function () {
        cart = [];
        saveCart();
        renderCart();
    });

    // check cart for checkout
    if (cart.length === 0) {
        $('#checkout-btn').on('click', function (e) {
            e.preventDefault();
        });
    }
});