document.addEventListener('DOMContentLoaded', () => {
    // Get forms and inputs
    const loginForm = document.querySelector('#login_form form');
    const registerForm = document.querySelector('#register_form form');
    const loginInputs = loginForm.querySelectorAll('input');
    const registerInputs = registerForm.querySelectorAll('input');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format validation
    const passwordMinLength = 8; // Minimum password length is 8 characters

    // Function to show error message
    const showError = (input, message) => {
        const formControl = input.parentElement;
        formControl.classList.add('error');
        let error = formControl.querySelector('.error-message');
        if (!error) {
            error = document.createElement('small');
            error.classList.add('error-message');
            error.style.color = 'red';
            formControl.appendChild(error);
        }
        error.innerText = message;
    };

    // Function to clear error message
    const clearError = (input) => {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        const error = formControl.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    };

    // Validate individual fields
    const validateField = (input, formType) => {
        const value = input.value.trim();
        clearError(input);

        // Check required fields
        if (!value) {
            showError(input, `${input.parentElement.querySelector('label').innerText} is required.`);
            return false;
        }

        // Validate email (only for Login and Register)
        if (input.parentElement.querySelector('label').innerText === 'Email') {
            if (!emailRegex.test(value)) {
<<<<<<< HEAD
                showError(input, 'Enter a valid email address.');
                return false;
            }
        }
=======
                showError(input, 'Enter a valid email address. Eg: abcd@gmail.com');
                return false;
            }
        }
        
>>>>>>> 18eb97b71299220ef29fb813985ea6979308ea38

        // Validate password (both forms)
        if (input.type === 'password') {
            if (value.length < passwordMinLength) {
                showError(input, `Password must be at least ${passwordMinLength} characters long.`);
                return false;
            }

            // Confirm Password validation (only for Register)
            if (formType === 'register' && input.parentElement.querySelector('label').innerText === 'Confirm Password') {
                const password = registerForm.querySelector('input[type="password"]:nth-of-type(1)').value;
                if (password !== value) {
                    showError(input, 'Passwords do not match.');
                    return false;
                }
            }
        }

        return true;
    };

    // Add focus and blur effects for both forms
    const setupFocusBlur = (formType) => {
        const formInputs = formType === 'register' ? registerInputs : loginInputs;
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focus');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focus');
                validateField(input, formType);
            });
        });
    };

    setupFocusBlur('register');
    setupFocusBlur('login');

    // Form submission event for Register form
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        registerInputs.forEach(input => {
            const valid = validateField(input, 'register');
            isValid = isValid && valid;
        });

        if (isValid) {
<<<<<<< HEAD
            alert('Registration successful! Welcome.');
            registerForm.reset(); // Clear the form
        } else {
            alert('Please fix the errors in the form before registering.');
=======
            showAlert('success', 'Registration successful! Welcome.');
            registerForm.reset(); // Clear the form
        } else {
            showAlert('danger', 'Registration failed! Please fix the errors.');
>>>>>>> 18eb97b71299220ef29fb813985ea6979308ea38
        }
    });

    // Form submission event for Login form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        loginInputs.forEach(input => {
            const valid = validateField(input, 'login');
            isValid = isValid && valid;
        });

        if (isValid) {
<<<<<<< HEAD
            alert('Login successful! Welcome back.');
            loginForm.reset(); // Clear the form
        } else {
            alert('Please fix the errors in the form before logging in.');
=======
            showAlert('success', 'Login successful! Welcome back.');
            loginForm.reset(); // Clear the form
        } else {
            showAlert('danger', 'Login failed! Please fix the errors before proceeding.');
>>>>>>> 18eb97b71299220ef29fb813985ea6979308ea38
        }
    });
});
