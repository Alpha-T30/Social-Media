import mongoose from "mongoose" ; 

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    } ,
    email: {
        type:String,
        required:true,
        max:50,
        unique:true,
         
    },

    password:{
        type:String,
        required:true,
        min:6
    } ,
    profilePicture:{
        type:String,
        default:""
    } ,
    coverPicture:{
        type:String,
        default:""
    } ,
    followers:{
        type:Array,
        default:[]
    } ,
    following:{
        type:Array,
        default:[]
    } , 
    isAdmin:{
        type:Boolean,
        default:false
    } ,
    desc:{ 
        type:String,
        max:100

    },
    city:{
        type:String,
        max:50
    } ,
    homeTown:{
        type:String,
        max:50
    } ,
    relationship:{
        type:Number,
        enum:[1,2,3,4] , 
    }
}  , 
{timestamps:true} 
) ; 

const User =mongoose.model("User",UserSchema) ; 

export default User;