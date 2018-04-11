
'use strict'

const app = require('express')()

app.use((_, res) => {
  res.json({ hello: 'world' })
})

app.listen(9000)
