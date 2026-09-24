const User = require("../models/user");

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json({
        message: "User already exists"
    });
  }

  const user = await User.create({
    name,
    email,
    password
  });

  return res.json({
    message: "User created successfully",
    user
  });
};

module.exports = {signupUser};