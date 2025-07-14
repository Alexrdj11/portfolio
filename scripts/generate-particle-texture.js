const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a canvas for the particle texture
const size = 64;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Clear with transparent background
ctx.clearRect(0, 0, size, size);

// Create a radial gradient (glow effect)
const gradient = ctx.createRadialGradient(
  size/2, size/2, 0,
  size/2, size/2, size/2
);
gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
gradient.addColorStop(0.3, 'rgba(160, 220, 255, 0.8)');
gradient.addColorStop(0.7, 'rgba(80, 140, 255, 0.3)');
gradient.addColorStop(1, 'rgba(0, 30, 80, 0)');

// Draw the circle
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
ctx.fill();

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.mkdirSync('public/textures', { recursive: true });
fs.writeFileSync('public/textures/glow-particle.png', buffer);

console.log('Particle texture generated at public/textures/glow-particle.png');