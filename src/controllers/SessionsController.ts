import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

import AdminUser from '../models/AdminUser';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const data = { email, password };

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    await schema.validate(data, { abortEarly: false });

    const adminUserRepository = getRepository(AdminUser);

    const adminUser = await adminUserRepository.findOne({ where: { email } });
    if (!adminUser) {
      return response.status(401).json({ error: 'User not found' });
    }

    const checkPassword = await bcrypt.compare(password, adminUser.password);
    if (!checkPassword) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = adminUser;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.json({ user: { id, name, email }, token });
  },
};
