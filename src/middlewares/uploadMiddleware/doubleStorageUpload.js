const multer = require('multer');
const path = require('path');
const { slugify } = require('transliteration');

const fileFilter = require('./utils/LocalfileFilter');

const doubleStorageUpload = ({
  entity,
  fileType = 'default',
  uploadFieldName1 = 'file',
  uploadFieldName2 = 'document',
  fieldName1 = 'file',
  fieldName2 = 'document',
}) => {
  var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `src/public/uploads/${entity}`);
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
        if (file.fieldname === uploadFieldName1) {
          req.upload1 = {
            fileName: _fileName,
            fieldExt: fileExtension,
            entity: entity,
            fieldName: fieldName1,
            fileType: fileType,
            filePath: filePath,
          };
          req.body[fieldName1] = filePath;
        } else if (file.fieldname === uploadFieldName2) {
          req.upload2 = {
            fileName: _fileName,
            fieldExt: fileExtension,
            entity: entity,
            fieldName: fieldName2,
            fileType: fileType,
            filePath: filePath,
          };
          req.body[fieldName2] = filePath;
        }

        cb(null, _fileName);
      } catch (error) {
        cb(error); // pass the error to the callback
      }
    },
  });

  let filterType = fileFilter(fileType);

  const multerStorage = multer({ storage: diskStorage, fileFilter: filterType }).fields([
    { name: uploadFieldName1, maxCount: 1 },
    { name: uploadFieldName2, maxCount: 1 },
  ]);

  return multerStorage;
};

module.exports = doubleStorageUpload;
