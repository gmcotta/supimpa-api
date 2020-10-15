import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import institutionsController from './controllers/InstitutionsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/institutions', institutionsController.index);
routes.get('/institutions/:id', institutionsController.show);
routes.post(
  '/institutions',
  upload.array('images'),
  institutionsController.create,
);

export default routes;
