const User = require("../models/userModel")

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json({
      status: 'successful',
      data: {
        user: newUser
      }
    })
  } catch (e) {
    res.status(400).json({
      status: "failed"
    })
  }
}
