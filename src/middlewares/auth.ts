import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

type TokenPayload = {
  id: number;
  iat: number;
  exp: number;
};

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    const { id } = decoded as TokenPayload;

    request.user = { id };

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Invalid JWT Token' });
  }
};

export default authMiddleware;
