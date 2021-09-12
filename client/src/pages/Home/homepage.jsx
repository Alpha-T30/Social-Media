import Style from "./homepage.module.css";
import React from "react";
import TopBar from '../../components/topBar/tobbar';
import LeftBar from '../../components/leftbar/LeftBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';

export default function Homepage() {
  return (
    <>
     <TopBar homepage></TopBar>

      <div className={Style.homepagecontainer}>
      < LeftBar/>  
      < Feed/>
      < RightBar></RightBar>
      </div>
    </>
  );
}
