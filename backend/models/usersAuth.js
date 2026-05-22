import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        default: function(){
            return this.name
        }
    },

    profileImage:{
        type:String,
        default: function(){
            return this.avatar ||  "https://i.pravatar.cc/150?u=bale"
        }
    },
    password:{
        type:String,
     
    },
    phone:{
        type:Number,
        trim:true
    },
    role:{
        type:String,
        enum:["admin","resident"],
        default:'resident'
    },
    authMethod:{
        type:String,
        enum:['local','google'],
        default:'local'
    },
    googleID:{
        type:String,
        sparse:true
    },
    avatar:{
        type:String
    },
    savedBy:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'report_incident'
    }]
})

const UserModel=mongoose.model('users_auth',userSchema)

export default UserModel