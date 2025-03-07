

// //erkjfbkjfnvfnbsdf
const buttons = document.querySelectorAll('.pay-button');
const cartIcon = document.querySelector('.cart-icon');
const cartPanel = document.querySelector('.cart-panel');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const clearCartBtn = document.querySelector('.clear-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const totalAmount = document.querySelector('.total-amount');
const stockElements = document.querySelectorAll('.stock-count');

let cart = [];
// array acting database
const cars = {
    bmw: { 
        name: 'BMW M8 Gran Coupé', 
        amount: 100,
        stock: 0,
        premium: true
    }, 
    mercedes: { 
        name: 'Mercedes-AMG GT', 
        amount: 100,
        stock: 3,
        premium: false
    }, 
    aston: { 
        name: 'Aston Martin DB12', 
        amount: 100,
        stock: 3,
        premium: false
    },
    rollsroyce: {
        name: '2024 Rolls-Royce Phantom',
        amount: 100,
        stock: 3,
        premium: true
    },
    bentley: {
        name: '2024 Bentley Continental GT',
        amount: 100,
        stock: 3,
        premium: true
    },
    lamborghini: {
        name: '2024 Lamborghini Aventador',
        amount: 100,
        stock: 3,
        premium: true
    } ,
    porsche: {
        name: '2024 Porsche Taycan',
        amount: 100,
        stock: 4,
        premium: false
    },
    lucid: {
        name: '2024 Lucid Air',
        amount: 100,
        stock: 6,
        premium: false
    },
    tesla: {
        name: '2024 Tesla Model S',
        amount: 5000,
        stock: 4,
        premium: false
    },
    premiumCar1: {
        name: 'Ferrari SF90 Stradale',
        amount: 100,
        stock: 2,
        premium: true
    },
    premiumCar2: {
        name: 'McLaren 765LT',
        amount: 100,
        stock: 1,
        premium: true
    },
    normalCar1: {
        name: 'Audi RS6 Avant',
        amount: 100,
        stock: 4,
        premium: false
    },
    normalCar2: {
        name: 'Range Rover Sport',
        amount: 100,
        stock: 3,
        premium: false
    },
    normalCar3: {
        name: 'Cadillac Escalade',
        amount: 100,
        stock: 5,
        premium: false
    },
    premiumCar3: {
        name: 'Bugatti Chiron',
        amount: 100,
        stock: 1,
        premium: true
    },
    premiumCar4: {
        name: 'Pagani Huayra',
        amount: 100,
        stock: 1,
        premium: true
    },
    normalCar4: {
        name: 'Volvo XC90',
        amount: 100,
        stock: 6,
        premium: false
    },
    normalCar5: {
        name: 'Lexus LX',
        amount: 100,
        stock: 4,
        premium: false
    },
    premiumCar5: {
        name: 'Koenigsegg Jesko',
        amount: 100,
        stock: 2,
        premium: true
    },
    normalCar6: {
        name: 'Acura NSX',
        amount: 5000,
        stock: 3,
        premium: true
    },
    premiumCar6: {
        name: 'Rimac Nevera',
        amount: 100,
        stock: 2,
        premium: true
    },
    normalCar7: {
        name: 'Infiniti QX80',
        amount: 100,
        stock: 4,
        premium: false
    },
    normalCar8: {
        name: 'Lincoln Navigator',
        amount: 100,
        stock: 5,
        premium: false
    },
    premiumCar7: {
        name: 'Rolls-Royce Cullinan',
        amount: 100,
        stock: 2,
        premium: true
    }
};

function updateStockDisplay() {
    stockElements.forEach(element => {
        const carType = element.closest('.car-card').querySelector('.pay-button').dataset.car;
        if (cars[carType]) { // Check if carType exists in cars object
            element.textContent = cars[carType].stock;
        
            const button = element.closest('.car-card').querySelector('.pay-button');
            if (cars[carType].stock === 0) {
                button.disabled = true;
                button.textContent = 'Out of Stock';
            } else {
                button.disabled = false;
                button.textContent = 'Add to Cart';
            }

            const carCard = element.closest('.car-card');
            if (cars[carType].premium) {
                carCard.classList.add('premium');
            } else {
                carCard.classList.remove('premium');
            }

        } else {
            console.error(`Car type "${carType}" not found in cars object.`);
        }
    });
}

function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <span>${item.name}</span>
                <span class="cart-item-quantity">Qty: ${item.quantity}</span>
            </div>
            <div class="cart-item-actions">
                <span>GH₵ ${(item.amount * item.quantity)/100}</span>
                <button onclick="removeFromCart('${item.id}')" class="remove-item">×</button>
            </div>
        </div>
    `).join('');
    
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;
    
    const total = cart.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
    totalAmount.textContent = `GH₵ ${total/100}`;
}

function addToCart(carType) {
    // if (!cars[carType]) {
    //     console.error(`Car type "${carType}" not found in cars object.`);
    //     return;
    // }
    
    if (cars[carType].stock <= 0) {
        alert('Sorry, this car is out of stock!');
        return;
    }

    const existingItem = cart.find(item => item.id === carType);
    
    if (existingItem) {
        if (existingItem.quantity < cars[carType].stock) {
            existingItem.quantity += 1;
            cars[carType].stock -= 1;
        } else {
            alert('Cannot add more units than available in stock!');
            return;
        }
    } else {
        cart.push({
            id: carType,
            name: cars[carType].name,
            amount: cars[carType].amount,
            quantity: 1
        });
        cars[carType].stock -= 1;
    }
    
    updateCart();
    updateStockDisplay();
}

function removeFromCart(carId) {
    const itemIndex = cart.findIndex(item => item.id === carId);
    if (itemIndex > -1) {
        cars[carId].stock += cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        updateCart();
        updateStockDisplay();
    }
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    cartPanel.classList.add('active')
    cartIcon.style.display = 'none';

});
closeCart.addEventListener('click', () => cartPanel.classList.remove('active'));

cartPanel.addEventListener('click', (e) => {
    // Prevent clicks inside the cart panel from closing it
    e.stopPropagation();
});

document.addEventListener('click', (e) => {
    if (cartPanel.classList.contains('active') && 
        !cartPanel.contains(e.target) && 
        !cartIcon.contains(e.target)) {
        cartPanel.classList.remove('active');
                cartIcon.style.display = 'flex';

    }
});

clearCartBtn.addEventListener('click', () => {
    // Return items to stock
    cart.forEach(item => {
        cars[item.id].stock += item.quantity;
    });
    cart = [];
    updateCart();
    updateStockDisplay();
});

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const carType = this.dataset.car;
        addToCart(carType);
    });
});

checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
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

    // Create form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    // Form header
    const formHeader = document.createElement('h2');
    formHeader.textContent = 'Checkout Details';
    formContainer.appendChild(formHeader);

    // Create form
    const checkoutForm = document.createElement('form');
    checkoutForm.classList.add('checkout-form');

    // Name field
    const nameGroup = document.createElement('div');
    nameGroup.classList.add('form-group');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Full Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);

    // Email field
    const emailGroup = document.createElement('div');
    emailGroup.classList.add('form-group');
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email Address:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.required = true;
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);

    // Phone number field
    const phoneGroup = document.createElement('div');
    phoneGroup.classList.add('form-group');
    const phoneLabel = document.createElement('label');
    phoneLabel.textContent = 'Phone Number:';
    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.required = true;
    phoneGroup.appendChild(phoneLabel);
    phoneGroup.appendChild(phoneInput);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Proceed to Payment';

    checkoutForm.appendChild(nameGroup);
    checkoutForm.appendChild(emailGroup);
    checkoutForm.appendChild(phoneGroup);
    checkoutForm.appendChild(submitButton);
    formContainer.appendChild(checkoutForm);

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-button');
    formContainer.appendChild(cancelButton);

    document.body.appendChild(formContainer);

    // Form submission handling
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const fullName = nameInput.value;
        const email = emailInput.value;
        const phoneNumber = phoneInput.value;
        document.body.removeChild(formContainer);
        
        // Show processing message popup
        const processingMsg = document.createElement('div');
        processingMsg.classList.add('processing-msg');
        processingMsg.innerHTML = `
            <p>Processing Payment</p>
            <div style="width: 40px; height: 40px; border: 3px solid #f3f3f3; 
                 border-top: 3px solid #00a1ff; border-radius: 50%; 
                 animation: spin 1s linear infinite; margin: 0 auto;">
            </div>
        `;
        document.body.appendChild(processingMsg);

        const totalAmount = cart.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

        const handler = PaystackPop.setup({
            key: 'pk_live_044105bed5451b50cab46d9eb90ce9901fa3017b',
            email: email,
            amount: totalAmount,
            currency: 'GHS',
            ref: 'CART_' + Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                full_name: fullName,
                phone_number: phoneNumber,
                custom_fields: [
                    {
                        display_name: "Cart Items",
                        variable_name: "cart_items",
                        value: cart.map(item => `${item.name} (${item.quantity})`).join(', ')
                    }
                ]
            },
            callback: function(response) {
                document.body.removeChild(processingMsg);
                if (response.status === 'success') {
                    alert(`Payment Successful!\n\nTransaction Reference: ${response.reference}\n\nThank you for your purchase. We'll process your order immediately.`);
                    cart = [];
                    updateCart();
                    cartPanel.classList.remove('active');
                    cartIcon.style.display = 'flex';
                }
            },
            onClose: function() {
                document.body.removeChild(processingMsg);
                // Payment Cancelled Popup
                const cancelledMsg = document.createElement('div');
                cancelledMsg.classList.add('cancelled-msg');
                cancelledMsg.innerHTML = `
                    <p>Payment Cancelled!</p>
                    <button onclick="document.body.removeChild(this.parentNode);">OK</button>
                `;
                document.body.appendChild(cancelledMsg);
            }
        });
        handler.openIframe();

    });

    cancelButton.addEventListener('click', function() {
        document.body.removeChild(formContainer);
    });
});

// Initialize stock display
updateStockDisplay();