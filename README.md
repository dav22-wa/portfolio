# David Wahenya - Professional Portfolio

[![Live Demo](https://img.shields.io/badge/Netlify-Live%20Demo-brightgreen)](https://portfolio-519f37.netlify.app/)
![GitHub last commit](https://img.shields.io/github/last-commit/davidwahenya/portfolio)

![Portfolio Preview](assets/preview.png)

## 🌟 Features

### 🛠 Core Functionality
- **Local Database System** (Browser Storage)
  - Contact form message persistence
  - Page view analytics
  - Data export capability
- **Interactive AI Chatbot**
  - Dynamic responses about skills/projects
  - Real-time data integration
- **Responsive Design**
  - Mobile-first CSS with Flexbox/Grid
  - Cross-browser compatible

### 📊 Data Management
```javascript
{
  "messages": [
    {
      "id": 123456789,
      "name": "Visitor Name",
      "email": "email@example.com",
      "message": "Hello!",
      "date": "2023-08-20T12:00:00.000Z",
      "read": false
    }
  ],
  "pageViews": 42,
  "userSettings": {}
}
🧩 Code Structure

portfolio/
├── index.html          # Main application
├── style.css           # Responsive styling
├── script.js           # All interactive logic
├── assets/
│   ├── js/
│   │   └── db.js       # Database class (integrated)
│   ├── preview.png     # Screenshot
│   ├── profile.jpg     # Professional photo
│   └── chatbot-icon.png
└── README.md           # This file
🚀 Installation


# Clone repository
git clone https://github.com/davidwahenya/portfolio.git

# No build required - open directly
open index.html
🔍 Admin Access
Press Ctrl+D on any page

View console for database contents

Access exported data via:


// In browser console
JSON.parse(localStorage.getItem('portfolio_data_v1'))
🤖 Chatbot Commands
Try asking about:

"What skills does David have?"

"Tell me about the projects"

"How many views has this portfolio had?"

"What's David's contact info?"

📝 Form Handling
All contact form submissions are stored with:

Timestamp

Read status

Persistent browser storage

🌐 Deployment
Automatically deployed via:

Netlify (Primary): Pushes to main branch

Local Storage: Persists across sessions

📜 License
MIT License - See LICENSE for details.

💡 Pro Tip: To extend this system:

Add server sync with fetch() calls

Implement data encryption

Create an admin dashboard

David Wahenya
📧 davidwaihenya@gmail.com
📞 +254 792 477 722
🔗 LinkedIn Profile
