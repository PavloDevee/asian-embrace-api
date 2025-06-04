import { supabase } from '../setup/supabase.js'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME

if (!BUCKET_NAME) {
  console.error('Error: SUPABASE_BUCKET_NAME environment variable is not set.')
}

async function uploadImageToSupabase (file) {
  if (!supabase) {
    console.error('Supabase client is not initialized. Check environment variables SUPABASE_URL and SUPABASE_ANON_KEY.')
    throw new Error('Supabase client not initialized')
  }

  if (!BUCKET_NAME) {
    console.error('Supabase bucket name is not configured. Check environment variable SUPABASE_BUCKET_NAME.')
    throw new Error('Supabase bucket name not configured')
  }

  if (!file) {
    throw new Error('No file provided for upload')
  }

  const uniqueFileNameWithoutExtension = uuidv4()
  const uniqueFileName = `${uniqueFileNameWithoutExtension}.webp`
  let processedImageBuffer

  try {
    processedImageBuffer = await sharp(file.buffer)
      .webp({ quality: 80 })
      .toBuffer()
  } catch (conversionError) {
    console.error('Error converting image to WebP:', conversionError)
    throw new Error('Failed to convert image to WebP format.')
  }

  try {
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uniqueFileName, processedImageBuffer, {
        contentType: 'image/webp',
        upsert: false
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      const message = uploadError.message || 'Unknown Supabase upload error'
      if (message.includes('Bucket not found')) {
        throw new Error(`Upload failed: Bucket named "${BUCKET_NAME}" not found. Please ensure it exists and permissions are correct.`)
      }
      throw new Error(`Upload failed: ${message}`)
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uniqueFileName)

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.warn(`File ${uniqueFileName} uploaded but failed to get public URL. Manual check/cleanup might be needed.`)
      throw new Error('Failed to retrieve public URL for the uploaded image.')
    }

    return { publicUrl: publicUrlData.publicUrl, fileName: uniqueFileName }
  } catch (error) {
    console.error('Error during image upload process:', error)
    throw error
  }
}

export { uploadImageToSupabase } 