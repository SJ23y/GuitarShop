const AUTH_TOKEN_KEY_NAME = 'guitar-shop-token';

enum DateFormat {
  GuitarItem = 'DD.MM.YYYY',
  ReviewValue = 'YYYY-MM-DD',
}

enum ApiRoute {
  Guitars = '/guitars',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
}

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
  Product = '/guitar',
  Page404 = '/404',
  Add = '/add-guitar',
  Edit = '/edit-guitar',
  Logout = '/logout'
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

const GuitarType = {
  ACUSTIC: {client: 'Акустическая', server: 'ACUSTIC', strings: [6, 7, 12]},
  ELECTRIC: {client: 'Электрическая', server: 'ELECTRIC', strings: [4, 6, 7]},
  UKULELE: {client: 'Укулеле', server: 'UKULELE', strings: [4]}
} as const;

const Setting = {
  ApiTimeout: 5000,
  BaseUrl: 'http://localhost:5000',
  DefaultGuitarPerPage: 7,
  DefaultStartPage: 1,
  DefaultSortBy: SortBy.DATE,
  DefaultSortDirection: SortDirection.UP,
  PaginationPagesCount: 3
} as const;

export {
  Setting,
  AppRoute,
  AuthorizationStatus,
  DateFormat,
  SortBy,
  AUTH_TOKEN_KEY_NAME,
  ApiRoute,
  NameSpace,
  SortDirection,
  GuitarType
};
