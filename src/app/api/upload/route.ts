import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
  // ✅ TEMPORARY: Hardcode credentials for testing
  cloudinary.config({
    cloud_name: 'dhljtmmgy',
    api_key: '535484336416449',
    api_secret: '2yAVjGq1WiNhpSGZo_7yhMa1jmg',
  });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'church-uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('=== UPLOAD DEBUG ===');
    console.log('File received:', file.name, 'Size:', file.size);
    console.log('Buffer created, size:', buffer.length);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          // Remove folder parameter to fix signature issue
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
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
