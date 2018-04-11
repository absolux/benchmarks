
'use strict'

const micro = require('micro')

const app = micro(() => ({ hello: 'world' }))

app.listen(9000)
