const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        cb(null, 'uploads/'); // Make sure you create an 'uploads' folder in your root directory
    },
    filename: (req, file, cb) => {
        // Set the filename of the uploaded image (original name + extension)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5 MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // Accept only image files (JPEG, JPG, PNG)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true); // Accept file
        } else {
            cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
        }
    }
}).single('image'); // 'image' is the field name in the form

module.exports = upload;
