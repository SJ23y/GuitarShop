import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createAuthContainer } from './shared/modules/auth/index.js';
import { createGuitarContainer } from './shared/modules/guitar/guitar.container.js';

async function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createGuitarContainer(),
    createAuthContainer()
  );

  const application = container.get<RestApplication>(Component.RestApplication);

  await application.init();
}

bootstrap();
