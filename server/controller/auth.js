import User from "../models/usermodel.js"
import bcrypt from "bcrypt";

const saltRounds = 10;

 

//Register// 

export const createUser =async (req, res) => {
   
   try {
    const salt=await bcrypt.genSalt(10) ; 
    const hash = await bcrypt.hash(req.body.password,salt) ; 
    const newUser =new User ({
        username:req.body.username,
        email:req.body.email,
        password:hash
    }) ; 
       const user =await newUser.save() ; 
       res.status(200).json (user) ; 

       
   } catch (error) {
       res.send(error.message) ; 
       
   }

      
 
}


//Login//

export const logInUser =(req,res)=>{
    const email=req.body.email ; 
    const password =req.body.password; 
    User.findOne({email:email},(err,foundUser)=>{
        if(foundUser) {
            bcrypt.compare(password,foundUser.password, function(err, result) {
                 if (result) {
                     res.status(200).json(foundUser) ; 
                 } else if(result===false) {

                     res.send("Worng Password")
                 }  else {res.send(err)}
            }); 
        } else{
            res.status(404).send("User Not Found") ; 
        }

    })

}