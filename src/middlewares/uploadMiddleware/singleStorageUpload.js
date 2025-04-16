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
      cb(null, `src/public/uploads/${entity}`);
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
        cb(error);
      }
    },
  });

  const multerStorage = multer({
    storage: diskStorage,
    fileFilter: fileFilter(fileType),
  }).single(uploadFieldName);

  return async (req, res, next) => {
    multerStorage(req, res, async (err) => {
      if (err) return next(err);

      if (req.file && req.file.mimetype.startsWith('image/')) {
        const fileSizeInMB = fs.statSync(req.file.path).size / (1024 * 1024); // File size in MB

        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
          // Compress file if it exceeds 2 MB
          const outputFilePath = path.join(
            'src/public',
            req.upload.filePath.replace('public/', '')
          );

          try {
            let quality = INITIAL_QUALITY;
            let compressedBuffer;
            let compressedFileSize;

            do {
              compressedBuffer = await sharp(req.file.path)
                .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
                .toFormat('jpeg')
                .jpeg({ quality })
                .toBuffer();

              compressedFileSize = compressedBuffer.length / (1024 * 1024); // Size in MB
              quality -= 10; // Decrease quality for the next iteration if needed
            } while (compressedFileSize > MAX_FILE_SIZE_MB && quality >= MIN_QUALITY);

            // Save the final compressed image to disk
            await sharp(compressedBuffer).toFile(outputFilePath);

            // Update req.file path to the compressed image path
            req.file.path = outputFilePath;
          } catch (compressionError) {
            return next(compressionError);
          }
        }
        next();
      } else {
        next();
      }
    });
  };
};

module.exports = singleStorageUpload;


