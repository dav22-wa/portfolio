// ==================================================================
// WORLD-CLASS PORTFOLIO - ENHANCED JAVASCRIPT
// Premium Interactions & Performance Optimizations
// ==================================================================

// Mobile Navigation - Enhanced
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');

// Mobile Menu Toggle
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================================================================
// SCROLL-BASED ENHANCEMENTS
// ==================================================================

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==================================================================
// SCROLL REVEAL ANIMATIONS
// ==================================================================

// Enhanced Intersection Observer for smooth reveals
const revealElements = document.querySelectorAll('.section, .project-card, .cert-card, .skill-category-new');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

// ==================================================================
// LAZY LOADING IMAGES
// ==================================================================

const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('lazy-load', 'loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    img.classList.add('lazy-load');
    imageObserver.observe(img);
});

// ==================================================================
// LOCAL DATABASE & ANALYTICS
// ==================================================================
class PortfolioDB {
    constructor() {
        this.STORAGE_KEY = 'portfolio_data_v1';
        this.data = this.loadData();
    }

    loadData() {
        const savedData = localStorage.getItem(this.STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : {
            messages: [],
            pageViews: 0,
            userSettings: {}
        };
    }

    saveData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    }

    saveMessage(name, email, message) {
        this.data.messages.push({
            id: Date.now(),
            name,
            email,
            message,
            date: new Date().toISOString(),
            read: false
        });
        this.saveData();
    }

    getMessages() {
        return this.data.messages;
    }

    markMessageRead(id) {
        const message = this.data.messages.find(msg => msg.id === id);
        if (message) {
            message.read = true;
            this.saveData();
        }
    }

    trackView() {
        this.data.pageViews++;
        this.saveData();
    }
}

const db = new PortfolioDB();

// Enhanced Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Save to local database
        db.saveMessage(name, email, message);
        
        // Optional: For actual submission, you would add:
        // await sendToServer(name, email, message);
        
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        
        // Log all messages (for debugging)
        console.log('All saved messages:', db.getMessages());
    });
}

// Scroll Reveal Animation
function reveal() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize sections with hidden state
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
});

// Track page view on load
window.addEventListener('load', () => {
    reveal();
    db.trackView();
    console.log(`Total page views: ${db.data.pageViews}`);
});

window.addEventListener('scroll', reveal);

// Enhanced Chatbot Functionality
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessageBtn = document.getElementById('sendMessage');

// Toggle chatbot visibility
chatbotBtn.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
        chatbotInput.focus();
    }
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Chatbot responses with local data integration
const botResponses = [
    "I can tell you more about David's skills and experience. What would you like to know?",
    "David has worked on projects including an AI-powered maize disease detection app. Would you like details?",
    `This page has been viewed ${db.data.pageViews} times.`,
    "For inquiries, email davidwaihenya@gmail.com or use the contact form.",
    "David specializes in Python, Java, and web technologies like Flask.",
    "The portfolio showcases award-winning projects!",
    "David seeks industrial attachment opportunities in software development or AI."
];

const commonQuestions = {
    "skills": "David specializes in: Python, Java, Flask, HTML/CSS, Networking, and AI/ML (TensorFlow).",
    "experience": "Third-year Computer Science student with hands-on project experience in AI and web development.",
    "projects": "Featured projects: 1) AI maize disease detection (award-winning), 2) Records management web app, 3) Networking setup.",
    "contact": "Contact: davidwaihenya@gmail.com | +254 792 477 722 | LinkedIn: David Waihenya",
    "attachment": "Currently seeking industrial attachment in: Software Development, AI, or Networking.",
    "education": "Bachelor's in Computer Science at University of Embu (expected 2026).",
    "views": `This portfolio has been viewed ${db.data.pageViews} times.`
};

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    setTimeout(() => {
        let response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    messageDiv.appendChild(messageText);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for common questions
    for (const [keyword, response] of Object.entries(commonQuestions)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    // Check for local data
    if (lowerMessage.includes('message') || lowerMessage.includes('contact')) {
        const messages = db.getMessages();
        if (messages.length > 0) {
            return `You've sent ${messages.length} messages through this portfolio.`;
        }
    }
    
    // Default random response
    return botResponses[Math.floor(Math.random() * botResponses.length)];
}

// Event listeners for chatbot
sendMessageBtn.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Initial bot message
setTimeout(() => {
    addMessage("Hello! I'm DevBot, David's portfolio assistant. Try asking about skills, projects, or experience.", 'bot');
}, 1000);

// Admin Panel Trigger (for debugging)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'd') { // Ctrl+D shortcut
        console.log('Database contents:', db.data);
        alert(`Admin: ${db.data.messages.length} messages stored`);
    }
});
