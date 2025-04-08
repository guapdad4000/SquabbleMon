// Script to update the character sprites
const fs = require('fs');
const path = require('path');

// Read the script.js file
fs.readFile('script.js', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Update the Imgur URLs to local paths
  let updatedData = data;

  // Use regex to find all sprite URLs in the characters array
  const spriteRegex = /sprite: "https:\/\/i\.imgur\.com\/([a-zA-Z0-9]+)\.png"/g;
  
  // Replace each Imgur URL with a local path
  updatedData = updatedData.replace(spriteRegex, (match, imgID) => {
    const characterName = match.split(',')[0].split(':')[0].trim().toLowerCase().replace(/"/g, '');
    return `sprite: "./public/sprites/${characterName}.png", 
    image: "./public/sprites/${characterName}.png"`;
  });

  // Also update the battle backgrounds
  updatedData = updatedData.replace(/const battleBackgrounds = \[([\s\S]*?)\];/g, 
    'const battleBackgrounds = [\n' +
    '  "./public/backgrounds/bg1.png", // Original background\n' +
    '  "./public/backgrounds/bg2.png", // Original background\n' +
    '  "./public/backgrounds/bg3.png", // New wallpaper\n' +
    '  "./public/backgrounds/bg4.png", // New wallpaper\n' +
    '  "./public/backgrounds/bg5.png", // New wallpaper\n' +
    '  "./public/backgrounds/bg6.png"  // New wallpaper\n' +
    '];');

  // Write the updated content back to script.js
  fs.writeFile('script.js.new', updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Script.js has been updated successfully.');
  });
});