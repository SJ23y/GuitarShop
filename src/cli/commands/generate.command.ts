import { PrismaClient } from '@prisma/client/extension';
import {
  ConsoleLogger,
  DatabaseClient,
  Logger,
  MongoDatabaseClient
} from '../../shared/libs/index.js';
import {
  DefaultUserService,
  UserModel,
  UserService
 } from '../../shared/modules/user/index.js';
import { Command } from './command.interface.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { DefaultGuitarGenerator } from '../../shared/libs/guitar-generator/guitar-generator.js';
import { GuitarGenerator } from '../../shared/libs/guitar-generator/guitar-generator.interface.js';

export class GenerateCommand implements Command {

  private logger: Logger;
  private mongoClient: DatabaseClient;
  private prismaClient: PrismaClient;
  private userService: UserService;
  private guitarGenerator: GuitarGenerator;

  constructor() {
    this.logger = new ConsoleLogger();
    this.mongoClient = new MongoDatabaseClient(this.logger);
    this.prismaClient = new PrismaClient();
    this.prismaClient.connect();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.guitarGenerator = new DefaultGuitarGenerator();
    this
  }

  private async userSave(salt: string) {
    await this.userService.findOrCreate({
      name: 'admin',
      password: 'admin',
      email: 'admin@example.com'
    }, salt)
  }

  private async guitarSave(count: number) {
    for (let i = 0; i < count; i++) {
      const newGuitar = this.guitarGenerator.generate();
      await this.prismaClient.guitar.create({
        data: {
          ...newGuitar
        }
      });
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, mongoUri, salt] = parameters;
    console.log('in generate execute: ', count, mongoUri, salt);
    await this.mongoClient.connect(mongoUri);

    try {
      await Promise.all([
        this.userSave(salt),
        this.guitarSave(parseInt(count, 10))
      ])
    } catch (error: unknown) {
      console.error(chalk.red('Can\'t generate data'));

      if (error instanceof Error) {
        console.error(chalk.red(getErrorMessage(error)));
      }
    } finally {
      await this.prismaClient.$disconnect;
      await this.mongoClient.disconnect;
      console.log(chalk.green('Database clients disconnected'))
    }
  }
}
