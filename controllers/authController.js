const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

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