import mongoose from "mongoose" ; 

const PostSchema=new mongoose.Schema({

    userId: {
        type:String,
        required:true
    } ,
    desc:{
        type:String,
        max:500
    } , 

    img:{
        type:String
    } ,
    likes:{
        type:Array,
        default:[]
    } , 
    comments: [{ body: {type:String,max:100}, date: Date }],
}, 
{timestamps:true} 
) ; 

const Posts =mongoose.model("Newpost",PostSchema) ; 

export default Posts; 