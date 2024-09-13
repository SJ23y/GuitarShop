#!/usr/bin/env node

import 'reflect-metadata';
import { CliApplication, HelpCommand, VersionCommand, GenerateCommand } from './cli/index.js';

function bootstrap() {
  console.log('in main bootstrap')
  const cliAppliaction = new CliApplication();
  cliAppliaction.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new GenerateCommand()
  ]);

  cliAppliaction.processCommand(process.argv);

}

console.log('in main bootstrap')
bootstrap();
