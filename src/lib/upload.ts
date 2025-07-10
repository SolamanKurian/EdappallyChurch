export const uploadToCloudinary = async (file: File, folder: string = 'church-uploads'): Promise<{ url: string; public_id: string; resource_type: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  console.log('=== UPLOAD UTILITY DEBUG ===');
  console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
  console.log('Folder:', folder);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorMessage = 'Upload failed';
      
      try {
        const errorData = await response.json();
        console.log('Error response data:', errorData);
        errorMessage = errorData.error || errorData.details || 'Upload failed';
      } catch (parseError) {
        console.log('Failed to parse error response as JSON');
        // If response is not JSON (like HTML error page), use status text
        errorMessage = response.statusText || `Upload failed (${response.status})`;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Success response data:', result);
    
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
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('413') || error.message.includes('too large')) {
        throw new Error('File too large. Please use a smaller file (max 25MB).');
      }
      if (error.message.includes('timeout')) {
        throw new Error('Upload timeout. Please try again.');
      }
      if (error.message.includes('Request En')) {
        throw new Error('Upload failed. Please try again with a smaller file.');
      }
    }
    
    throw error;
  }
}; 