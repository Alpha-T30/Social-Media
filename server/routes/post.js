import express from "express" ; 
import {GetAPost,CreatePost,UpdatePost,DeletePost,LikeAPost,CommentOnPost,GetAllPosts} from  "../controller/post.js"; 

const router=express.Router() ; 

//create a post 

router.post("/",CreatePost) ; 

router.patch("/:id",UpdatePost) ; 

router.delete("/:id",DeletePost) ; 

router.patch("/:id/likes",LikeAPost) ; 

router.get("/:id",GetAPost) ; 

router.get("/timeline/:Userid",GetAllPosts) ; 

//get user's posts // 

 

export default router ; 