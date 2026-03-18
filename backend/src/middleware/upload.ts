import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'careerhub',
      format: file.mimetype === 'application/pdf' ? 'pdf' : 'jpg',
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
