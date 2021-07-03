import express from "express" ; 
import {FollowUser, GetUser ,UpdateUser,DeleteUser, UnFollowUser } from  "../controller/user.js" 

 


const router=express.Router() ; 

//update a single use
//delete a single user
//get a single user
router.route("/:id")
.get(GetUser)
.patch(UpdateUser)
.delete(DeleteUser) ; 

//follow a single user
router.patch("/:id/follow",FollowUser) ; 
//unfollow a single user
router.patch("/:id/unfollow",UnFollowUser) ; 
 

export default router ; 