// Client-side direct upload to Cloudinary
// This bypasses Vercel's serverless function size limits

export const uploadDirectToCloudinary = async (
  file: File, 
  folder: string = 'church-uploads'
): Promise<{ url: string; public_id: string; resource_type: string }> => {
  
  console.log('=== DIRECT CLOUDINARY UPLOAD ===');
  console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
  console.log('Folder:', folder);

  try {
    // Create form data for direct Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Try different upload preset names that might exist
    const uploadPreset = 'church_uploads'; // Try this preset name
    formData.append('upload_preset', uploadPreset);
    
    // Add folder parameter
    if (folder) {
      formData.append('folder', folder);
    }

    console.log('Using upload preset:', uploadPreset);

    // Upload directly to Cloudinary from browser
    const response = await fetch('https://api.cloudinary.com/v1_1/dhljtmmgy/auto/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('Cloudinary response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Cloudinary error:', errorData);
      
      // If upload preset not found, try without preset
      if (errorData.error?.message?.includes('upload preset')) {
        console.log('Upload preset not found, trying without preset...');
        return uploadWithoutPreset(file, folder);
      }
      
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const result = await response.json();
    console.log('Cloudinary upload successful:', result);

    return {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error('Direct upload error:', error);
    throw error;
  }
};

// Fallback method without upload preset
const uploadWithoutPreset = async (
  file: File, 
  folder: string
): Promise<{ url: string; public_id: string; resource_type: string }> => {
  
  console.log('=== FALLBACK UPLOAD WITHOUT PRESET ===');
  
  try {
    // Use the API route as fallback for smaller files
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('API fallback response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    console.log('API fallback upload successful:', result);

    return {
      url: result.url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error('Fallback upload error:', error);
    throw new Error('Upload failed. Please try a smaller file or contact support.');
  }
}; 