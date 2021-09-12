import express from "express" ; 
 
const app =express() ; 

import dotenv from "dotenv" ; 
import helmet from "helmet" ; 
import morgan from "morgan" ; 
import mongoose from "mongoose" ; 


import userRoute from "./routes/user.js"
import userAuth from "./routes/auth.js"
import postRoute from "./routes/post.js"
import ConversationRoute from "./routes/Conversation.js"
import MessageRoute from "./routes/Message.js"


import multer from "multer" ; 
import path from "path" ; 
import { fileURLToPath } from 'url';
import { GetFriends } from "./controller/user.js";
 
 





const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config() ; 



 

app.use(express.json({limit:"30mb",extended:true})) ; 
app.use(express.urlencoded({limit:"30mb",extended:true})) ; 
app.use(morgan("common")) ; 
app.use(helmet()) ; 

app.use("/api/user/",userRoute);
app.use("/api/auth/",userAuth) ; 
app.use("/api/posts/",postRoute) ; 
app.use("/api/conversation/",ConversationRoute) ; 
app.use("/api/message/",MessageRoute) ; 
app.use('/images', express.static(path.join(__dirname, 'public/images')));

 
const storage =multer.diskStorage({
   
    destination:(req,file,cb) =>{
        cb(null,"public/images")
    } ,
    filename:(req,file,cb)=>{
         
        cb (null,req.body.name);

        
    }
})
const upload = multer({ storage: storage });


app.post("/api/upload/", upload.single("file"), (req,res)=>{
    try { 
        
        
        
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error.message)
        
    }
}); 

app.get("/api/friends/:uid",GetFriends) ; 


const ClusterURL=process.env.NEW_CLUSTER_URL ; 

const PORT=process.env.PORT || 8000 ; 
mongoose.connect(ClusterURL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(()=>app.listen(PORT,()=>console.log(`Successfully connected to port ${PORT}`)))
.catch((error)=>{console.log(error.message)}) ; 

 

 
 
 

 