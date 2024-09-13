import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Middleware } from './middleware.interface.js';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ValidationError } from '../errors/validation-error.js';
import { reduceValidationErrors } from '../../shared/helpers/common.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor(
    private dto: ClassConstructor<object>
  ) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, req.body);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      return next(new ValidationError(`Validation error ${req.path}`, reduceValidationErrors(errors)));
    } else {
      req.body = dtoInstance;
      return next();
    }
  }
}
