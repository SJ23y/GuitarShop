import { PrismaClient } from '@prisma/client'
import { DatabaseSetting } from '../../constants/index.js';
import { setTimeout } from 'node:timers/promises';
import { inject, decorate, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger, DatabaseClient } from '../index.js';

decorate(injectable(), PrismaClient);

@injectable()
export class PrismaDatabaseClient extends PrismaClient implements DatabaseClient {
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    super();
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  async connect() {
    let attempt = 0;
    while (attempt <= DatabaseSetting.RETRY_COUNT) {
      try {
        this.logger.info(`Trying to connect to PrismaClient. Attempt ${attempt}`);
        await this.$connect();
        this.isConnected = true;
        this.logger.info('Connection to PrismaClient established');
        return;
      } catch(error) {
        ++attempt;
        this.logger.error('Failed to connect to database', error as Error);
        await setTimeout(DatabaseSetting.RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish connection to PrismaClient after ${DatabaseSetting.RETRY_COUNT}`);

  }

  async disconnect() {
    await this.$disconnect();
  }
}
