import Style from "./topbar.module.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function TopBar({homepage}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER ; 
    
  const {user,dispatch} = useContext(AuthContext)  ; 

  const logout = () =>{
   dispatch( {
    user: null,
  
    isFetching: false,
    error: false,
  }) ; 
  localStorage.setItem("currentuser", JSON.stringify({
    user: null,
  
    isFetching: false,
    error: false,
  }));
  window.location.reload() ; 
   
  }

  return (
    <div className={Style.topBarContainer}>  
      <div className={Style.topBarLeft}>
        <Link to="/" style={{textDecoration:"none"}}><span className={Style.logo}>UnSocial Media</span></Link>
       {homepage && <button  className={Style.logoutbtn}  onClick={logout}>Logout<ExitToAppIcon/></button>}
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
          <Link style={{
            color:"white" 
          }} to = {"/messenger/"}>
            <div  className={Style.topbarIcon}>
              <Chat style={{ fontSize: 21 }} />
              <span className={Style.personCounter}>1</span>
            </div>
          </Link>
          <div className={Style.topbarIcon}>
            <Notifications style={{ fontSize: 21 }} />
            <span className={Style.personCounter}>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img
          src={user.profilePicture?user.profilePicture:PF+"noavater.jpg"}
          alt=""
          className={Style.topbarImage} 
        /> </Link>
      </div>
      
    </div>
  );
}
