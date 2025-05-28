/**
 * Recapa - Animation and Interactive Elements
 * Handles scroll animations, hover effects, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animations and interactive elements
  initScrollAnimations();
  initHoverEffects();
  initTestimonialCarousel();
  initMobileMenu();
  initSmoothScroll();
});

/**
 * Scroll Animations
 * Adds animation classes to elements as they enter the viewport
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Observer options
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // 20% of the element visible
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Observe all elements with animation class
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Hover Effects
 * Adds interactive hover effects to buttons and cards
 */
function initHoverEffects() {
  // Benefit cards hover effect
  const benefitCards = document.querySelectorAll('.benefit-card');
  
  benefitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
  });
  
  // CTA buttons hover effect
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('hover');
    });
    
    button.addEventListener('mouseleave', () => {
      button.classList.remove('hover');
    });
  });
}

/**
 * Testimonial Carousel
 * Handles the testimonial carousel on the artist page
 */
function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return; // Exit if carousel doesn't exist on current page
  
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Initialize carousel
  updateCarousel();
  
  // Event listeners for controls
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateCarousel();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slideCount;
      updateCarousel();
    });
  }
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Auto-advance carousel every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
  }, 5000);
  
  // Update carousel display
  function updateCarousel() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.style.display = index === currentSlide ? 'block' : 'none';
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
}

/**
 * Mobile Menu Toggle
 * Handles the mobile menu toggle functionality
 */
function initMobileMenu() {
  // Change from menu-toggle to mobile-menu-toggle to match your HTML
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (!menuToggle || !navbarLinks) return;
  
  menuToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!navbarLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navbarLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

/**
 * Smooth Scroll
 * Enables smooth scrolling to anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      const navbarLinks = document.querySelector('.navbar-links');
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      if (navbarLinks && navbarLinks.classList.contains('active')) {
        navbarLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
      
      // Scroll to target with smooth behavior
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Subtle Background Animation
 * Creates a subtle gradient blob animation in the background
 * This is optional and can be enabled by adding the .animated-background class
 */
function initBackgroundAnimation() {
  const backgrounds = document.querySelectorAll('.animated-background');
  
  backgrounds.forEach(bg => {
    // Create gradient blobs
    for (let i = 0; i < 3; i++) {
      const blob = document.createElement('div');
      blob.classList.add('gradient-blob');
      blob.style.left = `${Math.random() * 100}%`;
      blob.style.top = `${Math.random() * 100}%`;
      blob.style.animationDelay = `${Math.random() * 5}s`;
      bg.appendChild(blob);
    }
  });
  
  // Add subtle parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    backgrounds.forEach(bg => {
      const blobs = bg.querySelectorAll('.gradient-blob');
      blobs.forEach((blob, index) => {
        const speed = 0.05 + (index * 0.02);
        blob.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  });
}