// For large files, use uploadDirectToR2 in clientUpload.ts for direct browser-to-R2 uploads via Worker.
// This file is for server-side or fallback uploads only.
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file to Cloudflare R2 via the API route.
 * @param file File to upload
 * @param folder Folder path in the bucket (e.g. 'sermons/audio', 'books/covers')
 * @returns { url: string; key: string; resource_type: string }
 */
export const uploadToR2 = async (
  file: File,
  folder: string = 'church-uploads'
): Promise<{ url: string; key: string; resource_type: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Upload failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.details || 'Upload failed';
    } catch {}
    throw new Error(errorMessage);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Upload failed');
  }
  return {
    url: result.url,
    key: result.key,
    resource_type: result.resource_type,
  };
}; 