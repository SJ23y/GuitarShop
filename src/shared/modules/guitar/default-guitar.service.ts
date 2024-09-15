
import { AddGuitarDto, UpdateGuitarDto } from './index.js';
import { inject, injectable } from 'inversify';
import { Component, Guitar } from '../../types/index.js';
import { Logger } from '../../libs/index.js';
import { PrismaDatabaseClient } from '../../libs/database-client/prisma.database-client.js';
import { GuitarService } from './guitar-service.interface.js';
import { Prisma, TypeOfGuitar } from '@prisma/client';
import { GuitarQuery } from './guitar.query.js';
import { SortType } from '../../constants/sort.js';
import { PaginationResult } from '../../types/pagination-result.interface.js';
import { Setting } from '../../constants/const.js';
import { plainToInstance } from 'class-transformer';

@injectable()
export class DefaultGuitarService implements GuitarService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.PrismaDatabaseClient) private readonly dbClient: PrismaDatabaseClient) {
  }

  private async getGuitarCount(where: Prisma.GuitarWhereInput): Promise<number> {
    return this.dbClient.guitar.count({ where });
  }

  private calculateGuitarPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount/limit);
  }

  public async create(dto: AddGuitarDto): Promise<Guitar | null> {
    const newGuitar = await this.dbClient.guitar.create({
      data: {
        type: dto.type as TypeOfGuitar,
        title: dto.title,
        description: dto.description,
        date: dto.date,
        stringsNumber: dto.stringsNumber,
        picture: dto.picture,
        price: dto.price,
        articul: dto.articul
      }
    });
    this.logger.info(`New offer created: ${newGuitar.id} ${newGuitar.title}`);
    return newGuitar;
  }

  public async exists(documentId: string): Promise<boolean> {
    const guitar = await this.dbClient.guitar.findFirst({ where: { id: documentId }});
    return Boolean(guitar);
  }

  public async find(query?: GuitarQuery): Promise<PaginationResult<Guitar>> {
    query = plainToInstance(GuitarQuery, query);
    const take = query?.count ?? Setting.DEFAULT_GUITAR_COUNT_LIMIT;
    const currentPage = query?.page ?? Setting.DEFAULT_PAGE_COUNT;
    const skip = (currentPage - 1) * take;
    const where: Prisma.GuitarWhereInput = {};
    const orderBy: Prisma.GuitarOrderByWithRelationInput = {};

    if (query?.type) {
      where.type = {
        in: query.type
        }
      }

    if (query?.strings) {
      where.stringsNumber = {
        in: query.strings.map(item => parseInt(item, 10))
      }
    }

    if (query?.sortBy) {
      switch (query?.sortBy) {
        case SortType.DATE:
          orderBy.date = query.sortDirection;
          break;
        case SortType.PRICE:
          orderBy.price = query.sortDirection;
          break;
      }
    }
    const [guitars, guitarsCount] = await Promise.all([
      this.dbClient.guitar
      .findMany({
        skip,
        take,
        where,
        orderBy
      }),
      this.getGuitarCount(where)
    ])

    return {
      entities: guitars,
      currentPage: currentPage,
      totalPages: this.calculateGuitarPage(guitarsCount, take),
      itemsPerPage: take,
      totalItems: guitarsCount

    };
  }

  public async findById(guitarId: string): Promise<Guitar | null> {
    return await this.dbClient.guitar.findFirst({ where: { id: guitarId }});
  }

  public async updateById(guitarId: string, dto: UpdateGuitarDto): Promise<Guitar | null> {
    return this.dbClient.guitar.update(
      {
        where: {
          id: guitarId
        },
        data: {
          ...dto,
          type: (dto.type) ? dto.type as TypeOfGuitar : undefined
        }
      }
      );
  }

  public async deleteById(guitarId: string): Promise<void> {
    await this.dbClient.guitar.delete({ where: { id: guitarId }});
  }
}
