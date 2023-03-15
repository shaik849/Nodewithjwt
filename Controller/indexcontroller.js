const login = require('../Model/model')
const jwt = require("jsonwebtoken")


function createToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY)
}
function handleError(err){
//   console.log(err.message, err.code)
let errors = {email: '', password: ''}

console.log(err)

if(err.code === 11000){
   errors.email = "Email is already registered"
   return errors;
}


if(err.message.includes("login validation failed")){
    Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path] = properties.message
    })
}
return errors;
}

const getReq = async (req,res) => {
     const result = await login.find({})
     try{
        res.json(result)

     }
     catch(err){
        console.log(err)
     }
}

const postReq = async (req,res) => {
     const Login = new login(req.body)
     let token = createToken(Login._id)
        Login.token = token;
     
     try{
      await Login.save()
      res.cookie(token)
      res.status(200).json({
        message: 'Data sent Successful'
      })
     }
     catch(err){
      let errors = handleError(err)
     res.status(400).json({errors})
     }
}

module.exports = {getReq, postReq}