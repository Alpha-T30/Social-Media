import Style from "./RightBar.module.css";
import ActiveUser from "./activUser";

import Following from "./following";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";
import { Add, Remove } from "@material-ui/icons"; 

export default function RightBar({ user }) {
  const params = useParams();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentuser, dispatch } = useContext(AuthContext);



  const [Followed, setFollowed] = useState(currentuser.following.includes(user?._id));

  const [Friends, setFriendList] = useState([]);
  
 
 
   useEffect(()=>{
     setFollowed(currentuser.following.includes(user?._id))
   },[currentuser,user])
 
  useEffect(() => {
    const getFriends = async () => {
      try {
        
        const FriendList = await axios.get("/friends/" + user._id);
        
        setFriendList(FriendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  const followhandler = async () => {
    try {
      if (Followed) {
        await axios.patch("/user/" + user._id + "/unfollow", {
          userID: currentuser._id,
        });

        dispatch({ type: "unfollow", payload: user._id });
        setFollowed(!Followed);
      } else {
        await axios.patch("/user/" + user._id + "/follow", {
          userID: currentuser._id,
        });
        currentuser.following.push(user._id);
        dispatch({ type: "follow", payload: user._id });
        setFollowed(!Followed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className={Style.birthdayContainer}>
          <img
            src={PF + "birthday.png"}
            alt=""
            className={Style.birthdayimage}
          />
          <span className={Style.birthdaystring}>
            <b>Enamul's </b>and <b>4 others</b> have Birthday today wish them
          </span>
        </div>
        <img src={PF + "ad.jpg"} alt="" className={Style.ad} />
        <h4 className={Style.onlinefriends}>Active Friends</h4>

        {Users.map((d) => {
          return (
            <ActiveUser name={d.name} key={d.id} dp={PF + d.dp}></ActiveUser>
          );
        })}
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {currentuser.username !== params.username ? (
          <button className={Style.followbtn} onClick={followhandler}>
            <span>{Followed ? "Unfollow" : "Follow"}</span>
            {Followed ? <Remove /> : <Add />}
          </button>
        ) : null}
        <h4 className={Style.InfoTitle}>User Info.</h4>
        <div className={Style.rightBarinfo}>
          <div className={Style.rightbarinfoItem}>
            <span className={Style.rightbarinfokey}>City:</span>
            <span className={Style.rightbarinfokeyy}>{user.city}</span>
          </div>
          <div className={Style.rightbarinfoItem}>
            <span className={Style.rightbarinfokey}>From:</span>
            <span className={Style.rightbarinfokeyy}>{user.homeTown}</span>
          </div>
          <div className={Style.rightbarinfoItem}>
            <span className={Style.rightbarinfokey}>Relationship:</span>
            <span className={Style.rightbarinfokeyy}>
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Mingle"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className={Style.InfoTitlef}>User Followings:</h4>
        <div className={Style.rightbarfollowings}>
          {Friends.map((u) => {
            return <Following Fuser={u}></Following>;
          })}
        </div>
      </>
    );
  };
  return (
    <div className={Style.rightbar}>
      <div className={Style.rightBarWrapper}>
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
