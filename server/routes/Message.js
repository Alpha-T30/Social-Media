import express from "express" ; 
import Messages from '../models/modelMessage.js';

 
const router=express.Router() ; 

router.post("/",async (req,res)=>{
    const newMessage = new Messages ({
            conversationId:req.body.conversationId,
            senderId:req.body.senderId , 
            text: req.body.text 
    });
    try {
        const message = await newMessage.save() ; 
        res.send(message) ; 
    } catch (error) {
        res.send(error) ; 
        
    } 
}); 

router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router ; 