import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

import AdminUser from '../models/AdminUser';
import adminUserView from '../views/AdminUsersView';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    let { password } = request.body;

    const data = {
      name,
      email,
      password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    await schema.validate(data, { abortEarly: false });

    const adminUserRepository = getRepository(AdminUser);

    const emailExists = await adminUserRepository.findOne({ where: { email } });
    if (emailExists) {
      return response.status(401).json({ error: 'E-mail already registered' });
    }

    password = await bcrypt.hash(password, 8);

    const adminUser = adminUserRepository.create({ name, email, password });
    await adminUserRepository.save(adminUser);

    return response.status(201).json(adminUser);
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    if (!id) {
      return response.status(400).json({ error: 'User not logged in' });
    }

    const adminUserRepository = getRepository(AdminUser);

    const adminUser = await adminUserRepository.findOneOrFail(id);

    return response.json(adminUserView.render(adminUser));
  },
};
