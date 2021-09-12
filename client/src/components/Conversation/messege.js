import React from "react";
import Style from "./conversation.module.css";
import {format} from "timeago.js" ; 
export default function Message({messages,own}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
  
  return (
    <div className={own?Style.messageown:Style.message}>
      <div className={Style.messagetop}>
        <img src={PF+"UserImages/1.jpg"} alt="" className={Style.messageimg} />
        <div className={Style.time}>
          <p className={Style.messagebody}>{messages.text}</p>
          <div className={Style.messagebottom}>
     {format(messages.createdAt)} 
      </div>
        </div>
      </div>
     
    
    </div>
  );
}
 