import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function GET() {
  try {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log('=== TEST CLOUDINARY ===');
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');

    // Test the configuration by getting account info
    const result = await new Promise((resolve, reject) => {
      cloudinary.api.ping((error, result) => {
        if (error) {
          console.error('Cloudinary test error:', error);
          reject(error);
        } else {
          console.log('Cloudinary test success:', result);
          resolve(result);
        }
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Cloudinary credentials are working!',
      result
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Check your Cloudinary credentials in .env file'
    }, { status: 500 });
  }
} 