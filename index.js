const express = require('express')
const mongoose = require('mongoose')
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config')

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

// ! Database connection
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connectWithRetry = () => {
  mongoose
    .connect(uri, options)
    .then(() => console.log('Successfully connected to DB'))
    .catch((e) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000);
    })
}

app.enable("trust proxy")
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitilized: false,
    httpOnly: true,
    maxAge: 50000,
  }
}))

connectWithRetry()

app.use(express.json())

app.get('/api/v1', (req, res) => {
  res.send('<h2>Hi There!</h2>')
  console.log('yeah if run');
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))