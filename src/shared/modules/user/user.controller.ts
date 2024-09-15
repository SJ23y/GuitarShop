import { injectable, inject } from 'inversify';
import { BaseController,HttpError, HttpMethod, ValidateDtoMiddleware } from '../../../rest/index.js';
import { Config, Logger, RestSchema } from '../../libs/index.js';
import { Response, Request } from 'express';
import {
  CreateUserRequest,
  UserService,
  UserRdo,
  LoggedUserRdo,
  LoginUserRequest,
  CreateUserDto,
  LoginUserDto} from './index.js';
import { StatusCodes } from 'http-status-codes';
import { fillRdo } from '../../helpers/common.js';
import { AuthService } from '../auth/auth-service.interface.js';
import { PrivateRouteMiddleware } from '../../../rest/middleware/private-route.middleware.js';
import { Component } from '../../types/index.js';

@injectable()
export class UserController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) protected readonly config: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService
  ) {
    super(logger, config);
    this.logger.info('Register routes for user controller ...');

    this.addRoute({path: '/register', method: HttpMethod.POST, handler: this.create, middlewares: [
      new ValidateDtoMiddleware(CreateUserDto)]});
    this.addRoute({path: '/login', method: HttpMethod.GET, handler: this.auth,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({path: '/login', method: HttpMethod.POST, handler: this.login, middlewares: [
      new ValidateDtoMiddleware(LoginUserDto)]});

    this.addRoute({
      path: '/logout',
      method: HttpMethod.DELETE,
      handler: this.logout,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create(
    req: CreateUserRequest,
    res: Response
  ): Promise<void> {
    const user = await this.userService.findByEmail(req.body.email);

    if (user) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${req.body.email} already exists`,
        'UserController'
      );
    }

    const newUser = await this.userService.create(req.body, this.config.get('SALT'));

    this.created(res, fillRdo(UserRdo, newUser));
  }


  public async auth(
    req: CreateUserRequest,
    res: Response
  ): Promise<void> {


    const user = await this.userService.findById(req.tokenPayload.sub);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillRdo(LoggedUserRdo, user));
  }

  public async login(
    req: LoginUserRequest,
    res: Response
  ): Promise<void> {
    const user = await this.authService.verify(req.body);
    const token = await this.authService.authenticate(user);
    const responseData = fillRdo(LoggedUserRdo, user);

    this.ok(res, fillRdo(LoggedUserRdo, {...responseData, token}));
  }

  public logout(
    _req: Request,
    res: Response
  ): void {
    this.noContent(res, {});
  }
}
