const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const { slugify } = require('transliteration');

const fileFilter = require('./utils/LocalfileFilter');

const MAX_FILE_SIZE_MB = 2;
const INITIAL_QUALITY = 90; // Start compression quality at 90%
const MIN_QUALITY = 30; // Minimum compression quality allowed to reach the size limit

const singleStorageUpload = ({
  entity,
  fileType = 'default',
  uploadFieldName = 'file',
  fieldName = 'file',
}) => {
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(`[singleStorageUpload] Destination function called. Entity: ${entity}, File: ${file.originalname}`);
      const dir = `src/public/uploads/${entity}`;
      console.log(`[singleStorageUpload] Target directory: ${dir}`);
      try {
        if (!fs.existsSync(dir)) {
          console.log(`[singleStorageUpload] Directory ${dir} does not exist. Attempting to create.`);
          fs.mkdirSync(dir, { recursive: true });
          console.log(`[singleStorageUpload] Successfully created directory: ${dir}`);
        } else {
          console.log(`[singleStorageUpload] Directory ${dir} already exists.`);
        }
        cb(null, dir);
      } catch (err) {
        console.error(`[singleStorageUpload] Error creating directory ${dir}. Error:`, err);
        console.error(`[singleStorageUpload] Error stack:`, err.stack);
        cb(err); // Pass the error to multer, halting the process
      }
    },
    filename: function (req, file, cb) {
      try {
        let fileExtension = path.extname(file.originalname);
        let uniqueFileID = Math.random().toString(36).slice(2, 7);

        let originalname = req.body.seotitle
          ? slugify(req.body.seotitle.toLocaleLowerCase())
          : slugify(file.originalname.split('.')[0].toLocaleLowerCase());

        let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;
        const filePath = `public/uploads/${entity}/${_fileName}`;

        req.upload = {
          fileName: _fileName,
          fieldExt: fileExtension,
          entity: entity,
          fieldName: fieldName,
          fileType: fileType,
          filePath: filePath,
        };

        req.body[fieldName] = filePath;

        cb(null, _fileName);
      } catch (error) {
        console.error('[singleStorageUpload] Error in filename function:', error);
        cb(error);
      }
    },
  });

  const multerStorage = multer({
    storage: diskStorage,
    fileFilter: fileFilter(fileType),
    // limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 } // Basic size limit before compression attempt if desired
  }).single(uploadFieldName);

  return async (req, res, next) => {
    multerStorage(req, res, async (err) => {
      if (err) {
        // Handle multer errors (e.g., file size limit from multer.limits if set, or cb(err) from destination/filename)
        console.error('[singleStorageUpload] Multer error:', err);
        return next(err);
      }

      if (!req.file) {
        // No file was uploaded, or it was filtered out. Pass control.
        return next();
      }

      // Proceed with compression only if it's an image
      if (req.file.mimetype.startsWith('image/')) {
        const originalFilePath = req.file.path;
        // Use a new path for the compressed file to avoid conflicts, possibly with a suffix or in a temp location first
        // For simplicity, we'll overwrite, but be cautious with this in production if original is needed.
        const outputFilePath = originalFilePath; // Assuming req.upload.filePath is already correctly set by filename function
                                             // and points to where the final file should be.

        // console.log(`[singleStorageUpload] Original file size for ${req.file.originalname}: ${(fs.statSync(originalFilePath).size / (1024 * 1024)).toFixed(2)} MB`);

        try {
            let quality = INITIAL_QUALITY;
            let inputBuffer = fs.readFileSync(originalFilePath);
            let compressedBuffer = inputBuffer;
            let currentFileSizeMB = inputBuffer.length / (1024 * 1024);

            if (currentFileSizeMB > MAX_FILE_SIZE_MB) {
                console.log(`[singleStorageUpload] Image ${req.file.originalname} (${currentFileSizeMB.toFixed(2)}MB) exceeds ${MAX_FILE_SIZE_MB}MB. Attempting compression.`);
                let sharpInstance = sharp(inputBuffer)
                                    .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true });
                
                // Determine format for sharp based on original extension, fallback to jpeg
                const fileExt = path.extname(req.file.originalname).toLowerCase();
                if (fileExt === '.png') {
                    sharpInstance = sharpInstance.png({ quality }); // Use png specific options if any
                } else if (fileExt === '.webp') {
                    sharpInstance = sharpInstance.webp({ quality });
                } else {
                    sharpInstance = sharpInstance.jpeg({ quality }); // Default to jpeg
                }

                compressedBuffer = await sharpInstance.toBuffer();
                currentFileSizeMB = compressedBuffer.length / (1024 * 1024);

                // Iteratively reduce quality if still too large
                while (currentFileSizeMB > MAX_FILE_SIZE_MB && quality > MIN_QUALITY) {
                    quality -= 10;
                    console.log(`[singleStorageUpload] Still too large (${currentFileSizeMB.toFixed(2)}MB). Reducing quality to ${quality}%.`);
                    if (fileExt === '.png') {
                        sharpInstance = sharp(inputBuffer).resize(1024, 1024, { fit: 'inside', withoutEnlargement: true }).png({ quality });
                    } else if (fileExt === '.webp') {
                        sharpInstance = sharp(inputBuffer).resize(1024, 1024, { fit: 'inside', withoutEnlargement: true }).webp({ quality });
                    } else {
                        sharpInstance = sharp(inputBuffer).resize(1024, 1024, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality });
                    }
                    compressedBuffer = await sharpInstance.toBuffer();
                    currentFileSizeMB = compressedBuffer.length / (1024 * 1024);
                }

                if (currentFileSizeMB > MAX_FILE_SIZE_MB) {
                    console.warn(`[singleStorageUpload] Image ${req.file.originalname} could not be compressed below ${MAX_FILE_SIZE_MB}MB even at lowest quality ${MIN_QUALITY}%. Final size: ${currentFileSizeMB.toFixed(2)}MB`);
                    // Decide how to handle this: reject, save as is, or save oversized compressed version.
                    // For now, we'll save the last compressed version.
                }
                
                fs.writeFileSync(outputFilePath, compressedBuffer); // Overwrite original upload with compressed version
                console.log(`[singleStorageUpload] Compressed image ${req.file.originalname} saved. New size: ${currentFileSizeMB.toFixed(2)}MB`);
                // req.file.path and req.upload.filePath should already point to this outputFilePath if naming is consistent
                // req.file.size might need update if subsequent middleware use it: fs.statSync(outputFilePath).size;
            }
            next(); 
        } catch (compressionError) {
            console.error('[singleStorageUpload] Error during image compression:', compressionError);
            // Decide if you want to delete the originally uploaded (uncompressed) file if compression fails
            // fs.unlinkSync(originalFilePath).catch(e => console.error("Failed to cleanup original file after compression error", e));
            return next(compressionError); // Pass compression error to error handler
        }
      } else {
        // Not an image file, or no file, just proceed
        next();
      }
    });
  };
};

module.exports = singleStorageUpload;


