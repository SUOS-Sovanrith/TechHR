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
        showAlert('success', 'Product added to cart successfully!');
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
        showAlert('success', 'Product added to cart successfully!');
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
        showConfirmation("Are you sure you want to delete this item from the cart?").then(function (confirmed) {
            if (confirmed) {
                // Get the item ID to be deleted
                
                // Remove the item from the cart
                cart = cart.filter((item) => item.id !== itemId);
                
                // Save the updated cart and re-render it
                saveCart();
                renderCart();
            }
        }).catch(function (error) {
            console.error("Error in confirmation:", error);
        });
    });

    // Clear Cart
    $('.clear-cart-btn').on('click', function () {
        showConfirmation("Are you sure you want to delete this item from the cart?").then(function (confirmed) {
            if (confirmed) {
                cart = [];
                saveCart();
                renderCart();
            }
        }).catch(function (error) {
            console.error("Error in confirmation:", error);
        });
    });

    // check cart for checkout
    $('#checkout-btn').on('click', function (e) {
        if (cart.length === 0) {
            e.preventDefault();
            showAlert('warning', 'Your cart is empty.');
        }
    });

});