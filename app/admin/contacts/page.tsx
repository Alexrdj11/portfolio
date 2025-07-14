"use client"

import { useState, useEffect } from 'react';

type ContactSubmission = {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('/api/admin/contacts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        
        const data = await response.json();
        setContacts(data.contacts);
      } catch (err) {
        setError('Error fetching contact submissions. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchContacts();
  }, []);

  return (
    <div className="pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-orbitron font-bold text-gradient mb-8">Contact Submissions</h1>
        
        {isLoading ? (
          <div className="glass rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading contact submissions...</p>
          </div>
        ) : error ? (
          <div className="glass rounded-xl p-8 text-center text-red-400">
            <p>{error}</p>
            <p className="mt-4 text-sm text-gray-300">
              To view submissions, you need to set up the admin API route first.
            </p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-gray-300">No contact submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {contacts.map(contact => (
              <div key={contact._id} className="glass rounded-xl p-6">
                <div className="flex flex-wrap justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {contact.subject || "Message from visitor"}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {new Date(contact.createdAt).toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">From:</p>
                    <p>{contact.name} ({contact.email})</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-400">Message:</p>
                  <p className="whitespace-pre-wrap p-4 bg-black/20 rounded-lg mt-2">{contact.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
