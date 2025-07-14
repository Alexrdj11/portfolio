"use client"

import { motion } from "framer-motion";
import { Download, Eye, FileText } from "lucide-react";
import { useState } from "react";

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError('');
      
      // Fetch the resume from our API endpoint
      const response = await fetch('/api/download-resume');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download resume');
      }
      
      // Check if the response is JSON (error) or blob (file)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download resume');
      }
      
      // Get the blob data
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'harsha-resume.pdf';
      
      // Append, click, and remove
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      console.error('Error downloading resume:', error);
      setError(error.message || 'Failed to download resume. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-color white">Resume</h1>
          <p className="text-xl text-gray-300 mb-8">Download or view my complete professional resume</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-white glow"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download size={20} />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </motion.button>

            <motion.a
              href="/resume/harsha-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 glass glass-hover rounded-full font-semibold text-white"
            >
              <Eye size={20} />
              View Online
            </motion.a>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-white"
            >
              <p>{error}</p>
              <p className="text-sm mt-2">
                Please add your resume PDF file to: <code>public/resume/harsha-resume.pdf</code>
              </p>
            </motion.div>
          )}
        </motion.div>


      </div>
    </div>
  );
}
