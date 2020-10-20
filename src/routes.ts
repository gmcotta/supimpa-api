import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import institutionsController from './controllers/InstitutionsController';
import adminUsersController from './controllers/AdminUsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/institutions', institutionsController.index);
routes.get('/institutions/:id', institutionsController.show);
routes.post(
  '/institutions',
  upload.array('images'),
  institutionsController.create,
);

routes.post('/admin/users', adminUsersController.create);

export default routes;
