import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err, '');
        return cb(null, `${res.toString('hex')}-${file.originalname}`);
      });
    },
  }),
};
