const envalid = require('../user/node_modules/envalid')

const { num, str } = envalid

module.exports = envalid.cleanEnv(process.env, {
  PORT: num({ default: 3001 })
})

