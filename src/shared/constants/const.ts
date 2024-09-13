const UPLOAD_ROUTE = '/uploads';
const STATIC_ROUTE = '/static';
const GUITAR_STRINGS_NUMBERS = [4, 6, 7, 12]

const Setting = {
  DEFAULT_GUITAR_COUNT_LIMIT: 7,
  DEFAULT_PAGE_COUNT: 1
} as const;

enum DatabaseSetting {
  RETRY_COUNT = 5,
  RETRY_TIMEOUT = 1000,
  DEFAULT_MONGO_DB_PORT = '27017'
}

enum JWTtSetting {
  ALGORYTHM = 'HS256',
  EXPIRATION_TIME = '2d'
}

const defaultImages = [
  'catalog-product-1.png',
  'catalog-product-2.png',
  'catalog-product-3.jpg',
  'catalog-product-4.jpg',
  'catalog-product-5.jpg',
  'catalog-product-6png',
]

export {
  Setting,
  JWTtSetting,
  STATIC_ROUTE,
  UPLOAD_ROUTE,
  DatabaseSetting,
  GUITAR_STRINGS_NUMBERS,
  defaultImages
};
