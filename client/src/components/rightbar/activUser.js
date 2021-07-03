import Style from "./RightBar.module.css";

export default function ActiveUser(props) {
 

    return (
        <div className={Style.activefriends}>
        <img src={props.dp} alt="" className={Style.activeimage} />
        <span className={Style.activeusername}>{props.name}</span>
        <div className={Style.greensignal}></div>
    </div>
    )
}
