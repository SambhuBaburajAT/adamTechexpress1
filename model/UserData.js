const { default: mongoose } = require("mongoose");

const userdata=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    image:String
})
const UserModel=mongoose.model('UserDatas',userdata)
module.exports={UserModel}