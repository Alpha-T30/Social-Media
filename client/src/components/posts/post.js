import { MoreVert} from "@material-ui/icons";
import Style from "./post.module.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {format} from "timeago.js" ; 
 
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
 

export default function Post({post}) {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
 
  const {user:currentuser} =useContext(AuthContext) ;   
   
  const [like, setlike] = React.useState(post.likes.length);
 
 
  const [isliked, setisliked] = React.useState(false);

 useEffect(()=>{
   setlike(post.likes.includes(currentuser._id))
 },[currentuser._id,post.likes])
 

 const  reply_click_like= async  () =>{
   try {
     await  axios.patch("/posts/"+post._id+"/likes/",{userId:currentuser._id})
     
   } catch (error) {

     console.log(error)
   }
 
    setlike(isliked?like-1:like+1) ; 
   
  setisliked(!isliked) ;
 
 

}
 
const [user,setuser] =useState({}); 

useEffect(()=>{
  const fetchuser= async ()=>{
    const res=await axios.get(`/user?userid=${post.userId}`) ; 
    console.log(res) ; 
    setuser(res.data) ; 
  }
  fetchuser() ; 
},[post.userId])

  return (
    
    
    <div className={Style.post}>
      <div className={Style.postWrapper}>
        <div className={Style.postTop}>
          <div className={Style.postTopLeft}>
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture? user.profilePicture : PF+"noavater.jpg"}
                alt=""
                className={Style.postImage}
              />
            </Link>
            <Link style={{textDecoration:"none"}} to ={`/profile/${user.username}`}>
              <span className={Style.postUserName}>
                {user.username}
              </span>
            </Link>
            <span className={Style.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={Style.postTopRight}>
            <MoreVert fontSize="small" className={Style.postTopIcon}></MoreVert>
          </div>
        </div>
        <div className={Style.postCenter}>
          <span className={Style.postText}>{post.desc}</span>

          <img src={PF+post.img} alt="" className={Style.postimg} />
        </div>
        <div className={Style.postBottom}>
          <div className={Style.postBottomLeft}>
             
              <img src={PF+"like.png"} role ="button"  id="like" onClick={e =>reply_click_like(e)} alt="" className={Style.react}/>
              <img src={PF+"like.png"} role ="button"  id="dislike" onClick={e =>reply_click_like(e)} alt="" className={Style.reactdl}/>
               
         

             
            <span className={Style.reactCountlike}>
              {like} people like this post
            </span>
          </div>
          <div className={Style.postBottomRight}>
            <span className={Style.reactCount}> {post.comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
