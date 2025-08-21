// Simple Vercel serverless function for contact form
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      
      const contact = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || '',
        email: email || '',
        message: message || '',
        createdAt: new Date()
      };
      
      console.log('New contact submission:', contact);
      
      res.status(200).json({ 
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}