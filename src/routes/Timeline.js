import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, onSnapshot, query, orderBy  } from "firebase/firestore";
import { db, storage } from 'fbase';
import {FaArrowCircleUp} from "react-icons/fa";
import Feed from 'components/Feed';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import '../styles/Timeline.scss';
import { RiCloseCircleLine } from "react-icons/ri";

function Timeline({userObj}) {
  console.log('userObj->',userObj);

  const [feed, setFeed] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [attachment, setAttachment] = useState("");




useEffect(()=>{

  const q = query(collection(db, "feeds"),
                orderBy("createdAt","desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newArray = [];
    querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});//새로운 배열 만들어준다
    });
    setFeeds(newArray);
  });
  
},[]);



  const onChange = e =>{
    e.preventDefault();
    const {target :{value}}=e;
    setFeed(value);
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url');
        attachmentUrl = await getDownloadURL(ref(storage, response.ref));
      }



      const docRef = await addDoc(collection(db, "feeds"), {
        text: feed,
        createdAt: Date.now(),
        creatorId: userObj.uid, //해당 트윗을 누가 작성했는지 판별하는 코드,userObj= 로그인한 사용자 정보
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);//오류 발생시 오류 표시
    }
    setFeed("");//트윗 누르고 비워주는 부분
    setAttachment("");
  }

  const onFilechange=(e)=>{
    const {target: {files}} = e;
    const theFile = files[0];
    
    const reader = new FileReader();//브라우저 api 
    reader.onloadend = (finishedEvent) => {
      const {currentTarget:{result}} = finishedEvent; //data:image
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onclearAttachment = () => {
    setAttachment("");
  }
  return (
    <>
      <form className='Timeline' onSubmit={onSubmit}>
        <input type='text' className='Timetext' placeholder="무슨 일이 일어나고 있나요?" value={feed} onChange={onChange}/>
        <input type="file" accept='image/*' onChange={onFilechange} />
        <button className='Feedsend' type='submit' disabled={!feed}><i><FaArrowCircleUp /></i></button>
        {attachment && (
          <div className='preview'>
            <img className='prvimg' src={attachment} alt="" />
            <button className='imgremove' onClick={onclearAttachment}><i><RiCloseCircleLine /></i></button>
          </div>
        )}
      </form>
      <div className='Timebabo'>
        {feeds.map(feed => (
   
          <Feed key={feed.id} feedObj={feed} isOwner={feed.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  )
}

export default Timeline