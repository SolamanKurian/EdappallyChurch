// Cloudinary direct upload config
const CLOUDINARY_CLOUD_NAME = 'dhljtmmgy'; // your cloud name
const CLOUDINARY_UNSIGNED_PRESET = 'unsigned-audio'; // <-- set your unsigned preset name here

/**
 * Uploads a file to Cloudinary.
 * - Audio files: uploaded directly from client using unsigned preset (bypasses Vercel limits)
 * - Images: uploaded via API route (for validation, folder logic, etc.)
 * @param file File to upload
 * @param folder Cloudinary folder (e.g. 'sermons/audio', 'books/covers')
 */
export const uploadToCloudinary = async (
  file: File,
  folder: string = 'church-uploads'
): Promise<{ url: string; public_id: string; resource_type: string }> => {
  // Direct upload for audio files
  if (file.type.startsWith('audio/')) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UNSIGNED_PRESET);
    formData.append('folder', folder);
    // Optionally: formData.append('resource_type', 'video');
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        let errorMessage = 'Direct Cloudinary upload failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }
      const result = await response.json();
      return {
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
      };
    } catch (error) {
      console.error('Direct Cloudinary upload error:', error);
      throw error;
    }
  }
  // Images and other files: use API route
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  try {
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
      public_id: result.public_id,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}; 