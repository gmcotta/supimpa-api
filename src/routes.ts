import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import institutionsController from './controllers/InstitutionsController';
import adminUsersController from './controllers/AdminUsersController';
import sessionsController from './controllers/SessionsController';

const routes = Router();
const upload = multer(uploadConfig);

// Parte do aplicativo
routes.get('/institutions', institutionsController.index);
routes.get('/institutions/:id', institutionsController.show);
routes.post(
  '/institutions',
  upload.array('images'),
  institutionsController.create,
);

// Parte administrativa
routes.post('/admin/session', sessionsController.create);
routes.post('/admin/users', adminUsersController.create);

export default routes;
