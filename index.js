const express = require('express')
const mongoose = require('mongoose')

const app = express()

// ! Database connection
const uri = "mongodb://shonjoy:rsshonjoy@mongo:27017/?authSource=admin"
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose
  .connect(uri, options)
  .then(() => console.log('Successfully connected to DB'))
  .catch((e) => {
    console.log(e)
  })

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h2>Hi There!</h2>')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))