import express from 'express';
import { getRepository } from 'typeorm';

import Institution from './models/Institution';

import './database/connection';

const app = express();
app.use(express.json());

app.post('/institutions', async (request, response) => {
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

  return response.json(institution);
});

app.listen(3333);
