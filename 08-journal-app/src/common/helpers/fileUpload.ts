export const fileUpload = async (file: File): Promise<string> => {
  if (!file) return '';

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/ddpckcx4p/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const response = await fetch(cloudinaryUrl, { method: 'POST', body: formData });

    if (!response.ok) throw new Error('No se pudo subir imagen al servidor');

    const cloudinaryResponse = await response.json();
    return cloudinaryResponse.secure_url;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
