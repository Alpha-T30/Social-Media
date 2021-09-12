import { Cancel, DataUsageSharp, EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import Style from "./Feed.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
 
import { useRef } from "react";
 

export default function Share() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setfile] = useState(null);
  
  const submitHandler =async (e) =>{
    e.preventDefault() ; 
    var newpost = {
      desc:desc.current.value , 
      userId:user._id,
    }
    if (file) {

      
      const fileName= Date.now()+file.name; 
      newpost.img=fileName;


      const data = new FormData() ;
      data.append("name",fileName); 
       data.append("file",file); 
      
      try {
        await axios.post("/upload",data); 
         
      } catch (error) {
        console.log(error) ; 
        
      }

    }
   
    
    try {
      await axios.post("/posts",newpost) ; 
      window.location.reload() ; 
    } catch (error) {
      console.log(error) ; 
      
    }
   
  

  }

  return (
    <div className={Style.share}>
      <div className={Style.sharewrapper}>
        <div className={Style.sharetop}>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : PF+"noavater.jpg"
              }
              alt=""
              className={Style.shareImage}
            />
          </Link>
          <input
            type="text"
            placeholder={"What's on your mind " + user.username + "?"}
            className={Style.shareInput}
            ref={desc}
          />
        </div>
        <hr className={Style.sharehr} />
      {file&& (
        <div className={Style.sharedimgcontainer}>
          <img src={URL.createObjectURL(file)} alt="" className={Style.sharedimg} />
          <Cancel  style={{ fontSize: 40 }}   className={Style.cancle} onClick={()=>{
            setfile(null)
          }}></Cancel>
        </div>
      )}
        <form onSubmit={submitHandler} className={Style.sharebottom}>
          <div className={Style.shareoptions}>
            <label htmlFor="file" className={Style.shareoption}>
              <PermMedia htmlColor="tomato" className={Style.shareicon} />
              <span className={Style.shareText}>Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  setfile(e.target.files[0]);
                }}
              />
            </label>
            <div className={Style.shareoption}>
              <Label htmlColor="blue" className={Style.shareicon} />
              <span className={Style.shareText}>Tag</span>
            </div>
            <div className={Style.shareoption}>
              <Room htmlColor="green" className={Style.shareicon} />
              <span className={Style.shareText}>Location</span>
            </div>
            <div className={Style.shareoption}>
              <EmojiEmotions
                htmlColor="goldenrod"
                className={Style.shareicon}
              />
              <span className={Style.shareText}>Feelings</span>
            </div>
          </div>
          <button type="submit" className={Style.sharebtn}>Share</button>
        </form>
      </div>
    </div>
  );
}
