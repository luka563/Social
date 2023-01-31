const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String, required:true,unique:true },
  password: { type: String,required:true, minLength:6 },
  blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true }]
})

module.exports = mongoose.model('User',userSchema)