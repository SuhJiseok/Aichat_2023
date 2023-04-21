import React, { createRef } from 'react';
import '../styles/Chats.scss';
import {  FaComment, FaSearch,FaPlane, FaWifi, FaMoon, FaBluetoothB,FaBatteryFull, FaCog,} from "react-icons/fa"
import Header from '../components/Header';
import infoData from '../routes/Info.json';
import { Link } from 'react-router-dom';

function Chats() {
  const userRefs = infoData.map(()=> createRef());
  const handleUserClick = (index) => {
    const selectedUser = infoData[index];
    console.log("Selected user:", selectedUser);
  };


  return (
    <>
    <body>
    <Header
      h1="Chats" span="" a="Edit"/>
      <hr />
      <main>
        <form className="search_box">
          <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <i><FaSearch/></i>
            <input type="search" name="search" id="search" placeholder="Find friends,
      chats, Plus Friends" />
          </fieldset>
        </form>
        <section className="main_section">
          <header className="blind"><h2>Friends</h2></header>
          <ul>
          {infoData.map((user, index) => (
              <li key={user.id} ref={userRefs[index]} onClick={() => handleUserClick(index)}>
                 <Link to={'/Chatting'} state={{friendname: user.name, friendimage: user.images}}  >
                  <span className="chatts_img"><img src={user.images} alt={user.name}/></span>
                  <span className="chats_cont">
                    <span className="chats_name">{user.name}</span>
                    <span className="chats_latest">Hello! This is a test message!</span>
                  </span>
                  <span className="chats_time"><span>15</span>:<span>33</span></span>     
               </Link> 

              </li>
            ))}
          </ul>
        </section>
        <div className="chat_fa_btn">
          <a href="#">
          <i><FaComment/></i>
          </a>
        </div>
      </main>
      <hr />
      </body>
    </>
  );
};

export default Chats;