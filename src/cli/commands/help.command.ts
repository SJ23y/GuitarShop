import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  execute(..._parameters: string[]): void {
    console.log(chalk.yellow(`
        Программа для подготовки данных для REST API сервера.

        Пример: cli.js --<command> [--arguments]

        Команды:

        --version:                   # выводит номер версии
        --help:                      # выводит список команд
        --generate <n> <mongoUri> <salt>  # генерирует <n>-количество тестовых данных
      `));
  }
}
