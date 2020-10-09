import Koa from 'koa'
import config from './config'

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello world!'
})

app.listen(config.get('application.port'))
