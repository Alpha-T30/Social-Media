import TopBar from "../../components/topBar/tobbar";
import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import Style from "./profile.module.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
 

export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
  const params = useParams()
  console.log(params.username.length); 

  
  const [user,setuser] =useState({}); 
  

  useEffect(
    ()=>{
      const fetchUser=async ()=>{
        const res =await axios.get(`/user?username=${params.username}`) ; 
       
     
        setuser(res.data) ; 
        
      } 
      fetchUser(); 
    },[params.username]
  )
   
  return (
    <>
      <TopBar></TopBar>

      <div className={Style.profile}>
        <LeftBar user />
        <div className={Style.container}>
          <div className={Style.profileRightTop}>
            <div className={Style.topimages}>
              <img src={user.coverPicture || PF+"cover.jpg"} alt="" className={Style.coverphoto} />
              <img src={user.profilePicture || PF+"noavater.jpg"} alt="" className={Style.profilepicture} />
            </div>
            <div className={Style.userinfo}>
              <h4 className={Style.username}>{user.username}</h4>
              <span className={Style.bio}>{user.desc}</span>

            </div>
          </div>
          <div className={Style.profileRightBottom}>
             <Feed username={params.username} slidebar={true}/>
            <RightBar   user={user}></RightBar>
          </div>
        </div>
      </div>
    </>
  );
}