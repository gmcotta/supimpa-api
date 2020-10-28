import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

import AdminUser from '../models/AdminUser';
import UserToken from '../models/UserToken';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const { confirm_password, token } = request.body;
    let { password } = request.body;
    console.log(password, confirm_password, token);

    const schema = Yup.object().shape({
      password: Yup.string()
        .min(6, 'Senha precisa ter pelo menos 6 caracteres')
        .required('Senha obrigatória'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não batem')
        .required('Obrigatório confirmar senha'),
    });

    await schema.validate(
      { password, confirm_password },
      { abortEarly: false },
    );

    const userTokenRepository = getRepository(UserToken);
    const findToken = await userTokenRepository.findOneOrFail({
      where: { token },
    });
    if (!findToken) {
      return response.status(400).json({ error: 'Invalid token' });
    }

    const adminUserRepository = getRepository(AdminUser);
    const adminUser = await adminUserRepository.findOneOrFail(
      findToken.user_id,
    );
    if (!adminUser) {
      return response.status(400).json({ error: 'User not found' });
    }

    const checkPassword = await bcrypt.compare(password, adminUser.password);
    if (checkPassword) {
      return response
        .status(401)
        .json({ error: "You can't reset password with old password" });
    }

    password = await bcrypt.hash(password, 8);

    const data = { ...adminUser, password };

    await adminUserRepository.save(data);

    return response.status(204).json({ ok: true });
  },
};
