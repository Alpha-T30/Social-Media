import Style from "./LeftBar.module.css"; 

export default function SidebarItem(props) {
    return (
        <li key={props.id} className={Style.sidebarItem}>
        <props.icon className={Style.sidebarIcon}/> 
        <span className={Style.sidebarIconName}>{props.iconName}</span>
    </li>
    )
}
