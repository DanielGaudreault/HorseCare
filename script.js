// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href.includes('.html')) {
            window.location.href = href; // Navigate to other page
        } else {
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Cookie notice
document.addEventListener('DOMContentLoaded', () => {
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptButton = document.getElementById('accept-cookies');

    // Show cookie notice
    cookieNotice.style.display = 'block';

    // Hide notice when accepted
    acceptButton.addEventListener('click', () => {
        cookieNotice.style.display = 'none';
    });
});
