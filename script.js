// Use 'use strict' for safer and better code
'use strict';

// 1. DOM Element Selection
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// NEW: Menu Toggle Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = navMenu ? navMenu.querySelectorAll('a[href^="#"]') : []; // Select all anchor links inside the menu



// 2. Menu Toggle Functionality
if (menuToggle && navMenu) {
    const closeMenu = () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        navMenu.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
    };

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // FIX: Close menu immediately when any link inside it is clicked on mobile.
    // This ensures the scroll-padding-top takes effect against the non-expanded header height.
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    });
}


// 3. Simple intersection observer for subtle fade-in effects (optional, currently not fully implemented in CSS)
// This is boilerplate for future use.

// 4. Contact Form Submission Logic (AJAX)
if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#3f51b5'; // Primary color

        try {
            // Modern fetch API for asynchronous request
            const response = await fetch('/api/contact', {
                method: 'POST',
                // Use JSON.stringify and correct headers for API consumption
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                formStatus.textContent = result.message || 'Message sent successfully!';
                formStatus.style.color = 'green';
                contactForm.reset();
            } else {
                // Handle server-side error
                formStatus.textContent = `Error: ${response.status} - Could not send message.`;
                formStatus.style.color = 'red';
            }
        } catch (error) {
            // Handle network error
            formStatus.textContent = 'A network error occurred. Please try again.';
            formStatus.style.color = 'red';
            console.error('Fetch error:', error);
        }
    });
} else {
    console.warn("Contact form element not found, form submission logic disabled.");
}

// Select all pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all cards
        pricingCards.forEach(c => c.classList.remove('selected'));

        // Add selected to the clicked one
        card.classList.add('selected');
    });
});
