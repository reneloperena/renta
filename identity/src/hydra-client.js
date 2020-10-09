import { AdminApi } from '@oryd/hydra-client'
import config from './config'

const hydraAdmin = new AdminApi(config.get('hydra.url'))

export default hydraAdmin
