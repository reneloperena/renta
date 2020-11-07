// Update with your config settings.
const config = require('./config')

module.exports = {
  client: 'postgresql',
  connection: {
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    database: 'chat',
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  }
}
