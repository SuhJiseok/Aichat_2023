import React, { useEffect, useState } from 'react';
import { FaPlane, FaWifi, FaMoon, FaUser, FaComment, FaPen, FaBluetoothB, FaBatteryFull, FaEdit, FaPlus, FaTimes} from "react-icons/fa";
import {HiXMark} from "react-icons/hi2";
import '../styles/Profile.scss';
import {  useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from 'fbase';
import { FaUpload } from "react-icons/fa";


function Profile({userObj, onProfileUpdate}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const name = location.state?.name || 'My Name';
  const [displayName, setDisplayName] = useState('');
  //실시간 시간표시
  const [currentTime, setCurrentTime] = useState(new Date());

  //이미지 상태 추가
  const [attachment, setAttachment] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(userObj.photoURL);

  //배경이미지 변경
  const [backgroundAttachment, setBackgroundAttachment] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
 

  // 변경 토글 
  const [showEdit, setShowEdit] = useState(false);
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };
  


    useEffect(() => {
      const storedDisplayName = localStorage.getItem('displayName');
      if (storedDisplayName) {
        setDisplayName(storedDisplayName);
      } else {
        setDisplayName(userObj.displayName);
      }
    }, [userObj]);

    //배경이미지 url 가져오기
    useEffect(() => {
      const storedBackgroundImageUrl = localStorage.getItem('backgroundImageUrl');
      if (storedBackgroundImageUrl) {
        setBackgroundImageUrl(storedBackgroundImageUrl);
      }
    }, []);


    useEffect(() => {
      setProfileImageUrl(userObj.photoURL);
    }, [userObj]);
    
    const onLogOutClick = () => {
      authService.signOut();
      navigate('/');
  }
  //시간업데이트 함수
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onSubmit = async (e) =>{
    e.preventDefault();
    let attachmentUrl = userObj.photoURL || "";
    if (attachment !== "") {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
    }
  
    if  (userObj.displayName !== newDisplayName || attachmentUrl !== "") {
      await updateProfile(userObj, { displayName: newDisplayName, photoURL: attachmentUrl });
      setDisplayName(newDisplayName);
      setProfileImageUrl(attachmentUrl);

    }

    let backgroundAttachmentUrl = "";
  if (backgroundAttachment !== "") {
    const storageRef = ref(storage, `${userObj.uid}/background/${uuidv4()}`);
    const response = await uploadString(storageRef, backgroundAttachment, 'data_url');
    backgroundAttachmentUrl = await getDownloadURL(ref(storage, response.ref));
    setBackgroundImageUrl(backgroundAttachmentUrl);
  }
  //로컬 스토리지에 배경 url 저장
  if (backgroundAttachmentUrl !== "") {
    setBackgroundImageUrl(backgroundAttachmentUrl);
    localStorage.setItem('backgroundImageUrl', backgroundAttachmentUrl);
  }
     setShowEdit(false);
  };
  
  const onChange = (e) => {
    const {target: {value}} =e;
    setNewDisplayName(value);
     };

    const onFileChange = (e) => {
    const { target: { files } } = e;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => {
    setAttachment("");
  }

//배경 이미지 업로드
const onBackgroundFileChange = (e) => {
  const { target: { files } } = e;
  const theFile = files[0];

  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    const { currentTarget: { result } } = finishedEvent;
    setBackgroundAttachment(result);
  }
  reader.readAsDataURL(theFile);
}

const onClearBackgroundAttachment = () => {
  setBackgroundAttachment("");
}
   
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
          <span className="kprofile_name">{displayName ? `${userObj.displayName}의 Profile` : "Profile"}</span>
          <input type="mail" className="kprofile_email" placeholder="UserID@gmail.com" />
          <ul className="kprofile_menu">
            <li>
              <a href="#">
                <span className="icon">
                  <i><FaComment/></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleEdit(); }}>
                <span className="icon">
                  <i><FaEdit /></i>
                </span>
              </a>
            </li>

          </ul>
          <span onClick={onLogOutClick} className='Logout'>로그아웃</span>
        </div>
        {showEdit &&(
        <div className='pfcontainer'>
          <form onSubmit={onSubmit} className='profileForm'>
          <input type='text' onChange={onChange} value={newDisplayName} placeholder='이름을 입력하세요' className='formInput' />
          <input type='file' accept='image/*' onChange={onFileChange} className='imgselect' />
          <label htmlFor="imgselect" className="custom-file-upload">
              <FaPlus />
            </label>
            <input
              id="imgselect"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="imgselect"
            />

            {/* 배경 이미지 업로드 input 추가 */}
            <div className='bgimgbtn'>
            <label htmlFor="bgImgSelect" className="bgimgupload">
              변경
            </label>
            <input
              id="bgImgSelect"
              type="file"
              accept="image/*"
              onChange={onBackgroundFileChange}
              className="imgselect"
            />
            </div>
            {/* 배경 이미지 업로드 input 추가 끝 */}

             {/* 배경 이미지 미리보기 및 삭제 버튼 추가 */}
              {backgroundAttachment && (
                <div className='attachment'>
                  <button className='removeBtn' onClick={onClearBackgroundAttachment}><i><FaTimes/></i></button>
                  <img src={backgroundAttachment} alt='' />
                </div>
              )}
              {/* 배경 이미지 미리보기 및 삭제 버튼 추가 끝 */}
          {attachment && (
            <div className='attachment'>
              <button className='removeBtn' onClick={onClearAttachment}><i><FaTimes/></i></button>
              <img src={attachment} alt='' />
            </div>
          )}
          <input type='submit' value='Update Profile' className='formBtn'/>
          </form>

        </div>
        )}
    
      </section>
    </main>
    </body>
      </>
  );
};

export default Profile;
