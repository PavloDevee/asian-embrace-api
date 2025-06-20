const multer = require('multer');
const path = require('path');
const { slugify } = require('transliteration');

const fileFilter = require('./utils/LocalfileFilter');

const fourStorageUpload = ({
    entity,
    fileType = 'default',
    uploadFieldName1 = 'images',  // Multiple images
    uploadFieldName2 = 'video',   // Single video
    fieldName1 = 'images',
    fieldName2 = 'video',
}) => {
    var diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `src/public/uploads/${entity}`);
        },
        filename: function (req, file, cb) {
            try {
                let fileExtension = path.extname(file.originalname);
                let uniqueFileID = Math.random().toString(36).slice(2, 7);
                
                let originalname = req.body.seotitle 
                    ? slugify(req.body.seotitle.toLowerCase()) 
                    : slugify(file.originalname.split('.')[0].toLowerCase());
                
                let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;
                let filePath = `uploads/${entity}/${_fileName}`; // Видалив префікс "public/"

                if (!req.body[fieldName1]) req.body[fieldName1] = []; // Initialize array for images

                if (file.fieldname === uploadFieldName1) {
                    req.body[fieldName1].push(filePath);  // Store multiple image paths
                } else if (file.fieldname === uploadFieldName2) {
                    req.body[fieldName2] = filePath;  // Store a single video path
                }

                cb(null, _fileName);
            } catch (error) {
                cb(error);
            }
        },
    });

    let filterType = fileFilter(fileType);

    const multerStorage = multer({ storage: diskStorage, fileFilter: filterType }).fields([
        { name: uploadFieldName1, maxCount: 5 }, // Allows up to 5 images
        { name: uploadFieldName2, maxCount: 1 }, // Allows only 1 video
    ]);

    return multerStorage;
};

module.exports = fourStorageUpload;
