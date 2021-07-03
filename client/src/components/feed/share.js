import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import Style from "./Feed.module.css";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from "axios" ; 

export default function Share() {
 
   
  const user={
    username:"Enamul"
  }

  return (
    <div className={Style.share}>
      <div className={Style.sharewrapper}>
        <div className={Style.sharetop}>
          <Link to={`/profile/${user.username}`}>
           <img src="/assets/UserImages/1.jpg" alt="" className={Style.shareImage} />
             </Link>
          <input
            type="text"
            placeholder="What's on your mind"
            className={Style.shareInput}
          />
        </div>
        <hr className={Style.sharehr} />
        <div className={Style.sharebottom}>
          <div className={Style.shareoptions}>
            <div className={Style.shareoption}>
                 <PermMedia htmlColor="tomato" className={Style.shareicon} />
              <span className={Style.shareText}>
                Photo/Video
              </span>
            </div>
            <div className={Style.shareoption}>
                 < Label htmlColor="blue" className={Style.shareicon} />
              <span className={Style.shareText}>
                Tag
              </span>
            </div>
            <div className={Style.shareoption}>
                 < Room htmlColor="green" className={Style.shareicon} />
              <span className={Style.shareText}>
                Location
              </span>
            </div>
            <div className={Style.shareoption}>
                 < EmojiEmotions htmlColor="goldenrod" className={Style.shareicon} />
              <span className={Style.shareText}>
                Feelings
              </span>
            </div>
          </div>
            <button className={Style.sharebtn}>Share</button>
        </div>
      </div>
    </div>
  );
}
