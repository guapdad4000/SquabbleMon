// This is a Node.js script that will serve our standalone mode selection screen

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set default page to final_mode_screen.html
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './final_mode_screen.html';
  }

  // Get file extension
  const extname = path.extname(filePath);
  
  // Set content type based on file extension
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Page not found
        fs.readFile('./404.html', (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('Sorry, internal server error: ' + error.code);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Configure server to listen on port 5000
server.listen(5000, '0.0.0.0', () => {
  console.log('Server running at http://localhost:5000/');
});