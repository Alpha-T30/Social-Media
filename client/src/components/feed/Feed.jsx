import { useState } from "react";
import { useEffect } from "react";
import Style from "./Feed.module.css";
import Share from "./share";
import axios from 'axios' ; 
import Post from '../posts/post';


export default function Feed(props) { 
  const [posts,setposts] =useState([]) ; 

  useEffect(()=>{
    const fetchposts= async ()=>{
      const res=await axios.get("/posts/timeline/60cccd0de6ec0081e28b9011") ; 
      console.log(res) ; 
      setposts(res.data) ; 
    }
    fetchposts() ; 
  },[])
 
  return <> 
   
      <div className={props.slidebar?Style.feedprofile:Style.feed}>
        <div className={Style.feedWrapper}>
          <Share> </Share>
          
          

        {posts.map((p)=>{
        return   <Post post={p}></Post>
        })}
        
          
        </div>
      </div>
    
    </>;
}
 