// Simple Express server to serve our standalone version
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files
app.use(express.static('.'));

// Route for the home page - serve our standalone mode selection page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'final_mode_screen.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Game server running at http://localhost:${port}`);
});