
export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  GuitarService: Symbol.for('GuitarService'),
  GuitarModel: Symbol.for('GuitarModel'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  UserController: Symbol.for('UserControler'),
  GuitarController: Symbol.for('GuitarController'),
  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  PathTransformer: Symbol.for('PathTransformer')
} as const;
