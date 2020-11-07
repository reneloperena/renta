const envalid = require('envalid')

const { num, str } = envalid

module.exports = envalid.cleanEnv(process.env, {
  PORT: num({ default: 3003 }),
  DATABASE_USER: str({ default: 'postgres' }),
  DATABASE_PASSWORD: str({ default: 'changeme' }),
  DATABASE_HOST: str({ default: 'localhost' }),
  DATABASE_PORT: num({ default: 5432 })
})
