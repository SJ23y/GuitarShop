import { RestSchema, Logger, Config, DatabaseClient } from '../shared/libs/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';
import cors from 'cors';
import { Controller, ExceptionFilter } from './index.js';
import { ParseTokenMiddleware } from './middleware/parse-token.middleware.js';
import { getFullServerPath } from '../shared/helpers/common.js';
import { STATIC_ROUTE, UPLOAD_ROUTE } from '../shared/constants/const.js';


@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.MongoDatabaseClient) private readonly mongoDatabaseClient: DatabaseClient,
    @inject(Component.PrismaDatabaseClient) private readonly prismaDatabaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.GuitarController) private readonly guitarController: Controller,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,

  ) {
    this.server = express();
  }

  private async initDB() {
    const mongoURI = getMongoURI(
      this.config.get('MONGO_DB_USER'),
      this.config.get('MONGO_DB_PASSWORD'),
      this.config.get('MONGO_DB_HOST'),
      this.config.get('MONGO_DB_PORT'),
      this.config.get('MONGO_DB_NAME')
    );

    await this.mongoDatabaseClient.connect(mongoURI);
    await this.prismaDatabaseClient.connect();
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(STATIC_ROUTE, express.static(this.config.get('STATIC_PATH')));
    this.server.use(UPLOAD_ROUTE, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  private async initControllers() {
    this.server.use('/', this.userController.router);
    this.server.use('/', this.guitarController.router);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init databases ...');
    await this.initDB();
    this.logger.info('Init databases completed');

    this.logger.info('Init app-level middlewares ...');
    await this.initMiddleware();
    this.logger.info('Middleware initialization completed');

    this.logger.info('Init controllers ...');
    await this.initControllers();
    this.logger.info('Controllers initialization completed');

    this.logger.info('Init exception filters ...');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server ...');
    await this.initServer();
    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
