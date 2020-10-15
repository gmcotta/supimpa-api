import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Institution from '../models/Institution';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const institutionRepository = getRepository(Institution);

    const institutions = await institutionRepository.find();

    return response.json(institutions);
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const institutionRepository = getRepository(Institution);

    const institutions = await institutionRepository.findOneOrFail(id);

    return response.json(institutions);
  },

  async create(request: Request, response: Response): Promise<Response> {
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

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

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
      images,
    });
    await institutionRepository.save(institution);

    return response.status(201).json(institution);
  },
};
