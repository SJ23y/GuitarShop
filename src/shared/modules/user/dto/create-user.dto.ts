import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserValidationMessage } from './user-validation-message.js';

export class CreateUserDto {

  @IsEmail({}, {message: UserValidationMessage.email.email})
  public email: string;

  @IsString()
  @MinLength(6, {message: UserValidationMessage.password.minLength})
  @MaxLength(12, {message: UserValidationMessage.password.maxLength})
  public password: string;

  @IsString()
  @MinLength(1, {message: UserValidationMessage.name.minLength})
  @MaxLength(15, {message: UserValidationMessage.name.maxLength})
  public name: string;
}
