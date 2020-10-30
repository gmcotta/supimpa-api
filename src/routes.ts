import { Router } from 'express';
import multer from 'multer';

import institutionsController from './controllers/InstitutionsController';
import adminUsersController from './controllers/AdminUsersController';
import sessionsController from './controllers/SessionsController';
import forgotPasswordController from './controllers/ForgotPasswordController';
import resetPasswordController from './controllers/ResetPasswordController';

import authMiddleware from './middlewares/auth';

import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

// App routes
routes.get('/', (request, response) => response.json({ ok: true }));
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
routes.post('/admin/reset-password', resetPasswordController.store);

routes.post('/admin/users', adminUsersController.create);
// Admin private routes
// routes.use(authMiddleware);
routes.get('/admin/users', authMiddleware, adminUsersController.show);
routes.put(
  '/admin/institutions/edit/:id',
  upload.array('images'),
  authMiddleware,
  institutionsController.update,
);
routes.delete(
  '/admin/institutions/delete/:id',
  authMiddleware,
  institutionsController.delete,
);

export default routes;
