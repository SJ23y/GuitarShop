const UPLOAD_ROUTE = '/upload';
const STATIC_ROUTE = '/static';
const GUITAR_STRINGS_NUMBERS = [4, 6, 7, 12]

const Setting = {
  MAXPRICE: 100000,
  MINPRICE: 100,
  MAXADULTS: 10,
  MINADULTS: 1,
  MAXBEDROOMS: 8,
  MINBEDROOMS: 1,
  MAXRAITING: 5,
  MINRAITING: 1,
  OFFER_IMAGES_COUNT: 6,
  MAX_COMMENTS_COUNT: 50,
  MAX_OFFERS_COUNT: 50,
  OFFER_LOCATION_ZOOM: 16,
  PREMIUM_OFFERS_COUNT: 3,
  CHUNK_SIZE: 16384,
  DEFAULT_AVATAR_FILE_NAME: 'default-avatar.jpg'
} as const;

enum DatabaseSetting {
  RETRY_COUNT = 5,
  RETRY_TIMEOUT = 1000,
  DEFAULT_MONGO_DB_PORT = '27017'
}


const DEFAULT_STATIC_IMAGES = [
  Setting.DEFAULT_AVATAR_FILE_NAME,
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
