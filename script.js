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

// Form Submission
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
        
        // In a real app, you would send this to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
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

// Trigger initial reveal
window.addEventListener('load', reveal);
window.addEventListener('scroll', reveal);

// Chatbot Functionality
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessageBtn = document.getElementById('sendMessage');

// Toggle chatbot visibility
chatbotBtn.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Chatbot responses
const botResponses = [
    "I can tell you more about David's skills and experience. What would you like to know?",
    "David has worked on projects including an AI-powered maize disease detection app. Would you like details on a specific project?",
    "For industrial attachment inquiries, you can use the contact form or email directly at davidwaihenya@gmail.com",
    "David is proficient in Python, Java, and web technologies like Flask. Need more specific information?",
    "The portfolio showcases projects including the award-winning Maize Disease Detection App!",
    "David is currently seeking industrial attachment opportunities in software development or AI.",
    "You can download the CV from the website for more detailed information."
];

const commonQuestions = {
    "skills": "David specializes in Python and Java programming, with experience in web development (Flask, HTML/CSS), networking, and AI/ML (TensorFlow).",
    "experience": "David is a third-year Computer Science student with hands-on project experience in AI, web development, and networking.",
    "projects": "Featured projects include an AI-powered maize disease detection app (award-winning), a records management web app, and a networking setup project.",
    "contact": "You can reach David through the contact form or directly at davidwaihenya@gmail.com or +254 792 477 722",
    "attachment": "David is seeking industrial attachment opportunities in software development, AI, or networking.",
    "education": "David is pursuing a Bachelor's in Computer Science at University of Embu (expected 2026)."
};

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Bot response
    setTimeout(() => {
        let response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    messageDiv.appendChild(messageText);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for common questions
    for (const [keyword, response] of Object.entries(commonQuestions)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    // Default random response
    return botResponses[Math.floor(Math.random() * botResponses.length)];
}

// Event listeners for chatbot
sendMessageBtn.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial bot message
window.addEventListener('load', () => {
    setTimeout(() => {
        addMessage("Hello! I'm DevBot, David's portfolio assistant. How can I help you today?", 'bot');
    }, 1000);
});