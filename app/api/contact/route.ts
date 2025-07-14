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
    // Only include specific fields to avoid invalid values
    const contactDocument = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || '',
      message: formData.message,
      createdAt: new Date().toISOString() // Use ISO string instead of serverTimestamp()
    };
    
    // Add the contact submission to Firestore
    let docId;
    try {
      const contactsCollection = collection(db, 'contacts');
      console.log('Adding document to Firestore:', JSON.stringify(contactDocument));
      const docRef = await addDoc(contactsCollection, contactDocument);
      docId = docRef.id;
    } catch (firestoreError) {
      console.error('Firestore error details:', firestoreError);
      throw firestoreError;
    }
    
    console.log('Contact form submission saved to Firestore:', docId);

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
