import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { TokenPayload } from '../../shared/modules/auth/index.js';

function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('sub' in payload && typeof payload.sub === 'string')
  );
}


export class ParseTokenMiddleware implements Middleware {
  constructor(
    private readonly jwtSecret: string
  ) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req?.headers.authorization?.split(' ');

    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      } else {
        throw new Error('Bad token');
      }
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthentiacateMiddleware'
      ));
    }
  }
}
