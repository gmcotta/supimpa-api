import { Router } from 'express';

import institutionsController from './controllers/InstitutionsController';

const routes = Router();

routes.post('/institutions', institutionsController.create);

export default routes;
