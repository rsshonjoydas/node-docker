const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config')

const app = express()

// ! Database connection
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
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