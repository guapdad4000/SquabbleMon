import fs from 'fs';

// Read the script.js file
const filePath = 'script.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the animation helper functions (already done)
// Now focus on fixing the animation restoration code

// 1. Replace player animation restoration code in various places
content = content.replace(/if \(window\.originalPlayerClass\) {[\s\S]*?playerSprite\.style\.animation = "float 2s ease-in-out infinite";[\s\S]*?}/g, 'setPlayerAnimation("default");');

// 2. Replace opponent animation restoration code in various places
content = content.replace(/if \(window\.originalOpponentClass\) {[\s\S]*?opponentSprite\.style\.animation = "float 2s ease-in-out infinite";[\s\S]*?opponentSprite\.style\.transform = "scaleX\(-1\)";[\s\S]*?}/g, 'setOpponentAnimation("default");');

// 3. Fix animation code in hitSelf function
const hitSelfPattern = /playerSprite\.style\.animation = "player-shake-animation 0.5s ease-in-out";[\s\S]*?setTimeout\(\(\) => {[\s\S]*?playerSprite\.style\.animation = "float 2s ease-in-out infinite";[\s\S]*?}, 500\);/g;
content = content.replace(hitSelfPattern, 
`setPlayerAnimation("shake");
    setTimeout(() => {
      setPlayerAnimation("default");
    }, 500);`);

// 4. Fix opponent shake animation code
const opponentShakePattern = /opponentSprite\.style\.animation = "shake-animation 0.5s ease-in-out";[\s\S]*?setTimeout\(\(\) => {[\s\S]*?opponentSprite\.style\.animation = "float 2s ease-in-out infinite";[\s\S]*?opponentSprite\.style\.transform = "scaleX\(-1\)";[\s\S]*?}, 500\);/g;
content = content.replace(opponentShakePattern, 
`setOpponentAnimation("shake");
    setTimeout(() => {
      setOpponentAnimation("default");
    }, 500);`);

// 5. Update player hit animation - make sure to restore default animation
content = content.replace(
  /playerSprite\.classList\.add\("player-shake-animation"\);[\s\S]*?setTimeout\(\(\) => {[\s\S]*?playerSprite\.classList\.remove\("player-shake-animation"\);[\s\S]*?playerSprite\.classList\.remove\("hit-flash"\);[\s\S]*?}, 1000\);/g,
  `playerSprite.classList.add("player-shake-animation");
    playerSprite.classList.add("hit-flash");
    setPlayerAnimation("shake");
    
    setTimeout(() => {
      playerSprite.classList.remove("player-shake-animation");
      playerSprite.classList.remove("hit-flash");
      setPlayerAnimation("default");
    }, 1000);`
);

// 6. Update opponent hit animation - make sure to restore default animation
content = content.replace(
  /opponentSprite\.classList\.add\("shake-animation"\);[\s\S]*?setTimeout\(\(\) => {[\s\S]*?opponentSprite\.classList\.remove\("shake-animation"\);[\s\S]*?opponentSprite\.classList\.remove\("hit-flash"\);[\s\S]*?}, 1000\);/g,
  `opponentSprite.classList.add("shake-animation");
    opponentSprite.classList.add("hit-flash");
    setOpponentAnimation("shake");
    
    setTimeout(() => {
      opponentSprite.classList.remove("shake-animation");
      opponentSprite.classList.remove("hit-flash");
      setOpponentAnimation("default");
    }, 1000);`
);

// Save the modified content back to script.js
fs.writeFileSync(filePath, content, 'utf8');

console.log('Animation code fixes applied successfully');