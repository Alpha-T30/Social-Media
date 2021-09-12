import Style from "./RightBar.module.css";
import { Link } from 'react-router-dom';

export default function Following({Fuser}) {
   
    const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
     console.log(Fuser)

    return (
        <>
        <Link to={"/profile/"+Fuser.username} style={{textDecoration:"none", color:"black"}}>
        <div className={Style.following}>
         <img src={Fuser.profilePicture || PF+"noavater.jpg"} alt="" className={Style.fimg} />
         
         <span className={Style.fname}>{Fuser.username}</span>
       </div>
    </Link>
       </>
    )
}
