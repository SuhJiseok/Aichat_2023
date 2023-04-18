import React, { useState, useEffect } from 'react';
import '../styles/Main.scss';
import { FaPlane, FaWifi, FaMoon, FaBluetoothB,FaBatteryFull, FaCog,  FaSearch,  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import Background from 'components/Background';
import infoData from '../routes/Info.json';

const defaultImageURL = "../images/bg_default.png";

function Home({ userObj }) {

  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>

    <body>
      <Header
        h1="Friend" span="1" a="Manage" i={<FaCog />}/>
      <hr />
      <main>
        <form className="search_box">
          <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <i><FaSearch/></i>
            <input type="search" name="search" id="search" placeholder="Find friends, chats, Plus Friends" />
          </fieldset>
        </form>
        <section className="main_section">
          <header><h2>My Profile</h2></header>
          <ul>
            <li>
                <a href="#">
                <Link to="/profile">
                  <img
                className="profile_img"
                src={userObj ? userObj.photoURL || defaultImageURL : defaultImageURL}
                alt="Profile"
              /></Link>
                  <span className="profile_name">{userObj.displayName || "My name"}</span>
                </a>

            </li>
            <li>
              <a href="#">
                <span className="profile_img empty"></span>
                <span className="profile_name">Friends' Name</span>
              </a>
            </li>
          </ul>
        </section>
        <section className="main_section">
          <header><h2>Friends</h2></header>
          <ul>
          {infoData.map((user) => (
                <>
                  <li key={user.id}>
                    <Link to={{ pathname: '/FriendProfile', state: { name: user.name } }}>
                      <span className="profile_img"><img src={user.images} alt={user.name}/></span>
                      <span className="profile_name">{user.name}</span>
                      <span className="profile_messages">Have a good day, See you soon.</span>
                    </Link>
                  </li>
                </>
              ))}
            </ul>
        </section>
      </main>
      <hr />
      </body>
   
    </>

);
};

export default Home;