/**
 * Recapa - Main JavaScript
 * Handles general site functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initSmoothScroll();
  initVideoModal();
});

/**
 * Initialize Sticky Navbar
 * Makes the navbar sticky on scroll
 */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

/**
 * Initialize Smooth Scroll
 * Enables smooth scrolling to anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip if it's just "#"
      if (link.getAttribute('href') === '#') return;
      
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
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
 * Initialize Video Modal
 * Sets up the video modal functionality
 */
function initVideoModal() {
  const videoTriggers = document.querySelectorAll('.video-trigger');
  const videoModal = document.querySelector('.video-modal');
  const videoFrame = document.querySelector('.video-frame');
  const closeModal = document.querySelector('.close-modal');
  
  if (!videoModal || !videoFrame) return;
  
  // Open modal when clicking on video triggers
  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      const videoSrc = trigger.getAttribute('data-video-src');
      if (!videoSrc) return;
      
      videoFrame.setAttribute('src', videoSrc);
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Close modal when clicking on close button
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      closeVideoModal();
    });
  }
  
  // Close modal when clicking outside the content
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
  
  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
  
  function closeVideoModal() {
    videoModal.classList.remove('active');
    videoFrame.setAttribute('src', ''); // Stop video playback
    document.body.style.overflow = ''; // Restore scrolling
  }
}