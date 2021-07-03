
import bcrypt, { hash } from "bcrypt";
import User from "/home/alpha/mern_stack/Social_Media/server/models/usermodel.js";



//Get a User Info. 

export const GetUser = (req, res) => {
    User.findById(req.params.id, (e, u) => {
        if (u) {
            const {password,updatedAt,...others} =u._doc ; 
            res.status(200).json(others);
        } else {
            res.status(404).send("user not found")
        }
    }) ; 




}


//Update User , Implementing Unnecessary codes here , gonna fix this next time 
export const UpdateUser = (req, res) => {
    if (req.body.userID === req.params.id || req.body.isAdmin) {

        if (req.body.password) {

            bcrypt.hash(req.body.password, 10, (e, hash) => {
                if (!e) {

                    req.body.password = hash;
                    console.log(hash)
                    console.log(req.body.password);
                    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (e) => {
                        if (!e) {
                            res.status(200).send("Updated Successfull")
                        } else {
                            res.send(e)
                        }
                    })

                } else {
                    res.send(e);
                }
            })

        }

        else {
            User.findByIdAndUpdate(req.params.id, { $set: req.body }, (e) => {
                if (!e) {
                    res.status(200).send("Updated Successfull")
                } else {
                    res.send(e)
                }
            })
        }


    } else {
        res.status(403).send("It's not your account");
    }

}


//Delete User 

export const DeleteUser = (req, res) => {
    if (req.body.userID === req.params.id || req.body.isAdmin) {

        User.findByIdAndDelete(req.params.id, (e) => {
            if (!e) {
                res.status(200).send("Deletion Successfull")
            } else {
                res.send(e)
            }
        })


    } else {
        res.status(403).send("It's not your account");
    }

}

//Follow User // 

export const FollowUser  =async (req,res) =>{  

    try {
        if (req.body.userID!==req.params.id) {
            const followedUsr =await User.findById(req.params.id) ; 
            const courrentUser =await User.findById(req.body.userID) ; 
            if (!followedUsr.followers.includes(req.body.userID)) {
                await followedUsr.updateOne({$push:{followers:req.body.userID}}) ; 
                await courrentUser.updateOne({$push:{following:req.params.id}}) ; 
                res.status(202).json("User been followed") ; 
                

            } else {
                res.status(404).send("Already followed by You....") ; 
            }


        } else {
            res.send ("you can't follow yourself...")  ; 
        }
        
    } catch (error) {
        res.send (error.message) ; 
        
    }
    
    
}
//UnFollow User // 

export const UnFollowUser  =async (req,res) =>{  

    try {
        if (req.body.userID!==req.params.id) {
            const ufollowedUsr =await User.findById(req.params.id) ; 
            const courrentUser =await User.findById(req.body.userID) ; 
            if (ufollowedUsr.followers.includes(req.body.userID)) {
                await ufollowedUsr.updateOne({$pull:{followers:req.body.userID}}) ; 
                await courrentUser.updateOne({$pull:{following:req.params.id}}) ; 
                res.status(202).json("User been unfollowed") ; 
                

            } else {
                res.status(404).send("You don't follow this User...") ; 
            }


        } else {
            res.send ("you can't unfollow yourself...")  ; 
        }
        
    } catch (error) {
        res.send (error.message) ; 
        
    }
    
    
}