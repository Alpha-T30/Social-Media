import Style from "./RightBar.module.css";

export default function Following(props) {
   

    return (
        <div className={Style.following}>
         <img src={props.followimg} alt="" className={Style.fimg} />
         <span className={Style.fname}>{props.followname}</span>
       </div>
    )
}
