
'use strict'

const Application = require('koa')

const app = new Application()

app.use((ctx) => {
  ctx.body = { hello: 'world' }
})

app.listen(9000)
