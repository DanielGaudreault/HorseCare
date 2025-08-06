// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href.includes('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = href;
        }
    });
});

// Cookie notice
document.addEventListener('DOMContentLoaded', () => {
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptButton = document.getElementById('accept-cookies');

    // Check if cookies have been accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieNotice.style.display = 'block';
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotice.style.display = 'none';
    });
});

// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${name} ajouté au panier !`);
        });
    });

    // Render cart on cart.html
    if (cartItemsContainer) {
        const renderCart = () => {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${item.name} - ${item.price.toFixed(2)} C$ x </span>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}">
                    <button class="remove-item" data-index="${index}">Supprimer</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            cartTotalElement.textContent = `Total : ${total.toFixed(2)} C$`;
            checkoutButton.disabled = cart.length === 0;
        };

        // Update quantity
        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.type === 'number') {
                const index = e.target.getAttribute('data-index');
                const newQuantity = parseInt(e.target.value);
                if (newQuantity >= 1) {
                    cart[index].quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            }
        });

        // Remove item
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });

        // Checkout
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                const orderDetails = cart.map(item => `${item.name} x${item.quantity} - ${item.price.toFixed(2)} C$`).join('\n');
                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
                const subject = encodeURIComponent('Commande de Parage Bragdon');
                const body = encodeURIComponent(`Détails de la commande :\n${orderDetails}\n\nTotal : ${total} C$`);
                window.location.href = `mailto:sales@paragebragdon.com?subject=${subject}&body=${body}`;
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });

        renderCart();
    }
});
