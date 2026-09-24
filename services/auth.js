const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json({
        message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return res.json({
    message: "User created successfully",
    user
  });
};

module.exports = {signupUser};