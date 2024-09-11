import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { GuitarService } from './guitar-service.interface.js';
import { DefaultGuitarService } from './default-guitar.service.js';
import { GuitarController } from './guitar.controller.js';
import { Controller } from '../../../rest/index.js';


export function createGuitarContainer() {
  const guitarContainer = new Container();

  guitarContainer.bind<GuitarService>(Component.GuitarService).to(DefaultGuitarService).inSingletonScope();
  guitarContainer.bind<Controller>(Component.GuitarController).to(GuitarController).inSingletonScope();

  return guitarContainer;
}
