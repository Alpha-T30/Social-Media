import Style from "./LeftBar.module.css";
import {
  Bookmark,
  Chat,
  Event, 
  Group,
  QuestionAnswer,
  RssFeed,
  VideocamSharp,
  WorkOutline,
} from "@material-ui/icons";
import SidebarItem from "./sideBarItem";
import Lfriend from './lftbarfriend';
import { LeftFriends } from './leftFriends';

export default function LeftBar() {
  return (
    <div className={Style.leftbar}>
      <div className={Style.sidebarWrapper}>
        <ul className={Style.sidebarList}>
          <SidebarItem  key={1} id={1} icon={RssFeed} iconName={"Feed"} />
          <SidebarItem  key={2} id ={2} icon={Bookmark} iconName={"Bookmark"} />
          <SidebarItem  key={3} id ={3} icon={Chat} iconName={"Chat"} />
          <SidebarItem  key={4} id ={4} icon={Event} iconName={"Event"} />
          <SidebarItem  key={5} id ={5} icon={Group} iconName={"Group"} />
          <SidebarItem  key={6} id ={6} icon={QuestionAnswer} iconName={"Questions"} />
          <SidebarItem  key={7} id ={7} icon={VideocamSharp} iconName={"Video"} />
          <SidebarItem  key={8} id ={8} icon={WorkOutline} iconName={"Job"} /> 
        </ul>
        <button className={Style.showmore}>Show More</button>
        <hr className={Style.lineOne}/>
        <ul className={Style.leftbarfriend}>
         { LeftFriends.map ((e ,i)=>{
            
         return  (<Lfriend key={i} id={i}  lfimg={e.imgUrl} lfname={e.name}></Lfriend>)
          })}
          
        </ul>
      </div>
    </div>
  );
}
