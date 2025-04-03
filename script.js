// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Local Database Implementation
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
