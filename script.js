// ================================
// Typing Animation
// ================================

const roles = [
  "Runtime Builder",
  "Interpreter Developer",
  "Creator of Suny",
  "Founder of Solarity Labs",
  "Low-level Programming Enthusiast",
  "Systems Programmer",
  "Virtual Machine Architect"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseTime = 2000;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (!isDeleting) {
    // Typing
    typingElement.textContent = currentRole.slice(0, charIndex);
    charIndex++;
    
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    // Deleting
    typingElement.textContent = currentRole.slice(0, charIndex);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
      return;
    }
  }
  
  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 1000);
});

// ================================
// Navigation
// ================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ================================
// Scroll Progress Bar
// ================================

const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ================================
// Intersection Observer for Fade-in Animations
// ================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add fade-in class to sections
  const sectionsToAnimate = document.querySelectorAll('.about, .projects, .skills, .contact');
  sectionsToAnimate.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Add fade-in to cards
  const cards = document.querySelectorAll('.about-card, .project-card, .skill-category');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

// ================================
// Back to Top Button
// ================================

const backToTopButton = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.pageYOffset > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ================================
// Cursor Effect (Optional - Desktop Only)
// ================================

if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'custom-cursor-follower';
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
  
  // Add custom cursor styles
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor,
    .custom-cursor-follower {
      position: fixed;
      pointer-events: none;
      z-index: 10000;
      border-radius: 50%;
      transition: transform 0.2s ease;
    }
    
    .custom-cursor {
      width: 10px;
      height: 10px;
      background: linear-gradient(135deg, #a855f7, #ec4899);
      transform: translate(-50%, -50%);
    }
    
    .custom-cursor-follower {
      width: 40px;
      height: 40px;
      border: 2px solid rgba(168, 85, 247, 0.5);
      transform: translate(-50%, -50%);
    }
  `;
  document.head.appendChild(style);
}

// ================================
// Parallax Effect on Hero
// ================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

// ================================
// Dynamic Year in Footer
// ================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ================================
// Project Card Tilt Effect (Optional)
// ================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ================================
// Lazy Loading Images (if any images are added)
// ================================

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ================================
// Scroll Indicator Animation
// ================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.visibility = 'hidden';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.visibility = 'visible';
    }
  });
}

// ================================
// Performance Optimization: Debounce Scroll Events
// ================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollProgress = debounce(updateScrollProgress, 10);
const debouncedHighlightNav = debounce(highlightNavLink, 10);
const debouncedBackToTop = debounce(toggleBackToTop, 10);

window.removeEventListener('scroll', updateScrollProgress);
window.removeEventListener('scroll', highlightNavLink);
window.removeEventListener('scroll', toggleBackToTop);

window.addEventListener('scroll', debouncedScrollProgress);
window.addEventListener('scroll', debouncedHighlightNav);
window.addEventListener('scroll', debouncedBackToTop);

// ================================
// Console Easter Egg
// ================================

console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #a855f7;');
console.log('%cInterested in how this was built?', 'font-size: 14px; color: #6b7280;');
console.log('%cCheck out my GitHub: https://github.com/dinhsonhai132', 'font-size: 14px; color: #a855f7;');
console.log('%c🚀 Built with vanilla JavaScript - no frameworks needed!', 'font-size: 12px; color: #ec4899;');

// ================================
// Keyboard Navigation
// ================================

document.addEventListener('keydown', (e) => {
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Press 'Home' to scroll to top
  if (e.key === 'Home') {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Press 'End' to scroll to bottom
  if (e.key === 'End') {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
});

// ================================
// Page Load Animation
// ================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Add initial load animation to hero
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s ease';
  }
});

// Add initial page load style
document.body.style.transition = 'opacity 0.3s ease';

// ================================
// Analytics Event Tracking (Optional)
// ================================

function trackEvent(eventName, eventData) {
  // Placeholder for analytics tracking
  // Replace with your analytics service (GA, Plausible, etc.)
  console.log('Event:', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    trackEvent('Button Click', {
      text: e.target.textContent.trim(),
      href: e.target.href || 'N/A'
    });
  });
});

// Track project card clicks
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const projectName = card.querySelector('.project-title').textContent;
    trackEvent('Project Card Click', {
      project: projectName
    });
  });
});

// Track social link clicks
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('click', (e) => {
    trackEvent('Social Link Click', {
      platform: e.currentTarget.textContent.trim()
    });
  });
});

// ================================
// Service Worker Registration (Optional - for PWA)
// ================================

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('ServiceWorker registered:', registration);
//       })
//       .catch(error => {
//         console.log('ServiceWorker registration failed:', error);
//       });
//   });
// }

// ================================
// Dark Mode Toggle (Optional - commented out)
// ================================

// const darkModeToggle = document.getElementById('darkModeToggle');
// const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// function setDarkMode(isDark) {
//   document.body.classList.toggle('dark-mode', isDark);
//   localStorage.setItem('darkMode', isDark);
// }

// darkModeToggle.addEventListener('click', () => {
//   const isDark = !document.body.classList.contains('dark-mode');
//   setDarkMode(isDark);
// });

// // Initialize dark mode based on user preference
// const savedDarkMode = localStorage.getItem('darkMode');
// if (savedDarkMode !== null) {
//   setDarkMode(savedDarkMode === 'true');
// } else if (prefersDarkScheme.matches) {
//   setDarkMode(true);
// }

console.log('%c✨ Portfolio loaded successfully!', 'font-size: 16px; color: #10b981; font-weight: bold;');