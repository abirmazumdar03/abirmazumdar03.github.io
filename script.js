// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect variables
    const typingText = document.getElementById('typing-text');
    const phrases = [
      'Machine Learning Engineer',
      'AI Researcher',
      'Deep Learning Enthusiast',
      'Data Scientist',
      'Neural Network Architect'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    // Stats counter variables
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    // Nav shrink on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        document.getElementById('mainNav').classList.add('navbar-shrink');
      } else {
        document.getElementById('mainNav').classList.remove('navbar-shrink');
      }
      
      // Animate stats when in viewport
      if (!statsAnimated && isInViewport(document.querySelector('.stats-container'))) {
        animateStats();
        statsAnimated = true;
      }
      
      // Animate progress bars when in viewport
      document.querySelectorAll('.progress-bar').forEach(bar => {
        if (isInViewport(bar) && !bar.classList.contains('animated')) {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('aria-valuenow') + '%';
            bar.classList.add('animated');
          }, 200);
        }
      });
      
      // Add animation to sections when they come into viewport
      document.querySelectorAll('section').forEach(section => {
        if (isInViewport(section) && !section.classList.contains('animated')) {
          section.classList.add('fade-in');
          section.classList.add('animated');
        }
      });
    });
    
    // Background slider
    const slides = document.querySelectorAll('.background-slide');
    let currentSlide = 0;
    
    function changeSlide() {
      slides.forEach(slide => slide.classList.remove('active'));
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
    
    // Set active nav item based on scroll position
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll("section");
      const navItems = document.querySelectorAll(".nav-link");
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
          item.classList.add("active");
        }
      });
    });
    
    // Typing effect function
    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before new phrase
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Animate stats function
    function animateStats() {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const increment = Math.ceil(target / 50);
        const duration = 2000; // 2 seconds
        const interval = duration / (target / increment);
        
        const counter = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(counter);
          } else {
            stat.textContent = count;
          }
        }, interval);
      });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      });
    });
    
    // Initialize functions
    type(); // Start typing effect
    setInterval(changeSlide, 5000); // Change background every 5 seconds
    
    // Add hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.querySelector('.overlay').style.opacity = '1';
      });
      
      card.addEventListener('mouseleave', function() {
        this.querySelector('.overlay').style.opacity = '0';
      });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let valid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
          if (input.hasAttribute('required') && !input.value.trim()) {
            valid = false;
            input.classList.add('is-invalid');
          } else {
            input.classList.remove('is-invalid');
          }
        });
        
        if (valid) {
          // Form submission - in a real application, you would handle this with AJAX
          alert('Thank you for your message! I will get back to you soon.');
          this.reset();
        }
      });
    }
  });