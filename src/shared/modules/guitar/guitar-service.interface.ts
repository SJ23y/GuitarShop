import { AddGuitarDto, UpdateGuitarDto } from './index.js';
import { DocumentExists } from '../../types/document-exists.interface.js';
import { Guitar } from '../../types/guitar.type.js';
import { GuitarQuery } from './guitar.query.js';
import { PaginationResult } from '../../types/pagination-result.interface.js';

export interface GuitarService extends DocumentExists {
  create(dto: AddGuitarDto): Promise<Guitar | null>;
  find(query?: GuitarQuery): Promise<PaginationResult<Guitar>>
  findById(guitarId: string): Promise<Guitar | null>;
  updateById(guitarId: string, dto: UpdateGuitarDto): Promise<Guitar | null>;
  deleteById(guitarId: string): Promise<void>;
}
