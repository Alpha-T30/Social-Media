import Style from "./RightBar.module.css";
import { useState, useEffect } from 'react';
import axios from "axios" ; 
export default function ActiveUser({onlineUsers,setCurrentChat,currentId}) {

    const PF=process.env.REACT_APP_PUBLIC_FOLDER; 

    const [Friends, setFriends] = useState([]) ; 
    const [Onlinefriends, setOnlinefriends] = useState([]) ; 
    console.log("the friends>>",Friends,"active f>>", Onlinefriends,"online users",onlineUsers) ; 
    
    useEffect(()=>{
        const getfriends = async () =>{
           const  res= await axios.get("/friends/"+currentId) ; 
           setFriends(res.data) ; 
        }
        getfriends() 
    },[currentId]) 
   
useEffect(()=>{
    setOnlinefriends(Friends.filter(f=>onlineUsers.includes(f._id)))
},[onlineUsers,Friends]) ; 

const handleClick = async (user) =>{
    const res = await axios.get(`/conversation/find/${currentId}/${user._id}`) ; 

    setCurrentChat(res.data) ; 
    
}
    return (
        <div>
            {Onlinefriends.map((o)=>{
                return (
                    <>
                       <div onClick={()=>{handleClick(o)}} className={Style.activefriends}>
        <img src={o?.profilePicture?o.profilePicture:PF+"noavater.jpg"} alt="" className={Style.activeimage} />
        <span className={Style.activeusername}>{o?.username}</span>
        <div className={Style.greensignal}></div>
    </div>
                    </>
                )
            })}
        </div>
        
     
    )
}
