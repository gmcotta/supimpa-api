import { Router } from 'express';

import institutionsController from './controllers/InstitutionsController';

const routes = Router();

routes.get('/institutions', institutionsController.index);
routes.get('/institutions/:id', institutionsController.show);
routes.post('/institutions', institutionsController.create);

export default routes;
