import { useContext, useState } from "react";
import { useEffect } from "react";
import Style from "./Feed.module.css";
import Share from "./share";
import axios from 'axios' ; 
import Post from '../posts/post';
import { AuthContext } from '../../context/AuthContext';


export default function Feed(props) { 
  const {user} =useContext(AuthContext) ; 
  const [posts,setposts] =useState([]) ; 
  
  

  useEffect(()=>{
    const fetchposts= async ()=>{ 
       
      if (props.username) {
       const res = await  axios.get("/posts/userposts/"+props.username); 
       setposts([].slice.call(res.data).sort((p1,p2)=>{
         return new Date(p2.createdAt) - new Date(p1.createdAt)
       })) ; 
      } 
      else{

        const res=await  axios.get("/posts/timeline/"+user._id) ; 
        console.log(res.data)
        setposts([].slice.call(res.data).sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })) ; 
      }
       
    }
    fetchposts() ; 
  },[props.username , user._id]) ; 
 
 
  return <> 
   
      <div className={props.slidebar?Style.feedprofile:Style.feed}>
        <div className={Style.feedWrapper}>
          {(!props.username || props.username===user.username)&&<Share/> }
         
          
          

        {posts.map((p)=>{
        return <Post post={p}></Post>
        })}
        
          
        </div>
      </div>
    
    </>;
}
 