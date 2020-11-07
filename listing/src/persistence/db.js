import baseKnex from 'knex'
import knexPostgis from 'knex-postgis'
import dbConfig from '../../knexfile.js'
export const knex = baseKnex(dbConfig)
export const st = knexPostgis(knex)
export default knex
