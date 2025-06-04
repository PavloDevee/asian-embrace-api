const { uploadImageToSupabase } = require('../helpers/imageUploadHelper')

async function handleImageUpload (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided.' })
    }

    const uploadedImageData = await uploadImageToSupabase(req.file)

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully.',
      data: {
        imageUrl: uploadedImageData.publicUrl,
        fileName: uploadedImageData.fileName
      }
    })
  } catch (error) {
    console.error('Image upload controller error:', error.message)
    if (error.message.includes('Supabase client not initialized') || error.message.includes('Supabase bucket name not configured')) {
      return res.status(500).json({ success: false, message: 'Server configuration error for image uploads.' })
    }
    if (error.message.startsWith('Upload failed: Bucket named')) {
      return res.status(500).json({ success: false, message: error.message })
    }
    if (error.message === 'Failed to retrieve public URL for the uploaded image.') {
      return res.status(500).json({ success: false, message: 'Image uploaded but could not retrieve URL.' })
    }
    return res.status(500).json({ success: false, message: error.message || 'An unexpected error occurred during image upload.' })
  }
}

module.exports = {
  handleImageUpload
} 