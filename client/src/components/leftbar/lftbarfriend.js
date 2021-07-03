import Style from './LeftBar.module.css'
export default function Lfriend(props) {
    return (
         <li key={props.id} className={Style.leftfriend}>
           <img src={props.lfimg} alt="" className={Style.lfimage} />
             <span className={Style.lfname}>{props.lfname}</span>
         </li>
    )
}
