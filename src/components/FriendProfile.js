import React, { useEffect, useState } from 'react';
import { FaPlane, FaWifi, FaMoon, FaUser, FaComment, FaPen, FaBluetoothB, FaBatteryFull, FaEdit, FaPlus, FaTimes} from "react-icons/fa";
import {HiXMark} from "react-icons/hi2";
import '../styles/Profile.scss';
import {  useNavigate, useLocation, Link } from 'react-router-dom';


function FriendProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [displayName, setDisplayName] = useState('');
  //실시간 시간표시
  const [currentTime, setCurrentTime] = useState(new Date());

  //이미지 상태 추가

  //배경이미지 변경
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
 
  useEffect(() => {
    if (location.state) {
      setDisplayName(location.state.name);
      setProfileImageUrl(location.state.image);
      // setBackgroundImageUrl(location.state.backgroundImageUrl); // You can add background image as well if you have one
    } 
  }, [location.state]);


  return (
    <>
    <body>
    <header className="profileheader">
    <div className="status_bar">
      <div className="left_item">
        <i><FaPlane/></i>
        <i><FaWifi/></i>
      </div>
      <div className="center_item">
        <span>
         {currentTime.getHours().toString().padStart(2, '0')}
        </span>
         <span className='blink'>:</span>
        <span>
         {currentTime.getMinutes().toString().padStart(2, '0')}
        </span>
      </div>
      <div className="right_item">
        <i><FaMoon/></i>
        <i><FaBluetoothB/></i>
        <span><span>100</span>%</span>
        <i><FaBatteryFull/></i>
      </div>
    </div>
    <div className="title_bar">
      <div className="left_item"> <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}><i><HiXMark/></i></a></div>
      <div className="right_item"><a href="#"><i><FaUser/></i></a></div>
    </div>
    </header>
    <hr/>
    <main>
      <section className="background" style={{ backgroundImage: `url(${backgroundImageUrl || '../images/bg_default.png'})` }}>
        <h2 className="blind">My profile background image</h2>
      </section>
      <section className="kprofile">
        <h2 className="blind">My profile info</h2>
        <div className="kprofile_img" style={{ backgroundImage: `url(${profileImageUrl})` }}></div>
        <div className="kprofile_cont">
          <span className="kprofile_name">{displayName ? `${displayName}의 Profile` : "Profile"}</span>
          <input type="mail" className="kprofile_email" placeholder="UserID@gmail.com" />
          <ul className="kprofile_menu">
            <li>
              <a href="#">
                <span className="icon">
                  <i><FaComment/></i>
                </span>
              </a>
            </li>
          </ul>
         
        </div>
    
      </section>
    </main>
    </body>
      </>
  );
};

export default FriendProfile