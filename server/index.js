import express from "express" ; 
const app =express() ; 

import dotenv from "dotenv" ; 
import helmet from "helmet" ; 
import morgan from "morgan" ; 
import mongoose from "mongoose" ; 
import userRoute from "./routes/user.js"
import userAuth from "./routes/auth.js"
import postRoute from "./routes/post.js"



dotenv.config() ; 




app.use(express.json({limit:"30mb",extended:true})) ; 
app.use(express.urlencoded({limit:"30mb",extended:true})) ; 
app.use(morgan("common")) ; 
app.use(helmet()) ; 

app.use("/api/user/",userRoute) ; 
app.use("/api/auth/",userAuth) ; 
app.use("/api/posts/",postRoute) ; 

const ClusterURL=process.env.CLUSTER_URL ; 

const PORT=process.env.PORT || 6000 ; 
mongoose.connect(ClusterURL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(()=>app.listen(PORT,()=>console.log(`Successfully connected to port ${PORT}`)))
.catch((error)=>{console.log(error.message)}) ; 

 

 

 