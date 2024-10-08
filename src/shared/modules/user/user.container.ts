import { Container } from 'inversify';
import { UserEntity, UserModel, UserService } from './index.js';
import { DefaultUserService } from './index.js';
import { types } from '@typegoose/typegoose';
import { Controller } from '../../../rest/index.js';
import { UserController } from './user.controller.js';
import { Component } from '../../types/index.js';


export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
