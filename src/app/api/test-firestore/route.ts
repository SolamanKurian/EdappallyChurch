import { NextResponse } from 'next/server';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('=== FIRESTORE TEST ===');
    
    // Test read operation
    console.log('Testing read operation...');
    const querySnapshot = await getDocs(collection(db, "sermons"));
    console.log('Read successful, found', querySnapshot.size, 'documents');
    
    // Test write operation
    console.log('Testing write operation...');
    const testData = {
      title: 'Test Sermon',
      date: '2025-01-01',
      preacher: 'Test Preacher',
      language: 'English',
      category: 'Test',
      imageUrl: 'https://example.com/test.jpg',
      audioUrl: 'https://example.com/test.mp3',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, "sermons"), testData);
    console.log('Write successful, document ID:', docRef.id);
    
    return NextResponse.json({
      success: true,
      message: 'Firestore operations are working!',
      readCount: querySnapshot.size,
      writeId: docRef.id
    });

  } catch (error) {
    console.error('Firestore test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Check your Firestore security rules'
    }, { status: 500 });
  }
} 