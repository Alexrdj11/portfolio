const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 32x32 canvas for the favicon
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Dark background
ctx.fillStyle = '#1a1a1a';
ctx.fillRect(0, 0, 32, 32);

// Add rounded corners effect
ctx.fillStyle = '#00d4ff';
ctx.font = 'bold 14px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('HJ', 16, 16);

// This would require additional libraries to create an actual .ico file
// For now, we'll use the SVG favicon which works well in modern browsers
console.log('Favicon canvas created');
