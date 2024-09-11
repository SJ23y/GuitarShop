import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number,
  SALT: string,
  MONGO_DB_HOST: string,
  MONGO_DB_USER: string,
  MONGO_DB_PASSWORD: string ,
  MONGO_DB_PORT: string,
  MONGO_DB_NAME: string,
  UPLOAD_DIRECTORY: string,
  JWT_SECRET: string,
  HOST: string,
  STATIC_PATH: string
  POSTGRES_USER: string,
  POSTGRES_PASSWORD: string,
  POSTGRES_DB: string,
  PGADMIN_DEFAULT_EMAIL: string,
  PGADMIN_DEFAULT_PASSWORD: string,
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'String for crypting user password',
    format: String,
    env: 'SALT',
    default: null
  },
  MONGO_DB_HOST: {
    doc: 'IP address of the database server',
    format: 'ipaddress',
    env: 'MONGO_DB_HOST',
    default: null
  },
  MONGO_DB_USER: {
    doc: 'User for the database server',
    format: String,
    env: 'MONGO_DB_USER',
    default: null
  },
  MONGO_DB_PASSWORD: {
    doc: 'Password for the database server',
    format: String,
    env: 'MONGO_DB_PASSWORD',
    default: null
  },
  MONGO_DB_PORT: {
    doc: 'PORT for the database server',
    format: 'port',
    env: 'MONGO_DB_PORT',
    default: '27017'
  },
  MONGO_DB_NAME: {
    doc: 'Name of the database',
    format: String,
    env: 'MONGO_DB_NAME',
    default: 'Six-cities-db'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for users files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for JSON token',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  HOST: {
    doc: 'Host where started service',
    format: String,
    env: 'HOST',
    default: 'localhost'
  },
  STATIC_PATH: {
    doc: 'Path to keep static files',
    format: String,
    env: 'STATIC_PATH',
    default: 'static'
  },
  POSTGRES_USER: {
    doc: 'User of the postgres database',
    format: String,
    env: 'POSTGRES_USER',
    default: null
  },
  POSTGRES_PASSWORD: {
    doc: 'Password for the postgres database',
    format: String,
    env: 'POSTGRES_PASSWORD',
    default: null
  },
  POSTGRES_DB: {
    doc: 'Name of the database',
    format: String,
    env: 'POSTGRES_DB',
    default: 'guitar-shop-db'
  },
  PGADMIN_DEFAULT_EMAIL: {
    doc: 'Email for pg_admin',
    format: String,
    env: 'PGADMIN_DEFAULT_EMAIL',
    default: null
  },
  PGADMIN_DEFAULT_PASSWORD: {
    doc: 'Password for pg_admin',
    format: String,
    env: 'PGADMIN_DEFAULT_PASSWORD',
    default: null
  },



});
