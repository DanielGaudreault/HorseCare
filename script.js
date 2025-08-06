// Product data with descriptions
const productData = {
    "Artimud 300g": {
        price: 30.00,
        description: "Artimud est un produit à base d'argile verte, de miel, de minéraux naturels et d'huiles essentiels. Ses agents actifs naturels éliminent les bactéries et les champignons tout en favorisant la formation de tissus sains. Il est idéal pour remplir les seimes externe et les crevasses peu profondes de la ligne blanche. Grâce à sa consistance épaisse, il restera en place plus longtemps que la plupart des produits ce qui permet aux agents de protection de travailler plus longtemps et empêche les saletés et impuretés d'y entrer. Il est aussi utilisé sous des pads pour garder la sole et la fourchette en santé durant un cycle de ferrage. Pour les crevasses ou seimes plus profondes et mince, nous vous recommandons d'utiliser le Hoof-stuff."
    },
    "Artimud 750g": {
        price: 65.00,
        description: "Artimud 750g est une version plus grande du produit à base d'argile verte, idéal pour un usage prolongé. Il offre les mêmes avantages que l'Artimud 300g, éliminant bactéries et champignons tout en favorisant la santé des tissus. Parfait pour les seimes externes et les crevasses peu profondes. (Remplacez par la description réelle.)"
    },
    "Hoof Stuff": {
        price: 35.00,
        description: "Hoof Stuff est conçu pour les crevasses et seimes plus profondes et minces. Il aide à protéger et renforcer les structures internes du sabot. (Remplacez par la description réelle.)"
    },
    "Field Paste 750g": {
        price: 45.00,
        description: "Field Paste 750g est un produit polyvalent pour le soin des sabots, offrant protection et hydratation. (Remplacez par la description réelle.)"
    },
    "HoneyHeel 100ml": {
        price: 25.00,
        description: "HoneyHeel 100ml est une pommade à base de miel pour traiter les infections et favoriser la guérison des sabots. (Remplacez par la description réelle.)"
    },
    "Sole Cleanse 500ml": {
        price: 30.00,
        description: "Sole Cleanse 500ml est un spray nettoyant pour la sole et la fourchette, éliminant les bactéries et les impuretés. (Remplacez par la description réelle.)"
    },
    "Stronghorn 500ml": {
        price: 40.00,
        description: "Stronghorn 500ml renforce la corne du sabot pour une meilleure résistance et durabilité. (Remplacez par la description réelle.)"
    },
    "Ear Balm 500ml": {
        price: 45.00,
        description: "Ear Balm 500ml est un produit apaisant pour le soin des oreilles des chevaux, réduisant les irritations. (Remplacez par la description réelle.)"
    }
};

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

    if (!localStorage.getItem('cookiesAccepted')) {
        cookieNotice.style.display = 'block';
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotice.style.display = 'none';
    });
});

// Product modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalAddToCart = document.querySelector('.add-to-cart-modal');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.product-details').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const data = productData[name];
            if (data) {
                modalTitle.textContent = name;
                modalPrice.textContent = `${data.price.toFixed(2)} C$`;
                modalDescription.textContent = data.description;
                modalAddToCart.setAttribute('data-name', name);
                modalAddToCart.setAttribute('data-price', data.price);
                modal.style.display = 'block';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Cart and checkout functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const showCheckoutButton = document.getElementById('show-checkout-form');
    const checkoutForm = document.getElementById('checkout-form');
    const cancelCheckout = document.getElementById('cancel-checkout');
    const orderDetailsInput = document.getElementById('order-details');
    const successMessage = document.getElementById('success-message');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to cart
    document.querySelectorAll('.add-to-cart, .add-to-cart-modal').forEach(button => {
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
            document.getElementById('product-modal').style.display = 'none';
            if (cartItemsContainer) renderCart();
        });
    });

    // Render cart
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
        showCheckoutButton.disabled = cart.length === 0;
    };

    // Update quantity
    if (cartItemsContainer) {
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

        // Show checkout form
        showCheckoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                checkoutForm.style.display = 'block';
                showCheckoutButton.style.display = 'none';
                const orderDetails = cart.map(item => `${item.name} x${item.quantity} - ${item.price.toFixed(2)} C$`).join('\n');
                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
                orderDetailsInput.value = `Détails de la commande :\n${orderDetails}\n\nTotal : ${total} C$`;
            }
        });

        // Cancel checkout
        cancelCheckout.addEventListener('click', () => {
            checkoutForm.style.display = 'none';
            showCheckoutButton.style.display = 'block';
            successMessage.style.display = 'none';
        });

        // Handle form submission
        checkoutForm.addEventListener('submit', (e) => {
            // Formspree handles email sending; reset cart after submission
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            checkoutForm.style.display = 'none';
            showCheckoutButton.style.display = 'block';
            successMessage.style.display = 'block';
            renderCart();
        });

        renderCart();
    }
});
