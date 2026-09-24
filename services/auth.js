const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    return res.status(400).json({
        success:false,
        message: "All fields are required"
    })
  }

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

const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    console.log(req.token);
    
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            message: "User not registered"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(401).json({
            success: false,
            message:"Incorrect Password"
        })
    }
    const token = jwt.sign({userId: User._id},
                            process.env.jwt_secret, 
                            {expiresIn: '7d'});

    // Define cookie configuration options
    const cookieOptions = {
        httpOnly: true,                        // Prevents XSS attacks (JS cannot read the cookie)
        secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS only in production
        sameSite: 'strict',                    // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000,       // Matches token expiration (7 days in milliseconds)
    };


    return res.status(200).cookie('token', token, cookieOptions).json({
        success: true,
        message:"Login is successfull",
        token: token,
        user:{
            id: user._id,
            email: user.email
        }
    })
}

module.exports = {signupUser, loginUser};