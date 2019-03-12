module.exports = {
    SERVER_PORT: 3000,
    LOG_LEVEL: 'debug',
    DB_URL: 'mongodb+srv://admin:admin@mongo-cluster-w8n2g.mongodb.net/healthApp?retryWrites=true',
    JWT_SECRET: 'SECRET',
    ISSUER: 'HEALTH_APP',
    EXPIRES_IN: '12h',
    ALGORITHM: 'HS256' //dont use rs512 or othe rs bcoz that will require to have a certifcate file
}
