import Style from "./topbar.module.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <div className={Style.topBarContainer}>  
      <div className={Style.topBarLeft}>
        <Link to="/" style={{textDecoration:"none"}}><span className={Style.logo}>UnSocial Media</span></Link>
      </div>
      <div className={Style.topBarCenter}>
        <div className={Style.searchBar}>
          <Search className={Style.searchIcon} />
          <input
            placeholder="Search for Friends,Posts...."
            className={Style.searchInput}
          />
        </div>
      </div>
      <div className={Style.topBarRight}>
        <div className={Style.topBarLinks}>
          <span className={Style.topBarLink}>HomePage</span>
          
          <span className={Style.topBarLink}>TimeLine</span>
        </div>
        <div className={Style.topBarIcons}>
          <div className={Style.topbarIcon}>
            <Person style={{ fontSize: 21 }} />
            <span className={Style.personCounter}>1</span>
          </div>
          <div className={Style.topbarIcon}>
            <Chat style={{ fontSize: 21 }} />
            <span className={Style.personCounter}>1</span>
          </div>
          <div className={Style.topbarIcon}>
            <Notifications style={{ fontSize: 21 }} />
            <span className={Style.personCounter}>1</span>
          </div>
        </div>
        <img
          src="/assets/UserImages/1.jpg"
          alt=""
          className={Style.topbarImage} 
        />
      </div>
      
    </div>
  );
}
