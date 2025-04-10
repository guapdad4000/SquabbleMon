// Simple Express server to serve our game
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Route for the home page - serve our direct fix page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'direct_fix.html'));
});

// Route for the game page - serve the working game.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'game.html'));
});

// Additional route for direct game access
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'game.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Game server running at http://localhost:${port}`);
  console.log(`Mode selection screen: http://localhost:${port}/`);
  console.log(`Direct game access: http://localhost:${port}/game`);
});