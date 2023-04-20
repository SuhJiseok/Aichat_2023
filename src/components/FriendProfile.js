import React, { useEffect, useState } from 'react';
import { FaPlane, FaWifi, FaMoon, FaUser, FaComment, FaPen, FaBluetoothB, FaBatteryFull, FaEdit, FaPlus, FaTimes} from "react-icons/fa";
import {HiXMark} from "react-icons/hi2";
import '../styles/Profile.scss';
import {  useNavigate, useLocation, Link, Navigate } from 'react-router-dom';


function FriendProfile() {

const {friendname, friendimage} = useLocation().state
console.log(useState().state)
const navigate = useNavigate();

//시간표시
const [currentTime, setCurrentTime] = useState(new Date());

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
    <section className="background" >
      <h2 className="blind">My profile background image</h2>
    </section>
    <section className="kprofile">
      <h2 className="blind">My profile info</h2>
      <div className="kprofile_img" style={{backgroundImage: `url(${friendimage})`}}></div>
      <div className="kprofile_cont">
        <span className="kprofile_name">{friendname}</span>
        <input type="mail" className="kprofile_email" placeholder="UserID@gmail.com" />
        <ul className="kprofile_menu">
          <li>
            <Link to={'/Chatting'}>
            <a href="#">
              <span className="icon">
                <i><FaComment/></i>
              </span>
            </a>
            </Link>
          </li>

        </ul>
      </div>


    
  
    </section>
  </main>
  </body>
    </>
);
}

export default FriendProfile;
{/* <div>
<h1>{friendname}</h1>
<img src={friendimage} alt={friendname} />
</div> */}