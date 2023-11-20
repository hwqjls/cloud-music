import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Top, Tab, TabItem } from './style';
import Player from '../Player';

function Home() {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to='/recommend' className={({ isActive }) => isActive ? "selected" : ""}><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to='/singers' className={({ isActive }) => isActive ? "selected" : ""}><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to='/rank' className={({ isActive }) => isActive ? "selected" : ""}><TabItem><span>榜单</span></TabItem></NavLink>
      </Tab>
      <Player></Player>

      <Outlet />
    </div>
  )
}

export default React.memo(Home)