import { AdminApi } from '@oryd/hydra-client'
import config from './config'

console.log(config.HYDRA_ADMIN_URL)
const hydraAdmin = new AdminApi({ basePath: config.HYDRA_ADMIN_URL })

export default hydraAdmin
