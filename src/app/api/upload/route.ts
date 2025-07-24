import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://76d883acb944eccd58a9ad3d23adb293.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:'741a2e0a30dda53fba11430e0a8435ea',
    secretAccessKey: '86cc881714d3af7811c0c0ab0c64948620cfc995e605f020b2bdce472c54abaf'
  },
});

export async function POST(request: NextRequest) {
  // Confirm API route is being hit
  console.log('UPLOAD API ROUTE CALLED');
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
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

