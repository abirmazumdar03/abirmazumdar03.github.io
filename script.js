document.addEventListener('DOMContentLoaded', function() {
    // Background Carousel
    const carouselBackground = document.querySelector('.carousel-background');
    const backgroundImages = [
        'url("https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80")',
        'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80")',
        'url("https://images.unsplash.com/photo-1526378800651-dd828c8d7255?auto=format&fit=crop&q=80")',
        'url("https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80")'
    ];
    
    let currentImageIndex = 0;
    carouselBackground.style.backgroundImage = backgroundImages[currentImageIndex];
    
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        carouselBackground.style.opacity = '0';
        
        setTimeout(() => {
            carouselBackground.style.backgroundImage = backgroundImages[currentImageIndex];
            carouselBackground.style.opacity = '0.25';
        }, 500);
    }, 5000);
    
    // Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Animate skill bars on scroll
    const skillSection = document.querySelector('.skills-container');
    const skillBars = document.querySelectorAll('.skill-level');
    
    const showSkills = () => {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            skillBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
            window.removeEventListener('scroll', showSkills);
        }
    };
    
    window.addEventListener('scroll', showSkills);
    
    // Form Submission (dummy for demo)
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, send data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message (in a real app)
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
    
    // Initialize animations after page load
    setTimeout(() => {
        // Set initial skill bar widths
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            bar.dataset.width = width;
        });
        
        // Check if skills section is in view on page load
        if (skillSection.getBoundingClientRect().top < window.innerHeight) {
            skillBars.forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                }, 500);
            });
        }
    }, 100);
});