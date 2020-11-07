const envalid = require('envalid')

const { num } = envalid

module.exports = envalid.cleanEnv(process.env, {
  PORT: num({ default: 3005 })
})
