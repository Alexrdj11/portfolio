import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to your resume PDF in the public folder
    const filePath = path.join(process.cwd(), 'public', 'resume', 'harsha-resume.pdf');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('Resume file not found, using example file');
      
      // Return a sample PDF or an error message
      return new NextResponse(JSON.stringify({ 
        error: 'Resume file not found', 
        message: 'Please upload your resume to public/resume/harsha-resume.pdf' 
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Return the PDF with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="harsha-resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to download resume' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}