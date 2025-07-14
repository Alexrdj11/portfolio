import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    // Prepare the contact document with timestamp
    const contactDocument = {
      ...formData,
      createdAt: new Date(),
      _id: new ObjectId()
    };
    
    // Insert the contact submission into the collection
    const result = await db.collection('contacts').insertOne(contactDocument);
    
    console.log('Contact form submission saved to MongoDB:', result);

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
