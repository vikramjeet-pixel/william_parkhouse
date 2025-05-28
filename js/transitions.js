document.addEventListener('DOMContentLoaded', function() {
  // Get all links that lead to other pages
  const pageLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="https://"])');
  const transitionOverlay = document.querySelector('.page-transition');
  
  // Add click event listeners to all page links
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only handle internal links
      if (this.hostname === window.location.hostname) {
        e.preventDefault();
        const targetUrl = this.href;
        
        // Activate transition overlay
        transitionOverlay.classList.add('active');
        
        // Navigate to the new page after animation completes
        setTimeout(function() {
          window.location.href = targetUrl;
        }, 300);
      }
    });
  });
});