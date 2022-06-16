var multer = require('multer');
module.exports.files={
    storage:function(){
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'storage/app/public')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
      })
      
      return storage;
},
allowedFiles:function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpeg|png)$/)) {
        req.fileValidationError = 'Only jpeg|png file type are allowed!';
        return cb(new Error('Only jpeg|png file type  are allowed!'), false);
    }
    cb(null, true);
}
}