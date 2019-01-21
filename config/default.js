module.exports = {
    SERVER_PORT: 3000,
    LOG_LEVEL: 'debug',
    DB_URL: 'mongodb://127.0.0.1:27017/healthApp',
    JWT_SECRET: 'SECRET',
    ISSUER: 'HEALTH_APP',
    EXPIRES_IN: '1m',
    ALGORITHM: 'HS256' //dont use rs512 or othe rs bcoz that will require to have a certifcate file
}
