import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// In a real application, you would add authentication here
// to ensure only admins can access this endpoint

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    // Fetch all contacts, sorted by createdAt in descending order
    const contacts = await db
      .collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      contacts
    });
    
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
