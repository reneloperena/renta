import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  application: {
    hostname: {
      env: 'HOSTNAME',
      doc: 'The application hostname,',
      default: 'identity.development'
    },
    port: {
      env: 'PORT',
      doc: 'The application port.',
      default: 4000
    }
  },
  hydra: {
    url: {
      env: 'HYDRA_ADMIN_URL',
      doc: 'Hydra hostname/ip',
      format: '*',
      default: 'hydra.development'
    }
  }
})

/*
 * For future reference, load up environment files
 *
 * const env = config.get('env')
 * config.loadFile(`.env.${env})
 */

config.validate({ allowed: 'strict' })

export default config
