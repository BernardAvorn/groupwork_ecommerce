document.addEventListener('DOMContentLoaded', () => {
  
 

    // Add new functionality for hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksElement = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinksElement.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

   
  
    window.handleAppointment = function() {
        // Open appointment form in a new window
        const appointmentWindow = window.open('https://form.jotform.com/250611600473547', 'AppointmentForm', 'width=800,height=800');
        
        // Check if window was blocked by popup blocker
        if (appointmentWindow === null) {
            alert('Please enable popups to book an appointment');
            return;
        }

        // Monitor when the form window is closed
        const timer = setInterval(() => {
            if (appointmentWindow.closed) {
                clearInterval(timer);
                
                // Ask user if they completed the booking
                const completed = confirm('Did you complete your appointment booking?');
                
                if (completed) {
                    alert('Thank you for booking an appointment! We look forward to seeing you.');
                    window.location.href = 'index.html'; // Redirect to home page
                } else {
                    const popup = document.createElement('div');
                    popup.className = 'appointment-popup';
                    popup.innerHTML = `
                        <div class="appointment-popup-content">
                            <i class="fas fa-times-circle"></i>
                            <h3>Booking Cancelled</h3>
                            <p>Your appointment booking was not completed. Feel free to try again when you're ready!</p>
                            <button onclick="this.parentElement.parentElement.remove()">
                                <i class="fas fa-times"></i>
                                Dismiss
                            </button>
                        </div>
                    `;
                    document.body.appendChild(popup);
                    
                    // Remove popup after 5 seconds
                    setTimeout(() => {
                        if (popup.parentElement) {
                            popup.style.opacity = '0';
                            popup.style.transform = 'translateX(100%) scale(0.8)';
                            setTimeout(() => popup.remove(), 500);
                        }
                    }, 5000);
                }
            }
        }, 500);
    }

    // Enhanced scroll animations
    function initializeScrollAnimations() {
        // Options for the Intersection Observer
        const options = {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '50px' // Trigger slightly before element comes into view
        };

        // Callback function when element becomes visible
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once animated, no need to observe anymore
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(animateOnScroll, options);

        // Get all elements to animate
        const animateElements = document.querySelectorAll(
            '.feature-card, .testimonial-card, .about-card, .inventory-card, .car-card'
        );

        // Observe each element
        animateElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    // Initialize animations after content is loaded
    initializeScrollAnimations();

    if (document.querySelector('.cars-grid')) {
        fetchCars();
    }

    checkLoginStatus();
});


// payment processing
