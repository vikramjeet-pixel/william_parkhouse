/**
 * Recapa - Form Handling
 * Handles form submissions and validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initWaitlistForm();
});

/**
 * Initialize Waitlist Form
 * Sets up the waitlist form submission with API integration
 */
function initWaitlistForm() {
  const waitlistForm = document.getElementById('waitlist-form');
  if (!waitlistForm) return;
  
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = waitlistForm.querySelector('input[type="email"]');
    const formStatus = waitlistForm.querySelector('.form-status');
    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    
    if (!emailInput || !formStatus) return;
    
    const email = emailInput.value.trim();
    
    // Basic validation
    if (!isValidEmail(email)) {
      showFormStatus(formStatus, 'Please enter a valid email address.', 'error');
      return;
    }
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    try {
      // Send GET request to the API
      const response = await fetch(`https://recapa.app/api/waitlist?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (response.ok) {
        // Success
        showFormStatus(formStatus, 'Thanks for joining the waitlist! We\'ll be in touch soon.', 'success');
        emailInput.value = '';
      } else {
        // API returned an error
        showFormStatus(formStatus, data.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      // Network or other error
      showFormStatus(formStatus, 'Connection error. Please try again later.', 'error');
      console.error('Waitlist submission error:', error);
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = 'Join the Waitlist';
    }
  });
}

/**
 * Show Form Status
 * Displays success or error messages
 */
function showFormStatus(statusElement, message, type) {
  statusElement.textContent = message;
  statusElement.className = `form-status ${type}`;
  statusElement.style.display = 'block';
  
  // Hide status message after 5 seconds
  setTimeout(() => {
    statusElement.style.display = 'none';
  }, 5000);
}

/**
 * Validate Email
 * Simple email validation
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}