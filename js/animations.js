/*=============== ANIMATIONS JAVASCRIPT ===============*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Add performance optimization with requestAnimationFrame
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                requestAnimationFrame(() => inThrottle = false);
            }
        }
    };

    // Enhance animateOnScroll with performance optimization
    const animateOnScroll = throttle(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (elementPosition < screenPosition) {
                const animation = element.getAttribute('data-animation') || 'fade-in';
                requestAnimationFrame(() => {
                    element.classList.add(animation, 'animated');
                });
            }
        });
    }, 16);
    
    // Initial check for elements in view
    setTimeout(animateOnScroll, 500);
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate hero section elements
    const animateHero = function() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroTitle) {
            // Animate each part of the title separately
            const greeting = heroTitle.querySelector('.greeting');
            const name = heroTitle.querySelector('.name');
            const profession = heroTitle.querySelector('.profession');
            
            setTimeout(() => {
                greeting.classList.add('fade-in-down');
            }, 300);
            
            setTimeout(() => {
                name.classList.add('fade-in-down');
            }, 600);
            
            setTimeout(() => {
                profession.classList.add('fade-in-down');
            }, 900);
        }
        
        if (heroDescription) {
            setTimeout(() => {
                heroDescription.classList.add('fade-in-up');
            }, 1200);
        }
        
        if (heroButtons) {
            setTimeout(() => {
                heroButtons.classList.add('fade-in-up');
            }, 1500);
        }
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.classList.add('zoom-in');
            }, 300);
        }
    };
    
    // Animate hero section after preloader
    setTimeout(animateHero, 600);
    
    // Add smooth parallax effect with better performance
    const parallaxEffect = () => {
        const heroSection = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (heroSection && shapes.length > 0) {
            let ticking = false;
            
            window.addEventListener('mousemove', (e) => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;
                        
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        
                        shapes.forEach((shape, index) => {
                            const shiftValue = (index + 1) * 15;
                            const translateX = (mouseX / windowWidth - 0.5) * shiftValue;
                            const translateY = (mouseY / windowHeight - 0.5) * shiftValue;
                            
                            shape.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
                        });
                        
                        ticking = false;
                    });
                    
                    ticking = true;
                }
            });
        }
    };
    
    // Initialize parallax effect
    parallaxEffect();
    
    // Typing effect for text
    const initTypeWriter = function() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.display = 'inline-block';
            
            let i = 0;
            const speed = 100; // typing speed in milliseconds
            
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            
            // Start typing when element is in viewport
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    };
    
    // Initialize typing effect
    initTypeWriter();
    
    // Animate skill bars when they come into view
    const animateSkillBars = function() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };
    
    // Initialize skill bars animation
    setTimeout(animateSkillBars, 500);
    
    // Add smooth counter animation with easing
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter:not(.counted)');
        
        const easeOutQuad = t => t * (2 - t);
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = currentTime => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.round(target * easeOutQuad(progress));
                counter.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.classList.add('counted');
                }
            };
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCounter);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    };
    
    // Initialize counter animation
    animateCounters();
    
    // Scroll reveal animation
    const scrollReveal = function() {
        const revealElements = document.querySelectorAll('.reveal');
        
        revealElements.forEach(element => {
            const direction = element.getAttribute('data-direction') || 'up';
            const delay = element.getAttribute('data-delay') || 0;
            
            element.style.opacity = '0';
            element.style.transition = `all 0.8s ease ${delay}ms`;
            
            switch (direction) {
                case 'up':
                    element.style.transform = 'translateY(50px)';
                    break;
                case 'down':
                    element.style.transform = 'translateY(-50px)';
                    break;
                case 'left':
                    element.style.transform = 'translateX(50px)';
                    break;
                case 'right':
                    element.style.transform = 'translateX(-50px)';
                    break;
            }
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.opacity = '1';
                        element.style.transform = 'translate(0)';
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    };
    
    // Initialize scroll reveal
    scrollReveal();
    
    // Add smooth tilt effect with transform3d
    const initTiltEffect = () => {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            let ticking = false;
            
            const handleTilt = e => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const rect = element.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const tiltX = (y - centerY) / 10;
                        const tiltY = (centerX - x) / 10;
                        
                        element.style.transform = 
                            `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
                        
                        ticking = false;
                    });
                    
                    ticking = true;
                }
            };
            
            element.addEventListener('mousemove', handleTilt);
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };
    
    // Initialize tilt effect
    initTiltEffect();
    
    // Animate on hover
    const initHoverAnimations = function() {
        const hoverElements = document.querySelectorAll('.hover-animate');
        
        hoverElements.forEach(element => {
            const animation = element.getAttribute('data-hover-animation') || 'pulse';
            
            element.addEventListener('mouseenter', function() {
                this.classList.add(animation);
            });
            
            element.addEventListener('mouseleave', function() {
                this.classList.remove(animation);
            });
        });
    };
    
    // Initialize hover animations
    initHoverAnimations();
    
    // Animate section headers
    const animateSectionHeaders = function() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        sectionHeaders.forEach(header => {
            const title = header.querySelector('.section-title');
            const subtitle = header.querySelector('.section-subtitle');
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (title) title.classList.add('fade-in-down');
                        if (subtitle) {
                            setTimeout(() => {
                                subtitle.classList.add('fade-in-up');
                            }, 300);
                        }
                        observer.unobserve(header);
                    }
                });
            });
            
            observer.observe(header);
        });
    };
    
    // Initialize section header animations
    animateSectionHeaders();
});