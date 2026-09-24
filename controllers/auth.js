const {signupUser, loginUser} = require("../services/auth")

const signup = async (req,res)=>{
    const response = await signupUser(req, res);

    return response;
};

const login = async (req,res)=>{
    const response = await loginUser(req,res);
    return response;
}

module.exports = {signup, login}