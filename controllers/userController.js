const User = require('../models/User')
const bcrypt = require('bcryptjs')

const getAllUsers = async(req,res)=>{
    const user = await User.find()

    res.status(200).json(user)
}

const signupUser = async(req,res)=>{    
    
    const {name,email,password} = req.body
    let user
    try {
         user = await User.findOne({email:req.body.email})                
    } catch (error) {
        return  console.log(error)
    }
       if(user)
       {
        return res.status(400).json({message:'User already exists'})
       } 
       const hashedPassword = bcrypt.hashSync(password,10)
       
       const newUser = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
        
       })
       try {
           newUser.save() 
               
       } catch (error) {
        return console.log(error)
       }
       return res.status(200).json(newUser)
}
const loginUser = async(req,res)=>{
    const {email,password} = req.body
    let user 
    try {
        user = await User.findOne({email:email})                
   } catch (error) {
       return  console.log(error)
   }
      if(!user)
      {
       return res.status(404).json({message:'User not existing'})
      } 
      const isPasswordCorrect = bcrypt.compareSync(password,user.password)
      if(!isPasswordCorrect)
      return res.status(404).json({message:"password not correct"})

      
      return res.status(200).json({message:"Login sucessfull"})
}

module.exports = {
    getAllUsers,
    signupUser,
    loginUser

}