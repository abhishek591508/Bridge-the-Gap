const {signupUser} = require("../services/auth")

const signup = async (req,res)=>{
    const response = await signupUser(req, res);

    return response;
};

module.exports = {signup}