import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// In a real application, you would add authentication here
// to ensure only admins can access this endpoint

export async function GET() {
  try {
    // Create a reference to the contacts collection
    const contactsCollection = collection(db, 'contacts');
    
    // Create a query against the collection
    const q = query(contactsCollection, orderBy('createdAt', 'desc'));
    
    // Get the documents
    const querySnapshot = await getDocs(q);
    
    // Convert the documents to an array of data
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
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
