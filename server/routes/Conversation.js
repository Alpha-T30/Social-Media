import express from "express" ; 
import Conversation from '../models/modelConversation.js';
 
 
 
const router=express.Router() ; 

router.post("/",(req,res)=>{
    try {
        const newConversation = new Conversation({
            members:[req.body.senderId,req.body.receiverId] , 
        }) ; 

        newConversation.save((e)=>{
            if(e) {
                res.status(500).send(e) ; 
            } else{
                res.status(200).send(newConversation); 
            }
        })
        
    } catch (error) {
        res.status(500).send(error); 
        
    }
}) ; 


router.get("/:userId",async (req,res)=>{
        try {
            const conv =await Conversation.find({
                members:{$in:[req.params.userId]}
            }) ; 
            res.send(conv)
        } catch (error) {
            res.send(error)
            
        }
}) ; 

router.get("/find/:fistId/:secondId",async(req,res)=>{
    try {
        const conversation= await Conversation.findOne({
            members:{$all :[req.params.fistId,req.params.secondId]}
        }) ; 
        res.status(200).json(conversation) ; 
    } catch (error) {
        res.send(error) ; 
        
    }

})

export default router ; 