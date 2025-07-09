export const uploadToCloudinary = async (file: File, folder: string = 'church-uploads'): Promise<{ url: string; public_id: string; resource_type: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Upload failed');
  }

  const result = await response.json();
  return {
    url: result.url,
    public_id: result.public_id,
    resource_type: result.resource_type,
  };
}; 