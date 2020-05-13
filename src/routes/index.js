const multer = require('multer');
/**
 * 
 * @param {*} app exprss app
 * @param {*} storage Grid fs storage object
 * @param {*} gfs gfs Stream 
 */
const routes = (app, storage, gfs) => {
    const upload = multer({ storage });
    const multerConfig = upload.array('documents');
    /**
     * Api to upload data as form data with key "documents".
     * Form data key can be changed as per the requirement.
     */
    app.post('/fileupload', multerConfig, async (req, res) => {
        res.status(200).json({
            status: true,
            message: 'File uploaded'
        })
    });
    /**
     * Api to get file data.
     * Note : exact name should be provided to retrive file data.(Case sensitive)
     */
    app.get('/getFile/:filename', (req, res) => {
        gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'No file is present'
                });
            }
            const readstream = gfs.createReadStream({
                filename: files[0].filename,
            });
            res.set('Content-Type', files[0].contentType)
            return readstream.pipe(res);
        });
    });
}

module.exports = routes;