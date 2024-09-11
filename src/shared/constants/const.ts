const UPLOAD_ROUTE = '/upload';
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

const DEFAULT_STATIC_IMAGES = [
  'default-image-01.jpg',
  'default-image-02.jpg',
  'default-image-03.jpg',
  'default-image-04.jpg',
  'default-image-05.jpg',
  'default-image-06.jpg',
  'default-preview.jpg'
];

const STATIC_RESOURCE_FIELDS = [
  'avatar',
  'images',
  'previewImage'
];


enum JWTtSetting {
  ALGORYTHM = 'HS256',
  EXPIRATION_TIME = '2d'
}

export {
  Setting,
  JWTtSetting,
  STATIC_ROUTE,
  UPLOAD_ROUTE,
  DEFAULT_STATIC_IMAGES,
  STATIC_RESOURCE_FIELDS,
  DatabaseSetting,
  GUITAR_STRINGS_NUMBERS
};
