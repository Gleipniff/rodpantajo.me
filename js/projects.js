/*=============== PROJECTS JAVASCRIPT ===============*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Projects filtering
    const initProjectsFilter = function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0 && projectCards.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get filter value
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Filter projects
                    projectCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        
                        // Hide all cards first
                        card.style.display = 'none';
                        
                        // Show cards based on filter
                        if (filterValue === 'all' || filterValue === cardCategory) {
                            card.style.display = 'block';
                            
                            // Add animation
                            card.classList.remove('fade-in');
                            void card.offsetWidth; // Trigger reflow
                            card.classList.add('fade-in');
                        }
                    });
                });
            });
        }
    };
    
    // Initialize projects filter
    initProjectsFilter();
    
    // Project modal
    const initProjectModal = function() {
        const projectLinks = document.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            if (link.classList.contains('preview-link')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const projectCard = this.closest('.project-card');
                    const projectTitle = projectCard.querySelector('.project-title').textContent;
                    const projectDescription = projectCard.querySelector('.project-description').textContent;
                    const projectImage = projectCard.querySelector('.project-img img').getAttribute('src');
                    
                    // Create modal
                    const modal = document.createElement('div');
                    modal.classList.add('project-modal');
                    
                    modal.innerHTML = `
                        <div class="modal-overlay"></div>
                        <div class="modal-container">
                            <div class="modal-header">
                                <h3 class="modal-title">${projectTitle}</h3>
                                <button class="modal-close"><i class="fas fa-times"></i></button>
                            </div>
                            <div class="modal-body">
                                <div class="modal-image">
                                    <img src="${projectImage}" alt="${projectTitle}">
                                </div>
                                <div class="modal-content">
                                    <p class="modal-description">${projectDescription}</p>
                                    <div class="modal-details">
                                        <div class="modal-detail">
                                            <h4>Client</h4>
                                            <p>Example Client</p>
                                        </div>
                                        <div class="modal-detail">
                                            <h4>Date</h4>
                                            <p>January 2025</p>
                                        </div>
                                        <div class="modal-detail">
                                            <h4>Role</h4>
                                            <p>Frontend Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Append modal to body
                    document.body.appendChild(modal);
                    
                    // Prevent body scrolling
                    document.body.classList.add('no-scroll');
                    
                    // Add animation
                    setTimeout(() => {
                        modal.classList.add('active');
                    }, 10);
                    
                    // Close modal on click
                    const closeBtn = modal.querySelector('.modal-close');
                    const overlay = modal.querySelector('.modal-overlay');
                    
                    closeBtn.addEventListener('click', closeModal);
                    overlay.addEventListener('click', closeModal);
                    
                    // Close modal on ESC key
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'Escape') {
                            closeModal();
                        }
                    });
                    
                    function closeModal() {
                        modal.classList.remove('active');
                        
                        setTimeout(() => {
                            document.body.removeChild(modal);
                            document.body.classList.remove('no-scroll');
                        }, 300);
                    }
                });
            }
        });
    };
    
    // Initialize project modal
    initProjectModal();
    
    // Project image lazy loading
    const lazyLoadProjectImages = function() {
        const projectImages = document.querySelectorAll('.project-img img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            projectImages.forEach(img => {
                if (img.hasAttribute('data-src')) {
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            projectImages.forEach(img => {
                if (img.hasAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
            });
        }
    };
    
    // Initialize lazy loading
    lazyLoadProjectImages();
    
    // Project hover effect
    const initProjectHoverEffect = function() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    };
    
    // Initialize project hover effect
    initProjectHoverEffect();
    
    // Project load more functionality
    const initLoadMoreProjects = function() {
        const loadMoreBtn = document.querySelector('.projects-more .btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simulate loading more projects
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Create new project cards
                    const projectsGrid = document.querySelector('.projects-grid');
                    
                    // Sample new projects data
                    const newProjects = [
                        {
                            title: 'Weather App',
                            description: 'A weather application that provides real-time weather information based on user location or search.',
                            image: 'assets/img/projects/project-7.jpg',
                            category: 'app',
                            tags: ['JavaScript', 'API', 'CSS', 'Responsive']
                        },
                        {
                            title: 'Restaurant Website',
                            description: 'A fully responsive restaurant website with online reservation system and menu display.',
                            image: 'assets/img/projects/project-8.jpg',
                            category: 'web',
                            tags: ['HTML', 'CSS', 'JavaScript', 'PHP']
                        },
                        {
                            title: 'Dashboard UI',
                            description: 'A modern dashboard user interface design with data visualization and user management.',
                            image: 'assets/img/projects/project-9.jpg',
                            category: 'design',
                            tags: ['Figma', 'UI/UX', 'Prototype']
                        }
                    ];
                    
                    // Add new projects to grid
                    newProjects.forEach(project => {
                        const projectCard = document.createElement('div');
                        projectCard.classList.add('project-card');
                        projectCard.setAttribute('data-category', project.category);
                        
                        projectCard.innerHTML = `
                            <div class="project-img">
                                <img src="${project.image}" alt="${project.title}">
                            </div>
                            <div class="project-content">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">${project.description}</p>
                                <div class="project-tags">
                                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                                <div class="project-links">
                                    <a href="#" class="project-link"><i class="fas fa-eye"></i> Preview</a>
                                    <a href="#" class="project-link"><i class="fab fa-github"></i> Code</a>
                                </div>
                            </div>
                        `;
                        
                        projectsGrid.appendChild(projectCard);
                        
                        // Add animation
                        projectCard.classList.add('fade-in-up');
                    });
                    
                    // Update button
                    this.innerHTML = 'All Projects Loaded';
                    this.disabled = true;
                    this.style.opacity = '0.7';
                    
                    // Reinitialize project filter
                    initProjectsFilter();
                    
                    // Reinitialize project hover effect
                    initProjectHoverEffect();
                    
                    // Reinitialize project modal
                    initProjectModal();
                }, 1500);
            });
        }
    };
    
    // Initialize load more functionality
    initLoadMoreProjects();
});