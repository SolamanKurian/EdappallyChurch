import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dhljtmmgy',
  api_key: '535484336416449',
  api_secret: '2yAVjGq1WiNhpSGZo_7yhMa1jmg',
});

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST UPLOAD DEBUG ===');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', file.name, 'Size:', file.size, 'bytes');
    console.log('Content-Type:', file.type);

    // Just return success for now to test the connection
    return NextResponse.json({
      success: true,
      message: 'Test upload successful',
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

  } catch (error) {
    console.error('Test upload error:', error);
    return NextResponse.json(
      { 
        error: 'Test upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 