import { StatusCodes } from 'http-status-codes';

const AUTH_TOKEN_KEY_NAME = 'guitar-shop-token';

enum DateFormat {
  ReviewField = 'MMMM YYYY',
  ReviewValue = 'YYYY-MM-DD',
}

enum ApiRoute {
  Guitars = '/guitars',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const Setting = {
  ApiTimeout: 5000,
  BaseUrl: 'http://localhost:5000'
} as const;

enum SortBy {
  DATE = 'date',
  PRICE = 'price'
}

enum SortDirection {
  UP = 'asc',
  DOWN = 'desc'
}

enum AppRoute {
  Main = '/product-list',
  Login = '/',
  Register = '/register',
  Product = '/guitar/:guitarId',
  Page404 = '/404',
  Add = '/add-guitar',
  Edit = '/edit-guitar/:guitarId'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  GUITARS = 'GUITARS',
  GUITAR = 'GUITAR',
  USER = 'USER',
}

export {
  Setting,
  AppRoute,
  AuthorizationStatus,
  DateFormat,
  SortBy,
  AUTH_TOKEN_KEY_NAME,
  ApiRoute,
  StatusCodeMapping,
  NameSpace,
  SortDirection
};
