import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dhljtmmgy',
  api_key: '535484336416449',
  api_secret: '2yAVjGq1WiNhpSGZo_7yhMa1jmg',
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'church-uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type - allow both audio and image files
    const isAudio = file.type.startsWith('audio/');
    const isImage = file.type.startsWith('image/');
    
    if (!isAudio && !isImage) {
      return NextResponse.json({ 
        error: 'Only audio or image files are allowed.' 
      }, { status: 400 });
    }

    // For audio, check allowed types
    if (isAudio) {
      const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac'];
      if (!allowedAudioTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: 'Only MP3, WAV, M4A, and AAC audio files are supported.' 
        }, { status: 400 });
      }
    }

    // For images, check allowed types
    if (isImage) {
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: 'Only JPEG, PNG, GIF, and WebP image files are supported.' 
        }, { status: 400 });
      }
    }

    console.log('=== UPLOAD DEBUG ===');
    console.log('File received:', file.name, 'Size:', file.size, 'bytes');
    console.log('Content-Type:', file.type);
    console.log('Folder:', folder);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Buffer created, size:', buffer.length, 'bytes');

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: folder,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Upload successful:', result);
            resolve(result);
          }
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    return NextResponse.json({
      success: true,
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
      resource_type: (result as any).resource_type,
      format: (result as any).format,
      duration: (result as any).duration,
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('413') || error.message.includes('Request Entity Too Large')) {
        return NextResponse.json({ 
          error: 'File too large for serverless function. Please try a smaller file or contact support.' 
        }, { status: 413 });
      }
      
      if (error.message.includes('timeout')) {
        return NextResponse.json({ 
          error: 'Upload timeout. Please try again with a smaller file.' 
        }, { status: 408 });
      }
    }

    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

