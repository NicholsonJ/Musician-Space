require('dotenv').config();

const cloudinary = require('cloudinary');

// const uploadCloud = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// var storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'practiceRooms',
//   allowedFormats: ['jpg', 'png', 'jpeg'],
//   // filename: function(req, file, cb) {
//   //   cb(null, 'room');
//   // },
//   transformation: [
//     {
//       angle: 0
//     }
//   ]
// });

module.exports = cloudinary;
