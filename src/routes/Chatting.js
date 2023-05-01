import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatting.scss';
import { FaPlane, FaWifi, FaMoon, FaSearch, FaBars, FaPlus, FaBluetoothB,  FaAngleLeft } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from 'fbase';

const deleteMessage = async (messageId) => {
  const messageRef = doc(db, "chats", messageId);
  await deleteDoc(messageRef);
};


function Chatting({userObj, selectedUser}) {

  const {friendname, friendimage} = useLocation().state
  const [messages, setMessages] = useState([]);
  const inputField = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [colonVisible, setColonVisible] = useState(true);
  const [attachment, setAttachment] = useState("");



  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  //현재 날짜 표시
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentDate(formatDate(now));
  }, []);

  const formatDate = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}, ${month} ${date.getDate()}, ${year}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setColonVisible((prevVisible) => !prevVisible);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
  
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  


  const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
  });
  const [visibleIndex, setVisibleIndex] = useState(-1);

  const handleClick = async () => {
    const userMessage = inputField.current.value;
    console.log("User message:", userMessage);
    inputField.current.value = "";

  
  // 사용자 메시지 객체 생성
    const myMessage = {
      type: "my",
      text: userMessage,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    };

     // 이미지 첨부 여부 확인
     if (attachment) {
      myMessage.attachment = attachment;
    }

    await addDoc(collection(db, "chats"), myMessage);
  
  // 이미지 전송 후 미리보기 닫기
  setAttachment("");

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
    const q = query(collection(db, `chats`), orderBy("createdAt", "asc"));
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
          <span>{formatTime(currentTime.getHours())}</span>
        {colonVisible ? ':' : ' '}
        <span>{formatTime(currentTime.getMinutes())}</span>
          </div>
          <div className="right_item">
          <i><FaMoon/></i>
          <i><FaBluetoothB/></i>
          <span><span>100</span>%</span>
          </div>
        </div>

        <div className="title_bar">
          <h1>{friendname}</h1>
          <div className="left_item"><Link to="/chats"><i><FaAngleLeft/></i></Link></div>
          <div className="right_item"><a href="#"><i><FaSearch/></i><i><FaBars/></i></a></div>
        </div>
      </header>
      <hr />
      <div ref={scrollRef} className='Chattingmain'>
      <span className="date_info">{currentDate}</span>

  {messages.map((message, index) => (
    <div key={index} className={`chat_box ${message.type} ${index * 2 >= visibleIndex ? 'elastic': ''}`}>
      {message.type !== "my" && (
        <div className="other_info">
          <a href="#">
            <span className="profile_img" style={{backgroundImage: `url(${friendimage})`}}></span>
          </a>
          <span className="profile_name"></span>
        </div>
      )}
      <span className="chat">
        {message.text}
        {message.attachment && (
          <img className="message-image" src={message.attachment} alt="Message attachment" />
        )}
      </span>
     
      {/* {message.type === "my" && ( */}
      <button className="delete-btn" onClick={() => deleteMessage(message.id)}>
        Delete
      </button>
      {/* )} */}
        <span className="chat_time">
          <span>15</span>:<span>33</span>
        </span>
      </div>
      ))}
      </div>
{attachment && (
  <div className="chtpreview">
    <img className='chtprvimg' src={attachment} alt="Attachment" />
    <button className='chtimgremove' onClick={() => setAttachment("")}>Remove</button>
  </div>
)}


      <hr />
      <footer>
      <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
          <span className="plus_btn" onClick={() => document.getElementById("fileInput").click()}>
            <i><FaPlus /></i>
          </span>
        <input className="chat-box" id="input" ref={inputField}></input>
        <button id="send" onClick={handleClick}>전송</button>
      </footer>
      </body>
    </>
  );
};

export default Chatting;
