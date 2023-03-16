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
     try{
      const result = await login.find({})
      res.status(200).json(result)
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
      res.status(200).json({
        message: 'Data sent Successful'
      })
     }
     catch(err){
      let errors = handleError(err)
     res.status(400).json({errors})
     }
}

const postSome = async (req, res) => {
   const {email, password} = req.body
   try{
      const user = await login.loggedin(email, password)
      res.cookie("token", user.token)
      //  res.status(200).json({user : user._id})
      res.status(200).redirect("/some")
   }
   catch(err){
      res.status(400).json({err: "not found"})
   }
}

const logOut = async(req, res) =>{
   res.cookie("token", '',{maxAge :1})
   res.send("loggedout")
}

module.exports = {getReq, postReq, postSome, logOut}