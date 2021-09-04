const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

// ! User sign up
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword
    })
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail"
    })
  }
}

// ! User login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User authentication failed!'
      })
    }

    const isValidPwd = await bcrypt.compare(password, user.password)

    if (isValidPwd) {
      res.status(200).json({
        status: "Successful"
      })
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'Incorrect username or password!'
      })
    }
  } catch (error) {
    res.status(400).json({
      status: "failed"
    })
  }
}