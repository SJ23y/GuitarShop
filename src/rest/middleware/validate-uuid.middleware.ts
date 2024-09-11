import { Request, Response, NextFunction } from 'express';
import { Middleware, HttpError } from '../index.js';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export class ValidateUUIDMiddleware implements Middleware {
  constructor(
    private readonly param: string
  ) {}

  execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.UUID.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${this.param} is not valid UUID`,
      'ValidateUUIDMiddleware'
    );
  }
}
