import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  // Confirm API route is being hit
  console.log('UPLOAD API ROUTE CALLED');
  
  // Debug environment variables
  console.log('R2_ACCOUNT_ID:', process.env.R2_ACCOUNT_ID ? 'Set' : 'Missing');
  console.log('R2_ACCESS_KEY_ID:', process.env.R2_ACCESS_KEY_ID ? 'Set' : 'Missing');
  console.log('R2_SECRET_ACCESS_KEY:', process.env.R2_SECRET_ACCESS_KEY ? 'Set' : 'Missing');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'church-uploads';

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const key = `${folder}/${Date.now()}_${file.name}`;
    const contentType = file.type;

    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
      folder,
      key,
      contentType
    });

    await s3.send(
      new PutObjectCommand({
        Bucket: 'churchsermons',
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    // Assuming you have a Worker set up to serve public files
    const publicUrl = `https://church-r2-worker.churchedappally.workers.dev/${key}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key,
      resource_type: isAudio ? 'audio' : isImage ? 'image' : 'other',
      format: file.type.split('/')[1],
    });
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

