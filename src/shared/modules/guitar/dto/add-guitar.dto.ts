import {
  IsInt,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsIn,
  IsString,
  IsDateString
} from 'class-validator';
import { GuitarValidationMessage } from './create-offer.messages.js';
import { GuitarModel } from '../../../types/guitarModel.enum.js';
import { GUITAR_STRINGS_NUMBERS } from '../../../constants/const.js';

export class AddGuitarDto {
  @IsString()
  @MinLength(10, {message: GuitarValidationMessage.title.minLength})
  @MaxLength(100, {message: GuitarValidationMessage.title.maxLength})
  public title: string;

  @IsString()
  @MinLength(20, {message: GuitarValidationMessage.description.minLength})
  @MaxLength(1024, {message: GuitarValidationMessage.description.maxLength})
  public description: string;

  @IsString()
  @MinLength(5, {message: GuitarValidationMessage.articul.minLength})
  @MaxLength(40, {message: GuitarValidationMessage.articul.maxLength})
  public articul: string;

  @IsDateString({}, {message: GuitarValidationMessage.date.invalidFormat})
  public date: Date;

  @IsInt({message: GuitarValidationMessage.intType.type})
  @IsIn(GUITAR_STRINGS_NUMBERS, {message: GuitarValidationMessage.stringsNumber.wrongValue})
  public stringsNumber: number;

  @IsIn(Object.values(GuitarModel), {message: GuitarValidationMessage.type.wrongValue})
  public type: string;

  @IsInt({message: GuitarValidationMessage.intType.type})
  @Min(100, {message: GuitarValidationMessage.price.value})
  @Max(1000000, {message: GuitarValidationMessage.price.value})
  public price: number;

  @IsString({message: GuitarValidationMessage.stringType.type})
  public picture: string;
}
