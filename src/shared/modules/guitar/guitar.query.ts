import { IsArray, IsIn, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { SortDirection, SortType, Setting } from "../../constants/index.js";
import { TypeOfGuitar } from "@prisma/client";

export class GuitarQuery {
  @Transform(({ value }) => parseInt(value, 10) || Setting.DEFAULT_GUITAR_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  public count?: number = Setting.DEFAULT_GUITAR_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = SortDirection.Asc

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = SortType.DATE

  @Transform(({ value }) => parseInt(value, 10) || Setting.DEFAULT_PAGE_COUNT)
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  public page?: number =  Setting.DEFAULT_PAGE_COUNT

  @IsArray()
  @IsIn(Object.values(TypeOfGuitar))
  @IsOptional()
  public type?: TypeOfGuitar[]

  @IsArray()
  @IsNumber()
  @IsOptional()
  public strings?: string[]
}
