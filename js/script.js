// Use 'use strict' for safer and better code
'use strict';

// 1. DOM Element Selection using modern const/let
const ctaButton = document.getElementById('cta-button');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// 2. Simple interactivity: Alert user on CTA click
ctaButton.addEventListener('click', () => {
    // Arrow function syntax (ES6)
    const now = new Date();
    // Template literals (ES6)
    alert(`Thank you for your interest! We started your journey on: ${now.toLocaleDateString()}.`);
    // Scroll to the contact form section smoothly
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// 3. Asynchronous form submission handling (for Python backend)
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