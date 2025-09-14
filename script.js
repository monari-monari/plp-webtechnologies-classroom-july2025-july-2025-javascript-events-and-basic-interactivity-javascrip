// ========================================
// AFRIMEAL PLANNER - INTERACTIVE JAVASCRIPT
// Assignment: Interactive Web Pages with JavaScript
// ========================================

// Wait for the page to load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initThemeToggle();      // Part 1: Event Handling - Theme switcher
    initNavigation();       // Part 1: Event Handling - Section navigation
    initMealCounter();      // Part 2: Interactive Elements - Counter
    initFAQ();             // Part 2: Interactive Elements - FAQ accordion
    initTabs();            // Part 2: Interactive Elements - Tabbed interface
    initRecipes();         // Part 2: Interactive Elements - Recipe viewer
    initMealPlanner();     // Part 2: Interactive Elements - Meal planner
    initFormValidation();  // Part 3: Form Validation - Contact form
});

// ========================================
// PART 1: EVENT HANDLING - THEME TOGGLE
// ========================================

/**
 * Theme Toggle Feature
 * Switches between light and dark themes
 */
function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Set initial theme (default is light)
    let currentTheme = 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Add click event listener to theme button
    themeButton.addEventListener('click', function() {
        // Switch theme
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            themeButton.textContent = 'Light Mode';
        } else {
            currentTheme = 'light';
            themeButton.textContent = 'Dark Mode';
        }
        
        // Apply theme to body
        body.setAttribute('data-theme', currentTheme);
        
        // Add animation effect
        themeButton.classList.add('pulse');
        setTimeout(function() {
            themeButton.classList.remove('pulse');
        }, 600);
    });
}

// ========================================
// PART 1: EVENT HANDLING - NAVIGATION
// ========================================

/**
 * Navigation System
 * Shows/hides different sections of the page
 */
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    // Add click event to each navigation button
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons
            navButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Remove active class from all sections
            sections.forEach(function(section) {
                section.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the target section
            document.getElementById(targetSection).classList.add('active');
            
            // Add fade in animation
            const activeSection = document.getElementById(targetSection);
            activeSection.classList.add('fade-in');
            setTimeout(function() {
                activeSection.classList.remove('fade-in');
            }, 500);
        });
    });
}

// ========================================
// PART 2: INTERACTIVE ELEMENTS - MEAL COUNTER
// ========================================

/**
 * Meal Counter Feature
 * Interactive counter with increase, decrease, and reset
 */
function initMealCounter() {
    const counter = document.getElementById('meal-counter');
    const increaseBtn = document.getElementById('increase-btn');
    const decreaseBtn = document.getElementById('decrease-btn');
    const resetBtn = document.getElementById('reset-btn');
    const messageElement = document.getElementById('counter-message');
    
    let mealCount = 0;
    
    // Increase button click event
    increaseBtn.addEventListener('click', function() {
        mealCount++;
        updateCounter();
        showMessage('Great! You planned another meal! 🍽️', 'success');
        
        // Add pulse animation
        counter.classList.add('pulse');
        setTimeout(function() {
            counter.classList.remove('pulse');
        }, 600);
    });
    
    // Decrease button click event
    decreaseBtn.addEventListener('click', function() {
        if (mealCount > 0) {
            mealCount--;
            updateCounter();
            showMessage('Meal removed from plan', 'warning');
        } else {
            showMessage('Cannot go below 0!', 'warning');
            // Add shake animation when at 0
            counter.classList.add('shake');
            setTimeout(function() {
                counter.classList.remove('shake');
            }, 500);
        }
    });
    
    // Reset button click event
    resetBtn.addEventListener('click', function() {
        mealCount = 0;
        updateCounter();
        showMessage('Meal plan reset! Start fresh 🔄', 'success');
        
        // Add pulse animation
        counter.classList.add('pulse');
        setTimeout(function() {
            counter.classList.remove('pulse');
        }, 600);
    });
    
    // Function to update counter display
    function updateCounter() {
        counter.textContent = mealCount;
        
        // Change color based on number of meals
        if (mealCount >= 7) {
            counter.style.color = '#2ecc71'; // Green for full week
        } else if (mealCount >= 4) {
            counter.style.color = '#f39c12'; // Orange for halfway
        } else {
            counter.style.color = '#ff6b35'; // Default orange
        }
    }
    
    // Function to show messages
    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = type;
        
        // Clear message after 3 seconds
        setTimeout(function() {
            messageElement.textContent = '';
            messageElement.className = '';
        }, 3000);
    }
}

// ========================================
// PART 2: INTERACTIVE ELEMENTS - FAQ
// ========================================

/**
 * FAQ Accordion
 * Shows/hides answers when questions are clicked
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event to each FAQ question
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.parentElement.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items first
            faqQuestions.forEach(function(otherQuestion) {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.parentElement.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (isActive) {
                // Close if already open
                this.classList.remove('active');
                answer.classList.remove('active');
            } else {
                // Open if closed
                this.classList.add('active');
                answer.classList.add('active');
                
                // Add fade in effect
                answer.classList.add('fade-in');
                setTimeout(function() {
                    answer.classList.remove('fade-in');
                }, 500);
            }
        });
    });
}

// ========================================
// PART 2: INTERACTIVE ELEMENTS - TABS
// ========================================

/**
 * Tabbed Interface
 * Shows different content based on selected tab
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Add click event to each tab button
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            tabPanels.forEach(function(panel) {
                panel.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            document.getElementById(targetTab).classList.add('active');
            
            // Add fade in animation
            const activePanel = document.getElementById(targetTab);
            activePanel.classList.add('fade-in');
            setTimeout(function() {
                activePanel.classList.remove('fade-in');
            }, 500);
        });
    });
}

// ========================================
// PART 2: INTERACTIVE ELEMENTS - RECIPES
// ========================================

/**
 * Recipe Viewer
 * Shows recipe details when recipe buttons are clicked
 */
function initRecipes() {
    const recipeButtons = document.querySelectorAll('.recipe-btn');
    
    // Recipe data - simple object with recipe information
    const recipes = {
        ugali: {
            ingredients: '• 2 cups white cornmeal\n• 3 cups water\n• 1 tsp salt',
            steps: '1. Boil water with salt\n2. Gradually add cornmeal while stirring\n3. Cook for 15-20 minutes until thick\n4. Form into a mound and serve',
            nutrition: 'Calories: 180 per serving\nCarbohydrates: 38g\nProtein: 4g\nFat: 1g'
        },
        jollof: {
            ingredients: '• 2 cups rice\n• 3 cups chicken broth\n• 1 can tomatoes\n• 1 onion\n• Spices: curry, thyme, bay leaves',
            steps: '1. Sauté onions until golden\n2. Add tomatoes and spices\n3. Add rice and broth\n4. Simmer for 25 minutes\n5. Let rest for 10 minutes',
            nutrition: 'Calories: 250 per serving\nCarbohydrates: 45g\nProtein: 6g\nFat: 5g'
        },
        injera: {
            ingredients: '• 2 cups teff flour\n• 3 cups water\n• Starter culture',
            steps: '1. Mix teff flour with water\n2. Ferment for 3 days\n3. Cook on special injera pan\n4. Serve with stews',
            nutrition: 'Calories: 90 per serving\nCarbohydrates: 18g\nProtein: 3g\nFat: 1g'
        },
        biltong: {
            ingredients: '• 2 kg beef strips\n• Coarse salt\n• Coriander seeds\n• Black pepper\n• Vinegar',
            steps: '1. Cut meat into strips\n2. Season with salt and spices\n3. Dip in vinegar\n4. Hang to dry for 3-5 days',
            nutrition: 'Calories: 300 per serving\nCarbohydrates: 2g\nProtein: 55g\nFat: 8g'
        }
    };
    
    // Add click event to each recipe button
    recipeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const recipeType = this.getAttribute('data-recipe');
            const recipe = recipes[recipeType];
            
            if (recipe) {
                // Update tab content with recipe information
                document.getElementById('ingredients-text').textContent = recipe.ingredients;
                document.getElementById('steps-text').textContent = recipe.steps;
                document.getElementById('nutrition-text').textContent = recipe.nutrition;
                
                // Switch to recipes section automatically
                const navButtons = document.querySelectorAll('.nav-btn');
                const sections = document.querySelectorAll('.content-section');
                
                // Remove active from all nav buttons and sections
                navButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                sections.forEach(function(section) {
                    section.classList.remove('active');
                });
                
                // Activate recipes section
                document.querySelector('[data-section="recipes"]').classList.add('active');
                document.getElementById('recipes').classList.add('active');
                
                // Add visual feedback to button
                this.style.transform = 'scale(0.95)';
                setTimeout(function() {
                    button.style.transform = '';
                }, 150);
            }
        });
    });
}

// ========================================
// PART 2: INTERACTIVE ELEMENTS - MEAL PLANNER
// ========================================

/**
 * Meal Planner
 * Allows users to assign meals to different days
 */
function initMealPlanner() {
    const mealSlots = document.querySelectorAll('.meal-slot');
    const mealButtons = document.querySelectorAll('.meal-btn');
    const plannerMessage = document.getElementById('planner-message');
    
    let selectedMeal = null;
    let selectedSlot = null;
    
    // Add click event to meal selection buttons
    mealButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove selection from other buttons
            mealButtons.forEach(function(btn) {
                btn.classList.remove('selected');
            });
            
            // Select this meal
            this.classList.add('selected');
            selectedMeal = this.getAttribute('data-meal');
            
            showPlannerMessage('Now click on a meal slot to assign "' + selectedMeal + '"', 'info');
        });
    });
    
    // Add click event to meal slots
    mealSlots.forEach(function(slot) {
        slot.addEventListener('click', function() {
            if (selectedMeal) {
                // Assign the selected meal to this slot
                const mealSpan = this.querySelector('span');
                mealSpan.textContent = selectedMeal;
                this.classList.add('filled');
                
                // Clear selection
                mealButtons.forEach(function(btn) {
                    btn.classList.remove('selected');
                });
                selectedMeal = null;
                
                showPlannerMessage('Great! ' + selectedMeal + ' has been added to your plan!', 'success');
                
                // Add pulse animation
                this.classList.add('pulse');
                setTimeout(function() {
                    slot.classList.remove('pulse');
                }, 600);
            } else {
                showPlannerMessage('Please select a meal first, then click here to assign it.', 'info');
            }
        });
        
        // Double-click to remove meal
        slot.addEventListener('dblclick', function() {
            const mealSpan = this.querySelector('span');
            if (mealSpan.textContent !== 'Click to add') {
                mealSpan.textContent = 'Click to add';
                this.classList.remove('filled');
                showPlannerMessage('Meal removed! Double-click any filled slot to remove its meal.', 'info');
            }
        });
    });
    
    // Function to show planner messages
    function showPlannerMessage(text, type) {
        plannerMessage.textContent = text;
        plannerMessage.className = type;
        
        // Clear message after 5 seconds
        setTimeout(function() {
            plannerMessage.textContent = '';
            plannerMessage.className = '';
        }, 5000);
    }
}

// ========================================
// PART 3: FORM VALIDATION
// ========================================

/**
 * Contact Form Validation
 * Validates form fields and shows error messages
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const cuisineField = document.getElementById('favorite-cuisine');
    const messageField = document.getElementById('message');
    const termsCheckbox = document.getElementById('terms');
    const successMessage = document.getElementById('success-message');
    
    // Add form submit event
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from actually submitting
        
        let isValid = true;
        
        // Validate name field
        if (!validateName()) {
            isValid = false;
        }
        
        // Validate email field
        if (!validateEmail()) {
            isValid = false;
        }
        
        // Validate phone field (optional but must be valid if filled)
        if (!validatePhone()) {
            isValid = false;
        }
        
        // Validate cuisine selection
        if (!validateCuisine()) {
            isValid = false;
        }
        
        // Validate message field
        if (!validateMessage()) {
            isValid = false;
        }
        
        // Validate terms checkbox
        if (!validateTerms()) {
            isValid = false;
        }
        
        // If all fields are valid, show success message
        if (isValid) {
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            successMessage.classList.add('fade-in');
        }
    });
    
    // Add real-time validation as user types
    nameField.addEventListener('blur', validateName);
    emailField.addEventListener('blur', validateEmail);
    phoneField.addEventListener('blur', validatePhone);
    cuisineField.addEventListener('change', validateCuisine);
    messageField.addEventListener('blur', validateMessage);
    termsCheckbox.addEventListener('change', validateTerms);
    
    // Name validation function
    function validateName() {
        const name = nameField.value.trim();
        const errorElement = document.getElementById('name-error');
        
        if (name === '') {
            showError(nameField, errorElement, 'Please enter your name');
            return false;
        } else if (name.length < 2) {
            showError(nameField, errorElement, 'Name must be at least 2 characters');
            return false;
        } else {
            showValid(nameField, errorElement);
            return true;
        }
    }
    
    // Email validation function
    function validateEmail() {
        const email = emailField.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
        
        if (email === '') {
            showError(emailField, errorElement, 'Please enter your email');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailField, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showValid(emailField, errorElement);
            return true;
        }
    }
    
    // Phone validation function (optional field)
    function validatePhone() {
        const phone = phoneField.value.trim();
        const errorElement = document.getElementById('phone-error');
        const phonePattern = /^[\d\s\-\+\(\)]+$/; // Allow digits, spaces, dashes, plus, parentheses
        
        if (phone === '') {
            // Phone is optional, so empty is okay
            showValid(phoneField, errorElement);
            return true;
        } else if (phone.length < 10) {
            showError(phoneField, errorElement, 'Phone number must be at least 10 digits');
            return false;
        } else if (!phonePattern.test(phone)) {
            showError(phoneField, errorElement, 'Please enter a valid phone number');
            return false;
        } else {
            showValid(phoneField, errorElement);
            return true;
        }
    }
    
    // Cuisine validation function
    function validateCuisine() {
        const cuisine = cuisineField.value;
        const errorElement = document.getElementById('cuisine-error');
        
        if (cuisine === '') {
            showError(cuisineField, errorElement, 'Please select your favorite cuisine');
            return false;
        } else {
            showValid(cuisineField, errorElement);
            return true;
        }
    }
    
    // Message validation function
    function validateMessage() {
        const message = messageField.value.trim();
        const errorElement = document.getElementById('message-error');
        
        if (message === '') {
            showError(messageField, errorElement, 'Please enter a message');
            return false;
        } else if (message.length < 10) {
            showError(messageField, errorElement, 'Message must be at least 10 characters');
            return false;
        } else {
            showValid(messageField, errorElement);
            return true;
        }
    }
    
    // Terms validation function
    function validateTerms() {
        const errorElement = document.getElementById('terms-error');
        
        if (!termsCheckbox.checked) {
            errorElement.textContent = 'You must agree to the terms and conditions';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }
    
    // Helper function to show error state
    function showError(field, errorElement, message) {
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorElement.textContent = message;
        
        // Add shake animation
        field.classList.add('shake');
        setTimeout(function() {
            field.classList.remove('shake');
        }, 500);
    }
    
    // Helper function to show valid state
    function showValid(field, errorElement) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorElement.textContent = '';
    }
}