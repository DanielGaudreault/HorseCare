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

// Login functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('login-toggle');
    const loginContainer = document.getElementById('login-container');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const adminLink = document.getElementById('admin-link');

    // Check login status
    const updateLoginUI = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            loginToggle.style.display = 'none';
            loginContainer.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            if (user.isAdmin) {
                adminLink.style.display = 'inline-block';
            }
        } else {
            loginToggle.style.display = 'inline-block';
            logoutButton.style.display = 'none';
            adminLink.style.display = 'none';
        }
    };

    // Toggle login form
    loginToggle.addEventListener('click', () => {
        loginContainer.style.display = loginContainer.style.display === 'none' ? 'inline-block' : 'none';
        if (loginContainer.style.display === 'inline-block') {
            document.getElementById('username').focus();
        }
    });

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('user', JSON.stringify({ username, isAdmin: true }));
            alert('Connexion réussie en tant qu\'admin !');
            window.location.href = 'admin.html';
        } else if (username && password) {
            localStorage.setItem('user', JSON.stringify({ username, isAdmin: false }));
            alert('Connexion réussie !');
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }

        loginContainer.style.display = 'none';
        loginForm.reset();
        updateLoginUI();
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        updateLoginUI();
        alert('Déconnexion réussie.');
        if (window.location.pathname.includes('admin.html')) {
            window.location.href = 'index.html';
        }
    });

    // Protect admin page
    if (window.location.pathname.includes('admin.html')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.isAdmin) {
            window.location.href = 'index.html';
        }
    }

    updateLoginUI();
});

// Product modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalAddToCart = document.querySelector('.add-to-cart-modal');
    const closeModal = document.querySelector('.close-modal');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-details')) {
            const name = e.target.getAttribute('data-name');
            const data = productData[name];
            if (data) {
                modalTitle.textContent = name;
                modalPrice.textContent = `${data.price.toFixed(2)} C$`;
                modalDescription.textContent = data.description;
                modalAddToCart.setAttribute('data-name', name);
                modalAddToCart.setAttribute('data-price', data.price);
                modal.style.display = 'block';
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
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const productGallery = document.getElementById('product-gallery');
    const noResults = document.getElementById('no-results');

    // Toggle search input visibility
    searchToggle.addEventListener('click', () => {
        searchContainer.style.display = searchContainer.style.display === 'none' ? 'inline-block' : 'none';
        if (searchContainer.style.display === 'inline-block') {
            searchInput.focus();
        } else {
            searchInput.value = '';
            if (productGallery) renderProducts(Object.keys(productData));
        }
    });

    // Render products dynamically
    const renderProducts = (productNames) => {
        if (!productGallery) return;
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
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${data.image}" alt="${name} pour soin des sabots">
                <p>${name} - ${data.price.toFixed(2)} C$</p>
                <button class="product-details" data-name="${name}">Détails</button>
                <button class="add-to-cart" data-name="${name}" data-price="${data.price}">Ajouter au panier</button>
            `;
            productGallery.appendChild(productDiv);
        });
    };

    // Filter products based on search input
    if (
