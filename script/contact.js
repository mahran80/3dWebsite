// Contact Page JavaScript

// Initialize animations on page load
function initContactAnimations() {
  const animatedElements = document.querySelectorAll('[data-contact-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Form submission handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formWrapper = document.querySelector('.contact-form-wrapper');
  const successMessage = document.getElementById('formSuccess');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value
    };
    
    // Disable submit button
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    // Simulate sending (replace with your actual API call)
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      form.style.display = 'none';
      successMessage.classList.add('show');
      
      // Log form data (for testing)
      console.log('Form submitted:', formData);
      
      // Optional: Send email via mailto (fallback)
      // window.location.href = `mailto:contact@3dxenon.com?subject=Contact from ${formData.name}&body=${formData.message}`;
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again or contact us directly via email.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Form validation
function initFormValidation() {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  inputs.forEach(input => {
    // Real-time validation
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    // Clear error on focus
    input.addEventListener('focus', () => {
      input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    field.style.borderColor = '#ff4444';
    return false;
  }
  
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.style.borderColor = '#ff4444';
      return false;
    }
  }
  
  field.style.borderColor = '#04e3b2';
  return true;
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  initContactAnimations();
  initContactForm();
  initFormValidation();
  initSmoothScroll();
  
  // Scroll to top on page load
  window.scrollTo(0, 0);
});

// Optional: Add loading state
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});