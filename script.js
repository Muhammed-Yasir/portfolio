// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = document.querySelector('.moon');
const sunIcon = document.querySelector('.sun');
const projectsGrid = document.querySelector('.projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');

// Project Data
const projects = [
    {
        id: 1,
        title: 'AI Powered Virtual Assistant',
        description: 'An AI-powered desktop virtual assistant that responds to voice and text commands, secured with face recognition, utilizing NLP for intelligent conversations, real-time weather updates, and automation of desktop applications like Spotify and WhatsApp.',
        image: 'images\\ai.png',
        category: 'Desktop',
        technologies: ['Python', 'API', 'NLP','OpenCV','JavaScript','SQLite'],
        liveUrl: '/',
        githubUrl: 'https://github.com'
    },
    {
        id: 2,
        title: 'FlipKart-Clone',
        description: 'Front-end of E-commerce web app- Flipkart ',
        image: 'images\\flipkart.png',
        category: 'web',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: 'https://muhammed-yasir.github.io/flipkart-web-clone/',
        githubUrl: 'https://github.com'
    },
    {
        id: 3,
        title: 'Rover Controller',
        description: 'A web-based Mars Rover simulation that visually executes user commands to navigate a grid using directional controls.',
        image: 'images\\rover.png',
        category: 'web',
        technologies: ['JavaScript'],
        liveUrl: 'https://muhammed-yasir.github.io/project-rover/',
        githubUrl: 'https://github.com'
    },
    {
        id: 4,
        title: 'Amazon-Clone',
        description: 'Front-end of E-commerce web app- Amazone.',
        image: 'images\\amazone.png',
        category: 'web',
        technologies: ['HTML', 'CSS'],
        liveUrl: 'https://muhammed-yasir.github.io/amazone-web-clone/index.html',
        githubUrl: 'https://github.com'
    },
    {
        id: 5,
        title: 'Currency Converter',
        description: 'This Web allows users to input an amount in one currency and instantly receive its equivalent value in another, using real-time exchange rates',
        image: 'images\\currency.png',
        category: 'web',
        technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
        liveUrl: 'https://muhammed-yasir.github.io/currency-converter/',
        githubUrl: 'https://github.com'
    },
    
    
    
];

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Header Scroll Effect
function handleScroll() {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile Menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());
}

// Project Filtering
function filterProjects(category) {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    renderProjects(filteredProjects);
    
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
}

function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = projectsToRender.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    ${project.liveUrl ? `
                        <a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    ` : ''}
                    ${project.githubUrl ? `
                        <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="View source code">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    ` : ''}
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `
                        <span class="project-tag">${tech}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Contact Form
function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('p');
        successMessage.className = 'text-green-500 text-center mt-4';
        successMessage.textContent = 'Your message has been sent. Thank you!';
        e.target.appendChild(successMessage);
        
        // Reset form
        e.target.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 1500);
}

// Scroll Animation
function initializeScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    renderProjects(projects);
    initializeScrollAnimation();
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    themeToggle.addEventListener('click', toggleTheme);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterProjects(btn.dataset.filter));
    });
    contactForm.addEventListener('submit', handleSubmit);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
});