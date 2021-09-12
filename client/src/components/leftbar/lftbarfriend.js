import { useEffect, useState } from 'react';
import Style from './LeftBar.module.css'; 
import axios from 'axios' ; 
export default function Lfriend(props) {


  const  PF=process.env.REACT_APP_PUBLIC_FOLDER ; 

 
  const General = ()=>{
    return(
      <div key={props.id} className={Style.leftfriend}>
      <img src={props.lfimg} alt="" className={Style.lfimage} />
        <span className={Style.lfname}>{props.lfname}</span>
    </div>
    )
  }

  const Formessenger=() =>{
    const [user,setuser] = useState(null) ; 
    console.log(user)
  
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
    },[])
    return (
      <div key={props.id} className={Style.leftfriend}>
      <img src={user?(user.profilePicture?user.profilePicture:PF+"noavater.jpg"):PF+"noavater.jpg"} alt="" className={Style.lfimage} />
        <span className={Style.lfname}>{user?user.username:null}</span>
    </div>
    )
  }
    return <>
       { props.isformessenger? <Formessenger></Formessenger> : <General></General> }
    </>
}
