// Simple HTTP server for the Squabble game
const http = require('http');
const fs = require('fs');
const path = require('path');

// Map file extensions to content types
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

// Create server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - Request: ${req.method} ${req.url}`);
  
  // Normalize URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    // Serve our emergency fixed mode selection file instead of index.html
    filePath = './emergency.html';
  }
  
  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = contentTypes[extname] || 'application/octet-stream';
  
  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        console.log(`${new Date().toISOString()} - 404: ${filePath}`);
        fs.readFile('./404.html', (err, content) => {
          if (err) {
            // Can't even find 404 page
            res.writeHead(404);
            res.end('404 - File Not Found');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        console.log(`${new Date().toISOString()} - 500: ${error.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Using emergency.html as the main page');
});