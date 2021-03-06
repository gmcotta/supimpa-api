import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { v4 } from 'uuid';

import Mail from '../lib/Mail';

import AdminUser from '../models/AdminUser';
import UserToken from '../models/UserToken';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });
    await schema.validate({ email }, { abortEarly: false });

    const adminUserRepository = getRepository(AdminUser);
    const adminUser = await adminUserRepository.findOne({ where: { email } });

    if (!adminUser) {
      return response.status(400).json({ error: 'User not found' });
    }

    const { id, name, email: userEmail } = adminUser;

    const userTokenRepository = getRepository(UserToken);
    const token = v4();
    const userToken = userTokenRepository.create({ token, user_id: id });
    await userTokenRepository.save(userToken);

    await Mail.sendMail({
      to: {
        name,
        address: userEmail,
      },
      subject: 'Esqueci minha senha',
      html: `<p>Faça a redefinição de senha a partir <a href="${process.env.APP_WEB_URL}/admin/reset-password/${token}">desse link.</a>`,
    });

    return response.json(userToken);
  },
};
