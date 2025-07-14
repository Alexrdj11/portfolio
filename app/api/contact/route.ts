import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    // Parse the form data from the request
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Prepare the contact document with timestamp
    const contactDocument = {
      ...formData,
      createdAt: serverTimestamp()
    };
    
    // Add the contact submission to Firestore
    const contactsCollection = collection(db, 'contacts');
    const docRef = await addDoc(contactsCollection, contactDocument);
    
    console.log('Contact form submission saved to Firestore:', docRef.id);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Your message has been received and saved.' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
