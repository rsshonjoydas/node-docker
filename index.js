const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h2>Hi There</h2>')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))