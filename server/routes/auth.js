import express from "express" ; 
import {createUser  ,logInUser} from  "../controller/auth.js"




const router=express.Router() ; 

 router.post("/register" ,createUser) ; 
 router.post("/login",logInUser) ; 
  
 

export default router ; 