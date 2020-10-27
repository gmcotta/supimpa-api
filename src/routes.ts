import { Router } from 'express';
import multer from 'multer';

import institutionsController from './controllers/InstitutionsController';
import adminUsersController from './controllers/AdminUsersController';
import sessionsController from './controllers/SessionsController';
import forgotPasswordController from './controllers/ForgotPasswordController';

import authMiddleware from './middlewares/auth';

import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

// App routes
routes.get('/institutions', institutionsController.index);
routes.get('/institutions/:id', institutionsController.show);
routes.post(
  '/institutions',
  upload.array('images'),
  institutionsController.create,
);

// Admin routes
routes.post('/admin/session', sessionsController.create);
routes.post('/admin/forgot-password', forgotPasswordController.store);

// Admin private routes
routes.use(authMiddleware);
routes.post('/admin/users', adminUsersController.create);
routes.get('/admin/users', adminUsersController.show);
routes.put(
  '/admin/institutions/edit/:id',
  upload.array('images'),
  institutionsController.update,
);
routes.delete('/admin/institutions/delete/:id', institutionsController.delete);

export default routes;
