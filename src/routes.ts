import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Institution from './models/Institution';

const routes = Router();

routes.post('/institutions', async (request: Request, response: Response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    retirement_or_center,
    phone,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const institutionRepository = getRepository(Institution);

  const institution = institutionRepository.create({
    name,
    latitude,
    longitude,
    about,
    retirement_or_center,
    phone,
    instructions,
    opening_hours,
    open_on_weekends,
  });
  await institutionRepository.save(institution);

  return response.status(201).json(institution);
});

export default routes;
