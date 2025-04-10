// Simple Node.js script to serve our files
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static('.'));

// Route for the new simplified index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'new_index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Game server running at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop');
});