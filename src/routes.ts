import { Router } from 'express';
import multer from 'multer';

import institutionsController from './controllers/InstitutionsController';
import adminUsersController from './controllers/AdminUsersController';
import sessionsController from './controllers/SessionsController';

import authMiddleware from './middlewares/auth';

import uploadConfig from './config/upload';

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
// Precisa estar autenticado para entrar
routes.use(authMiddleware);
routes.post('/admin/users', adminUsersController.create);
routes.get('/admin/users', (request, response) => {
  const { id } = request.user;
  return response.json({ id });
});

export default routes;
