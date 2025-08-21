// Vercel serverless function wrapper for Express app
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// In-memory storage for contacts
const contacts = [];

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || '',
      email: email || '',
      message: message || '',
      createdAt: new Date()
    };
    
    contacts.push(contact);
    console.log('New contact submission:', contact);
    
    res.json({ 
      success: true, 
      message: "Thank you! We'll be in touch soon." 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Sorry, something went wrong. Please try again." 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export for Vercel
export default app;
