const multer = require('multer');
const path = require('path');
const { slugify } = require('transliteration');

const fileFilter = require('./utils/LocalfileFilter');

const fourStorageUpload = ({
    entity,
    fileType = 'default',
    uploadFieldName1 = 'image1',
    uploadFieldName2 = 'image2',
    uploadFieldName3 = 'image3',
    uploadFieldName4 = 'video',
    fieldName1 = 'image1',
    fieldName2 = 'image2',
    fieldName3 = 'image3',
    fieldName4 = 'video',
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
                // if (fileExtension == '.mov' || fileExtension == '.MOV' || fileExtension == 'mov') {
                //     fileExtension = '.mp4';
                // }
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
                } else if (file.fieldname === uploadFieldName3) {
                    req.upload3 = {
                        fileName: _fileName,
                        fieldExt: fileExtension,
                        entity: entity,
                        fieldName: fieldName3,
                        fileType: fileType,
                        filePath: filePath,
                    };
                    req.body[fieldName3] = filePath;
                } else if (file.fieldname === uploadFieldName4) {
                    req.upload4 = {
                        fileName: _fileName,
                        fieldExt: fileExtension,
                        entity: entity,
                        fieldName: fieldName4,
                        fileType: fileType,
                        filePath: filePath,
                    };
                    req.body[fieldName4] = filePath;
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
        { name: uploadFieldName3, maxCount: 1 },
        { name: uploadFieldName4, maxCount: 1 },
    ]);

    return multerStorage;
};

module.exports = fourStorageUpload;
