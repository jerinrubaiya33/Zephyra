import multer from "multer";

// const storage = multer.diskStorage({
//     filename:function(req, file,callback){
//         callback(null, file.originalname)
//     }
// })
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

//upload middleware
const upload = multer({storage})

export default upload