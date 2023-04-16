import React from 'react';
import '../styles/Find.scss';
import { FaPlane, FaWifi, FaMoon,  FaBatteryFull, FaUser, FaComment, FaSearch, FaEllipsisH, FaAddressBook, FaQrcode, FaMobileAlt, FaEnvelope, FaBluetoothB } from "react-icons/fa"
import Header from '../components/Header';

function Find() {
  return (
    <>
    <body>
    <Header
      h1="Find" span="" a="Edit"/>  
      <hr />
      <main>
        <ul className="find_method">
          <li><a href="#"><i><FaAddressBook/></i>Find</a></li>
          <li><a href="#"><i><FaQrcode/></i>QR Code</a></li>
          <li><a href="#"><i><FaMobileAlt/></i>Shake</a></li>
          <li><a href="#"><i><FaEnvelope/></i>Invite via SMS</a></li>
        </ul>
        <section className="recommend_section">
          <header><h2>Recommended Friends</h2></header>
          <ul>
            <li>You have no recommended friends.</li>
          </ul>
        </section>
      </main>
      <hr />
      </body>
    </>
  );
};

export default Find;
