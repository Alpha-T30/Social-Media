import Posts from "../models/postModel.js" ; 
import User from "../models/usermodel.js";

// crate a post 
export const CreatePost = (req,res) =>{ 
        const newPost =new Posts(req.body) ; 
        newPost.save((e)=>{
            if(!e) {
                res.send(newPost) ; 
            } else {
                res.send(e.message)  ; 
            }
        }) ;  
}
// update a post 
export const UpdatePost = async (req,res) =>{
    try {
        const post =await Posts.findById(req.params.id) ;
        if (post.userId===req.body.userId) {

            await post.updateOne({$set:req.body}) ; 
            res.status(200).json("updated successfully") ; 
        } else {
            res.send("This Bitch is Trying to update anyone else`s post") ; 
        }
        
    } catch (error) {
        res.send(error.message)
        
    }


}
// delete a post 

export const DeletePost = async (req,res) =>{
    try {
        const post =await Posts.findById(req.params.id) ;
        if (post.userId===req.body.userId) {

            await post.deleteOne() ; 
            res.status(200).json("Deleted successfully") ; 
        } else {
            res.send("This Bitch is Trying to update anyone else`s post") ; 
        }
        
    } catch (error) {
        res.send(error.message)
        
    }
 }


 
//lika a post 
export const LikeAPost = (req,res) =>{
    Posts.findById(req.params.id,(e,d)=>{
        if(d) {
            if(d.likes.includes(req.body.userId)) {
                d.updateOne({$pull:{likes:req.body.userId}} ,(e)=>{
                    if(!e) {
                        res.send("dislike")
                    } else {
                        res.send(e) ; 
                    }
                })
               
            } else {
                d.updateOne({$push:{likes:req.body.userId}},(e)=>{
                    if (!e) {
                        res.send("liked") ; 
                    } else { res.send(e)} 
                }) 
                
            }
        } else {
            res.send(e.message) ; 
        }
    })
}
//Get  a post 
export const GetAPost=async (req,res) =>{
    try {
        const post =await Posts.findById(req.params.id) 
        res.send(post); 
        
    } catch (error) {
        res.send(error.message) ; 
        
    }
    
}


// Get TimeLine Posts 

export const GetAllPosts=async (req,res)=> { 
    try {
        const currentuser = await User.findById(req.params.Userid) 
        const MyPosts=await Posts.find({userId:currentuser._id}) 

        const FriendsPosts =await Promise.all(currentuser.following.map((e)=>{
          return  Posts.find({userId:e}); 
        }))
        //To Do porblems // loop was not working just for return inside map
    //   const  FriendsPosts=  currentuser.following.forEach((i)=>{
    //       Posts.find({userId:i}) ; 
    //   }) ; 
        //but single id working
    // const FriendsPosts=await Posts.find({userId:currentuser.following[0]})
    const allposts = [] ; 
    MyPosts.forEach((e)=>{
        allposts.push(e) ; 
    }) ; 
    FriendsPosts.forEach((e)=>{
         e.forEach((f)=>{
             allposts.push(f) ;  
         }) 
    })
      res.send(allposts) ; 
    } catch (error) {
        res.send(error) ; 
        
    }

}


//comment on a post  
export const CommentOnPost = (req,res) =>{ 

}