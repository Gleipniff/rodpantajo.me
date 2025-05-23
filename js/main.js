/*=============== MAIN JAVASCRIPT ===============*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
            // Add fade-in animation to sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('fade-in');
            });
            // Initialize skill progress bars
            initSkillBars();
        }, 500);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Check if sections are in viewport for animations
        document.querySelectorAll('.section').forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animated')) {
                section.classList.add('animated', 'fade-in-up');
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
    });

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    function updateMobileNav() {
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const hamburger = document.querySelector('.hamburger');
        const mobileNav = document.querySelector('.mobile-nav');
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    updateMobileNav();
    
    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            // Cursor dot follows cursor exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Cursor outline follows with a slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .skill-item, .testimonial-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.border = '2px solid var(--primary-color-light)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.border = '2px solid var(--primary-color)';
            });
        });
    }
    
    // Initialize skill progress bars
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
        });
    }
    
    // Testimonials slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonials-dots');
    
    if (testimonialsTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = 100; // 100%
        
        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Function to update slider position
        function updateSlider() {
            testimonialsTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
            updateSlider();
        });
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            updateSlider();
        });
        
        // Auto slide
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            updateSlider();
        }, 5000);
        
        // Pause auto slide on hover
        testimonialsTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
                updateSlider();
            }, 5000);
        });
    }
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add shake animation
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 800);
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailInput = contactForm.querySelector('#email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailInput.value && !emailPattern.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
                
                // Add shake animation
                emailInput.classList.add('shake');
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 800);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('i');
                
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    btnText.textContent = 'Message Sent!';
                    btnIcon.className = 'fas fa-check';
                    
                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        btnIcon.className = 'fas fa-paper-plane';
                    }, 3000);
                }, 2000);
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (!emailInput.value.trim()) {
                emailInput.classList.add('error');
                return;
            }
            
            // Simulate subscription
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                emailInput.value = '';
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Add page transition effect
    const pageTransition = () => {
        document.body.classList.add('fade-out');
        
        const links = document.querySelectorAll('a[href]:not([target="_blank"])');
        links.forEach(link => {
            link.addEventListener('click', e => {
                if (link.hostname === window.location.hostname) {
                    e.preventDefault();
                    const dest = link.href;
                    
                    document.body.classList.add('fade-out');
                    
                    setTimeout(() => {
                        window.location.href = dest;
                    }, 500);
                }
            });
        });
    };
    
    // Initialize page transition
    pageTransition();
});