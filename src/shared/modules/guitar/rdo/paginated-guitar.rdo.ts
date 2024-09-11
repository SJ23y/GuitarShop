import { Expose, Type } from "class-transformer";
import { GuitarRdo } from "./guitar.rdo.js";

export class PaginatedGuitarRdo {
  @Expose()
  @Type(() => GuitarRdo)
  entities: GuitarRdo[];

  @Expose()
  totalPages: number;

  @Expose()
  currentPage: number;

  @Expose()
  totalItems: number;

  @Expose()
  itemsPerPage: number;
}
