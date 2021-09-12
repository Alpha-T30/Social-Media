import express from "express" ; 
import {GetFriends,FollowUser, GetUser ,UpdateUser,DeleteUser, UnFollowUser } from  "../controller/user.js" 
  
const router=express.Router() ; 

// get conversation with 2 users 



//update a single User
router.get("/",GetUser) ; 
//delete a single user
//get a single user
router.route("/:id")
 
.patch(UpdateUser)
.delete(DeleteUser) ; 

//follow a single user
router.patch("/:id/follow",FollowUser) ; 
//unfollow a single user
router.patch("/:id/unfollow",UnFollowUser) ; 
 
//get all the friends 
 

export default router ; 