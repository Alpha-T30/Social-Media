import Style from "./RightBar.module.css";
import ActiveUser from "./activUser";
import { Users } from "../../dummyData";
import Following from './following';
 
 
 

export default function RightBar(profile) {

  const HomeRightBar=()=>{
    return (
      <>
      <div className={Style.birthdayContainer}>
          <img
            src="/assets/birthday.png"
            alt=""
            className={Style.birthdayimage}
          />
          <span className={Style.birthdaystring}>
            <b>Enamul's </b>and <b>4 others</b> have Birthday today wish them
          </span>
        </div>
        <img src="/assets/ad.jpg" alt="" className={Style.ad} />
        <h4 className={Style.onlinefriends}>Active Friends</h4>
        

        {Users.map((d) => {
          return <ActiveUser name={ d.name} key={ d.id} dp={ d.dp}></ActiveUser>;
        })}
        </>
    )
  }

  const ProfileRightBar=()=>{
    return(
      <>
      <h4 className={Style.InfoTitle}>User Info.</h4>
      <div className={Style.rightBarinfo}>
        <div className={Style.rightbarinfoItem}>
          <span className={Style.rightbarinfokey}>City:</span>
          <span className={Style.rightbarinfokeyy}>New York</span>
        </div>
        <div className={Style.rightbarinfoItem}>
          <span className={Style.rightbarinfokey}>From:</span>
          <span className={Style.rightbarinfokeyy}>Bangladesh</span>
        </div>
        <div className={Style.rightbarinfoItem}>
          <span className={Style.rightbarinfokey}>Relationship:</span>
          <span className={Style.rightbarinfokeyy}>Single</span>
        </div>
      </div>
      <h4 className={Style.InfoTitlef}>User Followings:</h4>
      <div className={Style.rightbarfollowings}>
        {Users.map((u)=>{
          return(< Following followimg={u.dp} followname={u.name}></Following>)
        })}
       
         
        </div>


      </>
    )
  }
  return (
    <div className={Style.rightbar}>
      <div className={Style.rightBarWrapper}>
        {profile.profile?<ProfileRightBar/>:<HomeRightBar/>}
      </div>
    </div>
  );
}
