const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { slugify } = require('transliteration');

const fileFilter = require('./utils/LocalfileFilter');

const singleStorageUpload = ({
  entity,
  fileType = 'default',
  uploadFieldName = 'file',
  fieldName = 'file',
}) => {
  var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(`[    ] Destination function called. Entity: ${entity}, File: ${file.originalname}`);
      const dir = `src/public/uploads/${entity}`;
      console.log(`[LocalSingleStorage] Target directory: ${dir}`);
      try {
        if (!fs.existsSync(dir)) {
          console.log(`[LocalSingleStorage] Directory ${dir} does not exist. Attempting to create.`);
          fs.mkdirSync(dir, { recursive: true });
          console.log(`[LocalSingleStorage] Successfully created directory: ${dir}`);
        } else {
          console.log(`[LocalSingleStorage] Directory ${dir} already exists.`);
        }
        cb(null, dir);
      } catch (err) {
        console.error(`[LocalSingleStorage] Error creating directory ${dir}. Error:`, err);
        console.error(`[LocalSingleStorage] Error stack:`, err.stack);
        cb(err); // Pass the error to multer
      }
    },
    filename: function (req, file, cb) {
      try {
        // fetching the file extension of the uploaded file
        let fileExtension = path.extname(file.originalname);
        let uniqueFileID = Math.random().toString(36).slice(2, 7); // generates unique ID of length 5

        let originalname = '';
        if (req.body.seotitle) {
          originalname = slugify(req.body.seotitle.toLocaleLowerCase()); // convert any language to English characters
        } else {
          originalname = slugify(file.originalname.split('.')[0].toLocaleLowerCase()); // convert any language to English characters
        }

        let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;

        const filePath = `uploads/${entity}/${_fileName}`; // Видалив префікс "public/"
        // saving file name and extension in request upload object
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
        console.error('[LocalSingleStorage] Error in filename function:', error); // Added logging for filename errors
        cb(error); // pass the error to the callback
      }
    },
  });

  let filterType = fileFilter(fileType);

  const multerStorage = multer({ storage: diskStorage, fileFilter: filterType }).single(uploadFieldName); // Use uploadFieldName here
  return multerStorage;
};

module.exports = singleStorageUpload;
