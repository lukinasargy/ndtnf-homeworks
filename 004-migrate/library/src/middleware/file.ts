import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "fileCover") {
      cb(null, 'public/cover');
      return;
    }
    cb(null, 'public/book')
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}_filename_${file.originalname}`)
  }
});

const allowedTypes = ['application/pdf', 'text/plain', 'image/png', 'image/jpg', 'image/jpeg' ];

const fileFilter = (req:any, file:any, cb:any) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

export const fileMiddleware = multer({
  storage, fileFilter
});