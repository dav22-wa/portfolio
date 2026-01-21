// assets/js/db.js
class PortfolioDB {
  constructor() {
    this.STORAGE_KEY = 'portfolio_data';
    this.data = this.loadData();
  }

  loadData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      messages: [],
      pageViews: 0
    };
  }

  saveData() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  // Contact Form Messages
  saveMessage(name, email, message) {
    this.data.messages.push({
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString()
    });
    this.saveData();
  }

  getMessages() {
    return this.data.messages;
  }

  // Analytics
  trackView() {
    this.data.pageViews++;
    this.saveData();
  }
}

const db = new PortfolioDB();
export default db;