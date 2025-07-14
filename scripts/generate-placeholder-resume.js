const fs = require('fs');
const path = require('path');

// Simple HTML content for a placeholder resume
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Harsha's Resume</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #0066cc; }
    .section { margin-bottom: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Harsha's Resume</h1>
    <p>AI/ML Engineer | Full Stack Developer</p>
  </div>
  
  <div class="section">
    <h2>Professional Summary</h2>
    <p>Experienced developer with expertise in AI, machine learning, and full-stack development.</p>
  </div>
  
  <div class="section">
    <h2>Skills</h2>
    <p>Python, JavaScript, React, Next.js, TensorFlow, PyTorch, Java</p>
  </div>
  
  <div class="section">
    <h2>Experience</h2>
    <p>This is a placeholder resume. Please replace with your actual resume.</p>
  </div>
</body>
</html>
`;

// Ensure directory exists
const resumeDir = path.join(__dirname, '..', 'public', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

// Write HTML file
fs.writeFileSync(path.join(resumeDir, 'harsha-resume.html'), htmlContent);

console.log('Placeholder resume HTML created at public/resume/harsha-resume.html');
console.log('Now you need to convert this to PDF manually or use a PDF library');