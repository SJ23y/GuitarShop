import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpMethod,
  RequestBody,
  RequestParams,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware
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

    this.addRoute({path: '/guitars', method: HttpMethod.GET, handler: this.index});

    this.addRoute({
      path: '/guitars',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(AddGuitarDto)]
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
        new ValidateDtoMiddleware(UpdateGuitarDto),
        new DocumentExistsMiddleware(this.guitarService, 'guitarId', 'Guitar')
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

    /*this.addRoute({
      path: '/offers/:offerId/preview',
      method: HttpMethod.POST,
      handler: this.uploadPreview,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.guitarService, 'offerId', 'Offer'),
        new ValidateAuthorMiddleware(this.guitarService),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), [{name: 'preview', maxCount: 1}])
      ]
    });*/
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

    /*if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      images = files.image && files.image.map((image) => image.filename);
      previewImage = files.preview[0] && files.preview[0].filename;
    }*/

    const newGuitar = await this.guitarService.create(req.body);

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
