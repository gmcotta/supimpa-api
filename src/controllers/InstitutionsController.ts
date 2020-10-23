import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Institution from '../models/Institution';
import Image from '../models/Image';
import InstitutionView from '../views/InstitutionsView';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const { accepted } = request.query;
    const institutionRepository = getRepository(Institution);

    if (accepted === 'true') {
      const institutions = await institutionRepository.find({
        relations: ['images'],
        where: {
          accepted: true,
        },
      });
      return response.json(InstitutionView.renderMany(institutions));
    }

    if (accepted === 'false') {
      const institutions = await institutionRepository.find({
        relations: ['images'],
        where: {
          accepted: false,
        },
      });
      return response.json(InstitutionView.renderMany(institutions));
    }

    const institutions = await institutionRepository.find({
      relations: ['images'],
    });
    return response.json(InstitutionView.renderMany(institutions));
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const institutionRepository = getRepository(Institution);

    const institution = await institutionRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(InstitutionView.render(institution));
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

    const data = {
      name,
      latitude,
      longitude,
      about,
      retirement_or_center,
      phone,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
      accepted: false,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      retirement_or_center: Yup.string().required(),
      phone: Yup.string().required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const institutionRepository = getRepository(Institution);

    const institution = institutionRepository.create(data);
    await institutionRepository.save(institution);

    return response.status(201).json(institution);
  },

  async update(request: Request, response: Response): Promise<Response> {
    console.log('começo do update');
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

    const { id } = request.params;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      retirement_or_center,
      phone,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      id: Number(id),
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      retirement_or_center: Yup.string().required(),
      phone: Yup.string().required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
    });

    const imageSchema = Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
      }),
    );

    await schema.validate(data, {
      abortEarly: false,
    });

    await imageSchema.validate(images, {
      abortEarly: false,
    });

    const institutionRepository = getRepository(Institution);
    const imageRepository = getRepository(Image);

    const institution = await institutionRepository.findOneOrFail(id);
    if (!institution) {
      return response.status(401).json({ error: 'Institution not found' });
    }

    const imagesToRemove = await imageRepository.find({
      where: { institution: { id } },
    });

    if (!imagesToRemove) {
      return response.status(401).json({ error: 'Images not found' });
    }

    await imageRepository.remove(imagesToRemove);
    images.forEach(async image => {
      const newImage = imageRepository.create({
        path: image.path,
        institution,
      });
      await imageRepository.save(newImage);
    });

    await institutionRepository.save(data);

    return response.json(data);
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const institutionRepository = getRepository(Institution);

    const institution = await institutionRepository.findOneOrFail(id);
    if (!institution) {
      return response.status(401).json({ error: 'Institution not found' });
    }

    await institutionRepository.remove(institution);

    return response.json({
      message: `Institution ${institution.name} deleted`,
    });
  },
};
