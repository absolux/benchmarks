
'use strict'

const app = require('fastify')()

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

app.get('/', schema, function (_, reply) {
  reply.send({ hello: 'world' })
})

app.listen(9000)
