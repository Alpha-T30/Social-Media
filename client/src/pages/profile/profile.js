import TopBar from "../../components/topBar/tobbar";
import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import Style from "./profile.module.css";
 

export default function Profile() {
   
  return (
    <>
      <TopBar></TopBar>

      <div className={Style.profile}>
        <LeftBar />
        <div className={Style.container}>
          <div className={Style.profileRightTop}>
            <div className={Style.topimages}>
              <img src="/assets/posts/3.jpg" alt="" className={Style.coverphoto} />
              <img src="/assets/UserImages/1.jpg" alt="" className={Style.profilepicture} />
            </div>
            <div className={Style.userinfo}>
              <h4 className={Style.username}>Enamul</h4>
              <span className={Style.bio}>DengerDengerDengerDengerDengerDenger</span>

            </div>
          </div>
          <div className={Style.profileRightBottom}>
             <Feed slidebar={true}/>
            <RightBar profile={true}></RightBar>
          </div>
        </div>
      </div>
    </>
  );
}