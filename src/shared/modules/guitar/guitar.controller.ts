import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpMethod,
  RequestBody,
  RequestParams,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware,
  UploadFileMiddleware
  } from '../../../rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Config, Logger, RestSchema } from '../../libs/index.js';
import { fillRdo } from '../../helpers/common.js';
import { Request, Response } from 'express';
import { PrivateRouteMiddleware } from '../../../rest/middleware/private-route.middleware.js';
import {
  PaginatedGuitarRdo,
  GuitarRdo,
  GuitarService,
  AddGuitarDto,
  UpdateGuitarDto,
  GuitarQuery
 } from './index.js';
import { ValidateUUIDMiddleware } from '../../../rest/middleware/validate-uuid.middleware.js';

@injectable()
export class GuitarController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.GuitarService) private readonly guitarService: GuitarService,
    @inject(Component.Config) protected readonly config: Config<RestSchema>
  ) {
    super(logger, config);

    this.logger.info('Register routes for guitar controller');

    this.addRoute({
      path: '/guitars',
      method: HttpMethod.GET,
      handler: this.index
    });

    this.addRoute({
      path: '/guitars',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'image'),
        new ValidateDtoMiddleware(AddGuitarDto)
      ],
    });

    this.addRoute({
      path: '/guitars/:guitarId',
      method: HttpMethod.GET,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateUUIDMiddleware('guitarId'),
        new DocumentExistsMiddleware(this.guitarService, 'guitarId', 'Guitar')
      ]});

    this.addRoute({
      path: '/guitars/:guitarId',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateUUIDMiddleware('guitarId'),
        new DocumentExistsMiddleware(this.guitarService, 'guitarId', 'Guitar'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'),'image'),
        new ValidateDtoMiddleware(UpdateGuitarDto)
      ]
    });

    this.addRoute({
      path: '/guitars/:guitarId',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateUUIDMiddleware('guitarId'),
        new DocumentExistsMiddleware(this.guitarService, 'guitarId', 'Guitar')
      ]
    });
  }

  private async index(
    { query }: Request<RequestParams, undefined, undefined, GuitarQuery>,
    res: Response
  ): Promise<void> {
    const paginationResult = await this.guitarService.find(query);
    const result = fillRdo(PaginatedGuitarRdo, paginationResult);

    this.ok(res, result);
  }

  private async create(
    req: Request<RequestParams, RequestBody, AddGuitarDto>,
    res: Response
  ): Promise<void> {

    console.log('date: ', new Date(req.body.date));
    const picture = req.file?.filename ?? '';

    const newGuitar = await this.guitarService.create({...req.body, picture});

    this.created(res, fillRdo(GuitarRdo, newGuitar));
  }

  private async show(
    req: Request<Record<string, string>, RequestBody>,
    res: Response
  ): Promise<void> {
    const guitar = await this.guitarService.findById(req.params.guitarId);

    this.ok(res, fillRdo(GuitarRdo, guitar));
  }

  private async update(
    req: Request<Record<string, string>, RequestBody, UpdateGuitarDto>,
    res: Response
  ): Promise<void> {

    if (req.file?.filename) {
      req.body.picture = req.file?.filename;
    }

    const updatedGuitar = await this.guitarService.updateById(req.params.guitarId, { ...req.body});

    this.ok(res,fillRdo(GuitarRdo, updatedGuitar));
  }

  private async delete(
    req: Request<Record<string, string>, RequestBody>,
    res: Response
  ): Promise<void> {

    await this.guitarService.deleteById(req.params.guitarId);

    this.noContent(res);
  }
}
