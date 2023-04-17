import React from 'react';
import '../styles/More.scss';

import { FaPlane, FaWifi, FaMoon, FaBatteryFull, FaCog, FaSmile, FaPaintBrush, FaHandPeace, FaUserCircle, FaUtensils, FaHome, FaTv, FaPen, FaGraduationCap, FaBuilding, FaWonSign, FaVideo, FaUser, FaComment, FaSearch, FaEllipsisH, FaBluetoothB } from "react-icons/fa"
import Header from '../components/Header';
const defaultImageURL = "../images/bg_default.png";

function More({userObj}) {
  return (
    <>
    <body>
    <Header
      h1="More" span="1" a="" i=<FaCog/> />     
      <hr />
      <main>
        <section className="user_info">
          <h2 className="blind">사용자 정보</h2>
          <span className="profile_img empty"><img
                className="profile_img"
                src={userObj ? userObj.photoURL || defaultImageURL : defaultImageURL}
                alt="Profile"
              /></span>
          <span className="profile_info">
          <span className="profile_name">{userObj.displayName || "My name"}</span>
            <span className="profile_email">Userid@gmail.com</span>
          </span>
          <span className="chat_img"><a href="#"><i><FaComment/></i></a></span>
        </section>
        <section className="user_menu">
          <h2 className="blind">사용자 메뉴</h2>
          <ul>
            <li><a href="#"><i><FaSmile/></i>Emoticons</a></li>
            <li><a href="#"><i><FaPaintBrush/></i>Themes</a></li>
            <li><a href="#"><i><FaHandPeace/></i>Plus Friends</a></li>
            <li><a href="#"><i><FaUserCircle/></i>Account</a></li>
          </ul>
        </section>
        <section className="plus_friends">
          <header>
            <h2>Plus Friends</h2>
            <span><i><FaUserCircle/></i>Learn More</span>
          </header>
          <ul className="plus_list">
            <li><a href="#"><i><FaUtensils/></i>Order</a></li>
            <li><a href="#"><i><FaHome/></i>Store</a></li>
            <li><a href="#"><i><FaTv/></i>TV Channel/Radio</a></li>
            <li><a href="#"><i><FaPen/></i>Creation</a></li>
            <li><a href="#"><i><FaGraduationCap/></i>Education</a></li>
            <li><a href="#"><i><FaBuilding/></i>Politics/Society</a></li>
            <li><a href="#"><i><FaWonSign/></i>Finance</a></li>
            <li><a href="#"><i><FaVideo/></i>Movies/Music</a></li>
          </ul>
        </section>
        <section className="more_app">
          <h2 className="blind">앱 더보기</h2>
          <ul>
            <li><a href="#"><span className="app_icon"></span>Kakao Story</a></li>
            <li><a href="#"><span className="app_icon"></span>Path</a></li>
            <li><a href="#"><span className="app_icon"></span>Kakao friends</a></li>
          </ul>
        </section>
      </main>
      <hr />
      {/* <nav className="tab_bar">
        <ul>
          <li><a href="Home.js"><i><FaUser/></i>Friends</a></li>FaSmile
          <li><a href="Chats.js"><i><FaComment/></i>Chats</a></li>
          <li><a href="Find.js"><i><FaSearch/></i>Find</a></li>
          <li><a href="More.js"><i><FaEllipsisH/></i>More</a></li>
        </ul>
      </nav> */}
      </body>
    </>
  );
};

            export default More;
            
