import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatting.scss';
import { FaPlane, FaWifi, FaMoon, FaSmile,FaSearch, FaBars, FaPlus,FaMicrophone, FaBluetoothB, FaBatteryFull, FaAngleLeft } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from 'fbase';

function Chatting({userObj}) {
  const [messages, setMessages] = useState([]);
  const inputField = useRef(null);

  const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
  });
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const handleClick = async () => {
    const userMessage = inputField.current.value;
    console.log("User message:", userMessage);
    inputField.current.value = "";

  
    // 사용자 메시지 저장
    await addDoc(collection(db, "chats"), {
      type: "my",
      text: userMessage,
      createdAt: Date.now(),
      creatorId: userObj.uid
    });
  
    openai
      .post("", {
        prompt: userMessage,
        temperature: 0.73,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then(async (response) => {
        const botMessage = response.data.choices[0].text.trim();
        console.log("Bot message:", botMessage);
  
        // 챗봇 메시지 저장
        await addDoc(collection(db, "chats"), {
          type: "other",
          text: botMessage,
          createdAt: Date.now(),
        });

        setVisibleIndex(messages.length * 2 + 1);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  //컴포넌트 마운트 될 때 데이터베이스에서 채팅목록 불러오기
  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setMessages(newArray);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  
  return (
    <>
      <body>
      <header className='Chattingheader'>
        <div className="status_bar">
          <div className="left_item">
          <i><FaPlane/></i>
          <i><FaWifi/></i>
          </div>

          <div className="center_item">
          <span>15</span>:<span>33</span>
          </div>
          <div className="right_item">
          <i><FaMoon/></i>
          <i><FaBluetoothB/></i>
          <span><span>100</span>%</span>
          </div>
        </div>

        <div className="title_bar">
          <h1>Friend Name </h1>
          <div className="left_item"><Link to="/chats"><i><FaAngleLeft/></i></Link></div>
          <div className="right_item"><a href="#"><i><FaSearch/></i><i><FaBars/></i></a></div>
        </div>
      </header>
      <hr />
      <div className='Chattingmain'>
  <span className="date_info">Thursday, March 23, 2023</span>
  {messages.map((message, index) => (
    <div key={index} className={`chat_box ${message.type} ${index * 2 >= visibleIndex ? 'elastic': ''}`}>
      <div className="other_info">
        <a href="#">
          <span className="profile_img empty"></span>
        </a>
        <span className="profile_name"></span>
      </div>
      <span className="chat">{message.text}</span>
      <span className="chat_time">
        <span>15</span>:<span>33</span>
      </span>
    </div>
  ))}
</div>

      <hr />
      <footer>
        <span className="plus_btn"><a href="#"><i><FaPlus/></i></a></span>
        <input className="chat-box" id="input" ref={inputField}></input>
        <button id="send" onClick={handleClick}>전송</button>
      </footer>
      </body>
    </>
  );
};

export default Chatting;
