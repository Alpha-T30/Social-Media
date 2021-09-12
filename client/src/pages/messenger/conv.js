import { useEffect, useState } from 'react';
import Style from './conv.module.css'; 
import axios from 'axios' ; 
 

import React from 'react'

export default function Conv(props) {
  const  PF=process.env.REACT_APP_PUBLIC_FOLDER ; 


    const [user,setuser] = useState(null) ; 
    
  
    useEffect(()=>{
          const friendid = props.conversation.members.find(m=>m!==props.currentuser._id) ; 
          const findfriendpro = async() =>{
            try {
              const res = await axios.get("/user?userid="+friendid) ; 
              setuser(res.data); 
               
  
              
            } catch (error) {
              console.log(error)
              
            }
          }
          findfriendpro() ; 
    },[ props.conversation.members,props.currentuser._id]) ; 
    return ( <>
        <div key={props.id} className={Style.leftfriend}>
        <img src={user?(user.profilePicture?user.profilePicture:PF+"noavater.jpg"):PF+"noavater.jpg"} alt="" className={Style.lfimage} />
          <span className={Style.lfname}>{user?user.username:null}</span>
      </div> </>
      )
}
