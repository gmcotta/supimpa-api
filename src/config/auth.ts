import { Secret } from 'jsonwebtoken';

type JWTSecret = {
  secret: Secret;
  expiresIn: string;
};

const jwtSecret: JWTSecret = {
  secret: process.env.JWT_SECRET as Secret,
  expiresIn: '7d',
};

export default jwtSecret;
