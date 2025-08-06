// Product data with descriptions
const productData = {
    "Artimud 300g": {
        price: 30.00,
        description: "Artimud est un produit à base d'argile verte, de miel, de minéraux naturels et d'huiles essentiels. Ses agents actifs naturels éliminent les bactéries et les champignons tout en favorisant la formation de tissus sains. Il est idéal pour remplir les seimes externe et les crevasses peu profondes de la ligne blanche. Grâce à sa consistance épaisse, il restera en place plus longtemps que la plupart des produits ce qui permet aux agents de protection de travailler plus longtemps et empêche les saletés et impuretés d'y entrer. Il est aussi utilisé sous des pads pour garder la sole et la fourchette en santé durant un cycle de ferrage. Pour les crevasses ou seimes plus profondes et mince, nous vous recommandons d'utiliser le Hoof-stuff.",
        image: "https://via.placeholder.com/600x400?text=Artimud+300g"
    },
    "Artimud 750g": {
        price: 65.00,
        description: "Artimud 750g est une version plus grande du produit à base d'argile verte, idéal pour un usage prolongé. Il offre les mêmes avantages que l'Artimud 300g, éliminant bactéries et champignons tout en favorisant la santé des tissus. Parfait pour les seimes externes et les crevasses peu profondes. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=Artimud+750g"
    },
    "Hoof Stuff": {
        price: 35.00,
        description: "Hoof Stuff est conçu pour les crevasses et seimes plus profondes et minces. Il aide à protéger et renforcer les structures internes du sabot. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=Hoof+Stuff"
    },
    "Field Paste 750g": {
        price: 45.00,
        description: "Field Paste 750g est un produit polyvalent pour le soin des sabots, offrant protection et hydratation. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=Field+Paste+750g"
    },
    "HoneyHeel 100ml": {
        price: 25.00,
        description: "HoneyHeel 100ml est une pommade à base de miel pour traiter les infections et favoriser la guérison des sabots. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=HoneyHeel+100ml"
    },
    "Sole Cleanse 500ml": {
        price: 30.00,
        description: "Sole Cleanse 500ml est un spray nettoyant pour la sole et la fourchette, éliminant les bactéries et les impuretés. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=Sole+Cleanse+500ml"
    },
    "Stronghorn 500ml": {
        price: 40.00,
        description: "Stronghorn 500ml renforce la corne du sabot pour une meilleure résistance et durabilité. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=Stronghorn+500ml"
    },
    "Ear Balm 500ml": {
        price: 45.00,
        description: "Ear Balm 500ml est un produit apaisant pour le soin des oreilles des chevaux, réduisant les irritations. (Remplacez par la description réelle.)",
        image: "https://via.placeholder.com/600x400?text=Ear+Balm+500ml"
    }
};

// Hardcoded admin credentials (replace with backend in production)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Smooth scrolling for navigation links
const initSmoothScrolling = () => {
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
};

// Cookie notice
const initCookieNotice = () => {
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptButton = document.getElementById('accept-cookies');
    if (cookieNotice && acceptButton) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieNotice.style.display = 'block';
        }
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.style.display = 'none';
        });
    }
};

// Authentication and UI updates
const initAuth = () => {
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-button');
    const historyLink = document.getElementById('history-link');
    const adminLink = document.getElementById('admin-link');

    const updateAuthUI = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            loginToggle.style.display = 'none';
            signupToggle.style.display = 'none';
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            historyLink.style.display = user.isAdmin ? 'none' : 'inline-block';
            adminLink.style.display = user.isAdmin ? 'inline-block' : 'none';
        } else {
            loginToggle.style.display = 'inline-block';
            signupToggle.style.display = 'inline-block';
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'none';
            logoutButton.style.display = 'none';
            historyLink.style.display = 'none';
            adminLink.style.display = 'none';
        }
    };

    loginToggle.addEventListener('click', () => {
        loginContainer.style.display = loginContainer.style.display === 'none' ? 'inline-block' : 'none';
        signupContainer.style.display = 'none';
        if (loginContainer.style.display === 'inline-block') {
            document.getElementById('username').focus();
        }
    });

    signupToggle.addEventListener('click', () => {
        signupContainer.style.display = signupContainer.style.display === 'none' ? 'inline-block' : 'none';
        loginContainer.style.display = 'none';
        if (signupContainer.style.display === 'inline-block') {
            document.getElementById('signup-username').focus();
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }

        if (users.some(u => u.username === username)) {
            alert('Ce nom d\'utilisateur est déjà pris.');
            return;
        }

        if (password.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        users.push({ username, email, password, isAdmin: false });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify({ username, isAdmin: false }));
        alert('Inscription réussie ! Vous êtes maintenant connecté.');
        signupContainer.style.display = 'none';
        signupForm.reset();
        updateAuthUI();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('user', JSON.stringify({ username, isAdmin: true }));
            alert('Connexion réussie en tant qu\'admin !');
            window.location.href = 'admin.html';
        } else {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify({ username, isAdmin: false }));
                alert('Connexion réussie !');
            } else {
                alert('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        }

        loginContainer.style.display = 'none';
        loginForm.reset();
        updateAuthUI();
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        updateAuthUI();
        alert('Déconnexion réussie.');
        if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('history.html')) {
            window.location.href = 'index.html';
        }
    });

    if (window.location.pathname.includes('admin.html')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.isAdmin) {
            window.location.href = 'index.html';
        }
    }
    if (window.location.pathname.includes('history.html')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = 'index.html';
        }
    }

    updateAuthUI();
};

// Product modal functionality
const initProductModal = () => {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalAddToCart = document.querySelector('.add-to-cart-modal');
    const closeModal = document.querySelector('.close-modal');

    if (!modal || !modalTitle || !modalPrice || !modalDescription || !modalAddToCart || !closeModal) {
        console.error('Modal elements missing:', { modal, modalTitle, modalPrice, modalDescription, modalAddToCart, closeModal });
        return;
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-details')) {
            const name = e.target.getAttribute('data-name');
            const data = productData[name];
            if (data) {
                console.log('Opening modal for:', name); // Debug
                modalTitle.textContent = name;
                modalPrice.textContent = `${data.price.toFixed(2)} C$`;
                modalDescription.textContent = data.description;
                modalAddToCart.setAttribute('data-name', name);
                modalAddToCart.setAttribute('data-price', data.price.toString());
                modal.style.display = 'block';
            } else {
                console.error('Product not found in productData:', name);
            }
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Search functionality
const initSearch = () => {
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const productGallery = document.getElementById('product-gallery');
    const noResults = document.getElementById('no-results');

    if (!searchToggle || !searchContainer || !searchInput) {
        console.error('Search elements missing:', { searchToggle, searchContainer, searchInput });
        return;
    }

    searchToggle.addEventListener('click', () => {
        searchContainer.style.display = searchContainer.style.display === 'none' ? 'inline-block' : 'none';
        if (searchContainer.style.display === 'inline-block') {
            searchInput.focus();
        } else {
            searchInput.value = '';
            if (productGallery) renderProducts(Object.keys(productData));
        }
    });

    const renderProducts = (productNames) => {
        if (!productGallery) {
            console.warn('Product gallery not found on this page');
            return;
        }
        productGallery.innerHTML = '';
        noResults.style.display = 'none';

        const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
        const productsToShow = isIndexPage ? productNames.slice(0, 8) : productNames;

        if (productsToShow.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        productsToShow.forEach(name => {
            const data = productData[name];
            if (!data) {
                console.error('Product data missing for:', name);
                return;
            }
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${data.image}" alt="${name} pour soin des sabots">
                <p>${name} - ${data.price.toFixed(2)} C$</p>
                <button class="product-details" data-name="${name}">Détails</button>
                <button class="add-to-cart" data-name="${name}" data-price="${data.price.toString()}">Ajouter au panier</button>
            `;
            productGallery.appendChild(productDiv);
        });
        console.log('Rendered products:', productsToShow); // Debug
    };

    if (searchInput && productGallery) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            const filteredProducts = Object.keys(productData).filter(name =>
                name.toLowerCase().includes(query)
            );
            renderProducts(filteredProducts);
        });
        renderProducts(Object.keys(productData));
    }

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim() && !window.location.pathname.includes('products.html')) {
            window.location.href = 'products.html';
        }
    });
};

// Cart and checkout functionality
const initCart = () => {
    console.log('Initializing cart functionality'); // Debug
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const showCheckoutButton = document.getElementById('show-checkout-form');
    const checkoutForm = document.getElementById('checkout-form');
    const cancelCheckout = document.getElementById('cancel-checkout');
    const submitWithoutPayment = document.getElementById('submit-without-payment');
    const orderDetailsInput = document.getElementById('order-details');
    const paymentStatusInput = document.getElementById('payment-status');
    const paymentIdInput = document.getElementById('payment-id');
    const successMessage = document.getElementById('success-message');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    let cart = [];
    try {
        const storedCart = localStorage.getItem('cart');
        cart = storedCart ? JSON.parse(storedCart) : [];
        console.log('Loaded cart from localStorage:', cart); // Debug
    } catch (e) {
        console.error('Error loading cart from localStorage:', e);
        cart = [];
    }

    const addToCart = (name, price) => {
        console.log('Attempting to add to cart:', { name, price }); // Debug
        if (!name || isNaN(price) || !productData[name]) {
            console.error('Invalid product data:', { name, price });
            alert('Erreur : produit invalide.');
            return;
        }

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart updated in localStorage:', cart); // Debug
            alert(`${name} ajouté au panier !`);
            if (cartItemsContainer) {
                renderCart();
            }
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
            alert('Erreur lors de l\'ajout au panier. Veuillez réessayer.');
        }
    };

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('add-to-cart-modal')) {
            console.log('Add to cart button clicked:', e.target); // Debug
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            addToCart(name, price);
            if (e.target.classList.contains('add-to-cart-modal')) {
                const modal = document.getElementById('product-modal');
                if (modal) {
                    modal.style.display = 'none';
                    console.log('Closed modal after adding item'); // Debug
                }
            }
        }
    });

    const renderCart = () => {
        if (!cartItemsContainer) {
            console.warn('Cart items container not found on this page'); // Debug
            return;
        }
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            if (!item.name || isNaN(item.price) || !item.quantity) {
                console.error('Invalid cart item:', item);
                return;
            }
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
        if (paypalButtonContainer) {
            paypalButtonContainer.style.display = 'none';
            if (cart.length > 0) {
                renderPaypalButton(total);
            }
        }
        console.log('Cart rendered:', cart); // Debug
    };

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.type === 'number') {
                const index = parseInt(e.target.getAttribute('data-index'));
                const newQuantity = parseInt(e.target.value);
                if (newQuantity >= 1) {
                    cart[index].quantity = newQuantity;
                    try {
                        localStorage.setItem('cart', JSON.stringify(cart));
                        renderCart();
                    } catch (e) {
                        console.error('Error updating cart quantity:', e);
                    }
                }
            }
        });

        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                try {
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                } catch (e) {
                    console.error('Error removing cart item:', e);
                }
            }
        });

        showCheckoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                checkoutForm.style.display = 'block';
                showCheckoutButton.style.display = 'none';
                const orderDetails = cart.map(item => `${item.name} x${item.quantity} - ${item.price.toFixed(2)} C$`).join('\n');
                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
                orderDetailsInput.value = `Détails de la commande :\n${orderDetails}\n\nTotal : ${total} C$`;
                paypalButtonContainer.style.display = 'none';
                console.log('Checkout form displayed:', orderDetails); // Debug
            }
        });

        cancelCheckout.addEventListener('click', () => {
            checkoutForm.style.display = 'none';
            showCheckoutButton.style.display = 'block';
            successMessage.style.display = 'none';
            paypalButtonContainer.style.display = 'none';
            console.log('Checkout form cancelled'); // Debug
        });

        const saveOrder = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const order = {
                date: new Date().toLocaleString('fr-CA'),
                username: user ? user.username : 'Invité',
                name: document.getElementById('checkout-name').value,
                email: document.getElementById('checkout-email').value,
                address: document.getElementById('checkout-address').value,
                phone: document.getElementById('checkout-phone').value || 'N/A',
                orderDetails: orderDetailsInput.value,
                paymentStatus: paymentStatusInput.value,
                paymentId: paymentIdInput.value || 'N/A'
            };
            orders.push(order);
            try {
                localStorage.setItem('orders', JSON.stringify(orders));
                console.log('Order saved:', order); // Debug
            } catch (e) {
                console.error('Error saving order:', e);
            }
        };

        submitWithoutPayment.addEventListener('click', () => {
            paymentStatusInput.value = 'Non payé';
            paymentIdInput.value = '';
            saveOrder();
            checkoutForm.submit();
        });

        checkoutForm.addEventListener('submit', (e) => {
            saveOrder();
            cart = [];
            try {
                localStorage.setItem('cart', JSON.stringify(cart));
                checkoutForm.style.display = 'none';
                showCheckoutButton.style.display = 'block';
                successMessage.style.display = 'block';
                paypalButtonContainer.style.display = 'none';
                renderCart();
                console.log('Checkout completed, cart cleared'); // Debug
            } catch (e) {
                console.error('Error clearing cart after checkout:', e);
            }
        });

        const renderPaypalButton = (total) => {
            if (window.paypal && total > 0) {
                paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: total.toFixed(2),
                                    currency_code: 'CAD'
                                }
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then(details => {
                            paymentStatusInput.value = 'Payé via PayPal';
                            paymentIdInput.value = data.orderID;
                            checkoutForm.submit();
                            console.log('PayPal payment approved:', data.orderID); // Debug
                        });
                    },
                    onError: (err) => {
                        console.error('PayPal error:', err);
                        alert('Erreur lors du paiement PayPal. Veuillez réessayer ou choisir une autre méthode.');
                    }
                }).render('#paypal-button-container');
                console.log('PayPal button rendered for total:', total); // Debug
            } else {
                console.warn('PayPal SDK not loaded or total is 0'); // Debug
            }
        };

        checkoutForm.addEventListener('input', () => {
            const name = document.getElementById('checkout-name').value;
            const email = document.getElementById('checkout-email').value;
            const address = document.getElementById('checkout-address').value;
            if (name && email && address && cart.length > 0) {
                paypalButtonContainer.style.display = 'block';
            } else {
                paypalButtonContainer.style.display = 'none';
            }
        });

        renderCart();
    }
};

// Admin dashboard functionality
const initAdminDashboard = () => {
    const ordersTableBody = document.getElementById('orders-body');
    const noOrdersMessage = document.getElementById('no-orders');
    if (ordersTableBody) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        ordersTableBody.innerHTML = '';
        if (orders.length === 0) {
            noOrdersMessage.style.display = 'block';
        } else {
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.date}</td>
                    <td>${order.username}</td>
                    <td>${order.name}</td>
                    <td>${order.email}</td>
                    <td>${order.address}</td>
                    <td>${order.phone}</td>
                    <td><pre>${order.orderDetails}</pre></td>
                    <td>${order.paymentStatus}</td>
                    <td>${order.paymentId}</td>
                `;
                ordersTableBody.appendChild(row);
            });
        }
        console.log('Admin dashboard rendered:', orders); // Debug
    }
};

// Purchase history functionality
const initPurchaseHistory = () => {
    const ordersTableBody = document.getElementById('orders-body');
    const noOrdersMessage = document.getElementById('no-orders');
    if (ordersTableBody) {
        const user = JSON.parse(localStorage.getItem('user'));
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => order.username === user.username);
        ordersTableBody.innerHTML = '';
        if (userOrders.length === 0) {
            noOrdersMessage.style.display = 'block';
        } else {
            userOrders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.date}</td>
                    <td>${order.name}</td>
                    <td>${order.email}</td>
                    <td>${order.address}</td>
                    <td>${order.phone}</td>
                    <td><pre>${order.orderDetails}</pre></td>
                    <td>${order.paymentStatus}</td>
                    <td>${order.paymentId}</td>
                `;
                ordersTableBody.appendChild(row);
            });
        }
        console.log('Purchase history rendered:', userOrders); // Debug
    }
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing at', new Date().toLocaleString('fr-CA')); // Debug
    initSmoothScrolling();
    initCookieNotice();
    initAuth();
    initProductModal();
    initSearch();
    initCart();
    initAdminDashboard();
    initPurchaseHistory();
});
