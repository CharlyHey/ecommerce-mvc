import multer from 'multer';
import path from 'path';

// Configuración almacenamiento
const storage = multer.diskStorage({

  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },

  filename(req, file, cb) {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

// Validar imágenes
const fileFilter = (req, file, cb) => {

  const tiposPermitidos = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp'
  ];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de imagen no válido'));
  }
};

export const upload = multer({
  storage,
  fileFilter
});