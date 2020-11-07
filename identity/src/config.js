import envalid from 'envalid'
const { bool, num, str } = envalid

export default envalid.cleanEnv(process.env, {
  PORT: num({ default: 3002 }),
  HYDRA_ADMIN_URL: str({ default: 'http://hydra.abelord.localhost:4445' }),
  HYDRA_TOKEN_URL: str({ default: 'http://hydra.abelord.localhost:4444/oauth2/token' }),
  HYDRA_OAUTH2_ERROR_URL: str({ default: '' }),
  HYDRA_SESSION_LIFESPAN: num({ default: 86400 }),
  MOCK_TLS_TERMINATION: bool({ default: false }),
  OAUTH2_CLIENT_DOMAINS: str({ default: '' })
})
