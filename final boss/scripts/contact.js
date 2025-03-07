document.addEventListener('DOMContentLoaded', () => {
    // Initialize map
    const map = L.map('map').setView([40.7128, -74.0060], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for company location
    L.marker([40.7128, -74.0060])
        .addTo(map)
        .bindPopup('FutureCars Headquarters')
        .openPopup();

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                // Show success message (in a real app, you'd send this to a server)
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Add scroll animations for staff cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('.staff-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});