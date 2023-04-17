import React, { useEffect, useState } from 'react';

import {FaUser, FaComment, FaSearch, FaEllipsisH,FaRegListAlt  } from "react-icons/fa";
import '../styles/Tab.scss';

import { Link, useLocation } from 'react-router-dom';

function Navigation() {

  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home'); // 상태 추가
  
  useEffect(() => {
    const currentPath = location.pathname;
    const pathName = currentPath.split('/')[1] || 'Home';
    setActiveTab(pathName);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="tab_bar">
      <ul>
        <li className={activeTab === 'Home' ? 'active' : ''} onClick={() => handleTabClick('Home')}>
          <Link to={'/Home'}><i><FaUser/></i>Friends</Link>
        </li>
        <li className={activeTab === 'Chats' ? 'active' : ''} onClick={() => handleTabClick('Chats')}>
          <Link to={'/Chats'}><i><FaComment/></i>Chats</Link>
        </li>
        <li className={activeTab === 'Timeline' ? 'active' : ''} onClick={() => handleTabClick('Timeline')}>
          <Link to={'/Timeline'}><i><FaRegListAlt/></i>Timeline</Link>
        </li>
        <li className={activeTab === 'Find' ? 'active' : ''} onClick={() => handleTabClick('Find')}>
          <Link to={'/Find'}><i><FaSearch/></i>Find</Link>
        </li>
        <li className={activeTab === 'More' ? 'active' : ''} onClick={() => handleTabClick('More')}>
          <Link to={'/More'}><i><FaEllipsisH/></i>More</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

