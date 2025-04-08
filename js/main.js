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
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
    
    // Enhanced theme toggle system
    const ThemeManager = {
        init() {
            this.themeToggle = document.querySelector('.theme-toggle');
            this.moonIcon = this.themeToggle.querySelector('.fa-moon');
            this.sunIcon = this.themeToggle.querySelector('.fa-sun');
            
            // Check saved preference or system theme
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.body.classList.add('dark-theme');
            }
            
            this.updateIcons();
            this.bindEvents();
        },

        bindEvents() {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            
            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (e) => this.handleSystemThemeChange(e));
        },

        toggleTheme() {
            document.body.classList.toggle('dark-theme');
            this.updateIcons();
            this.savePreference();
        },

        updateIcons() {
            const isDark = document.body.classList.contains('dark-theme');
            this.moonIcon.style.display = isDark ? 'none' : 'block';
            this.sunIcon.style.display = isDark ? 'block' : 'none';
        },

        savePreference() {
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        },

        handleSystemThemeChange(e) {
            if (!localStorage.getItem('theme')) {
                document.body.classList.toggle('dark-theme', e.matches);
                this.updateIcons();
            }
        }
    };

    // Enhanced custom cursor system
    const CursorManager = {
        init() {
            this.dot = document.querySelector('.cursor-dot');
            this.outline = document.querySelector('.cursor-dot-outline');
            
            if (window.matchMedia('(pointer: fine)').matches && this.dot && this.outline) {
                this.setupCursor();
                this.bindEvents();
            } else {
                this.hideCursor();
            }
        },

        setupCursor() {
            this.dot.style.opacity = '1';
            this.outline.style.opacity = '1';
            this.posX = 0;
            this.posY = 0;
        },

        bindEvents() {
            document.addEventListener('mousemove', (e) => this.moveCursor(e));
            document.addEventListener('mousedown', () => this.addCursorState('click'));
            document.addEventListener('mouseup', () => this.removeCursorState('click'));
            
            this.setupInteractiveElements();
        },

        setupInteractiveElements() {
            const interactiveElements = document.querySelectorAll(
                'a, button, .btn, input, textarea, .project-card, .skill-item'
            );

            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    this.addCursorState('hover');
                    this.startMagneticEffect(element);
                });
                
                element.addEventListener('mouseleave', () => {
                    this.removeCursorState('hover');
                    this.stopMagneticEffect(element);
                });
            });
        },

        moveCursor(e) {
            // Smooth cursor movement with acceleration
            if (!this.posX) {
                this.posX = e.clientX;
                this.posY = e.clientY;
            }

            this.posX += (e.clientX - this.posX) * 0.15;
            this.posY += (e.clientY - this.posY) * 0.15;

            requestAnimationFrame(() => {
                this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                this.outline.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
            });
        },

        addCursorState(state) {
            this.dot.classList.add(`cursor-${state}`);
            this.outline.classList.add(`cursor-${state}`);
        },

        removeCursorState(state) {
            this.dot.classList.remove(`cursor-${state}`);
            this.outline.classList.remove(`cursor-${state}`);
        },

        startMagneticEffect(element) {
            element.addEventListener('mousemove', this.handleMagneticMove);
        },

        stopMagneticEffect(element) {
            element.removeEventListener('mousemove', this.handleMagneticMove);
            element.style.transform = '';
        },

        handleMagneticMove(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            this.style.transform = `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px)`;
        },

        hideCursor() {
            if (this.dot) this.dot.style.display = 'none';
            if (this.outline) this.outline.style.display = 'none';
        }
    };

    // Initialize managers after DOM loads
    ThemeManager.init();
    CursorManager.init();

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
});