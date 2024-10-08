## Структура проекта

### markup

В директории находится вёрстка проекта: примеры страниц, ui-kit и карта сайта (`index.html`). Начинать знакомство с проектом лучше с карты.

### frontend

Директория для фронтенда проекта.

#### public

Директория для размещения статичных ресурсов (шрифты, стили, изображения и так далее).

#### src

В директории размещается исходный код проекта: компоненты, файлы с тестами, модули и так далее. Структура директории `src` может быть произвольной.

## Алгоритм работы над фронтендом

1. Перейдите в диретокрию `frontend`.

2. Установите зависимости, выполнив команду `npm install`.

3. Проверьте работу приложения, выполнив команду `npm start`.

4. Перейдите по адресу, указанному в терминале (скорее всего, это будет `http://localhost:5173/`). Если сборка прошла успешно, то на странице вашего приложения вы увидите `Hello, world!`.

5. Запрограммируйте фронтенд.

## Запуск проекта

### frontend
Для запуска фронтенд серевера необходимо перейти в директорию `frontend`.  
Перед запуском следует выполнить установку всех зависимостей командой `npm install`.   
Фронтенд сервер запускается командой `npm start`

### backend

Перед запуском сервера следует выполнить установку всех зависимостей командой `npm install`. 

Для конфигурирования сервера используются переменные окружения. Для корректной работы приложения необходимо создать файл с расширением `.env` в корневой директории. 

Список переменных окружения, необходимых для каждого микросервиса, указан в файле `.env.example`.

Для работы сервиса необходимо установить следующие приложения:
    - база данных MongoDb ;
    - база данных PostgresSQL;

В корневой директории находится файл docer-compose для быстрой установки и настройке данных приложений в случае использования докер-контейнеров.

Запуск файла осуществляется командой:   
  `docker compose --file <место расположения файла> --env-file <путь к .env файлу> up -d`

При работе с БД PostgresSql используется ORM Prisma. Для сохранения данных о публикациях необходимо произвести настройку Prisma. Для этого необходимо воспроизвести следующую последовательность команд:  
    * Применить миграции сервиса Blog:   
    `npm nx db:migrate --name <Произвольный заголовок для миграции>`  
    * Сгенерировать Prisma Client:   
    `npm run blogs:db:generate`  

## Описание переменных окружения:

* MONGO_DB - имя БД
* MONGO_HOST - хост БД
* MONGO_PORT - порт БД
* MONGO_USER - имя пользователя БД
* MONGO_PASSWORD - пароль БД
* MONGO_AUTH_BASE - имя пользователя интерфейса БД
* MONGO_UI_PORT - порт интерфейса БД
* POSTGRES_USER - имя пользователя БД 
* POSTGRES_PASSWORD - пароль БД
* POSTGRES_DB - имя БД
* POSTGRES_PORT - порт БД
* PGADMIN_DEFAULT_EMAIL - имя пользователя PGADMIN
* PGADMIN_DEFAULT_PASSWORD - пароль PGADMIN
* PGADMIN_PORT - порт PGADMIN
* PORT - номер порта на котором будет запущено приложение
* JWT_SECRET - секретный ключ для токена
* STATIC_PATH - путь к папке со статичными файлами
* UPLOAD_DIRECTORY - путь к папке файлами пользователей
* SALT - строка для хэширования пароля
* HOST - имя или ip-адрес хоста, на котором будет запущено приложение
