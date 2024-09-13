import { Controller, Route } from '../index.js';
import { Response, Router } from 'express';
import { Config, Logger, RestSchema } from '../../shared/libs/index.js';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger,
    protected readonly config: Config<RestSchema>
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route): void {
    const wrappedAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) => asyncHandler(item.execute.bind(item)));
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrappedAsyncHandler] : wrappedAsyncHandler;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(this.DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res,StatusCodes.CREATED, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public noContent<T>(res: Response, data?: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

}


