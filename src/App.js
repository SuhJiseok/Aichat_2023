import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Navigation from './components/Navigation';
import Chats from './routes/Chats';
import Find from './routes/Find';
import More from './routes/More';
import Profile from './components/Profile';
import Chatting from './routes/Chatting';
import AppLogin from 'Login';
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import Timeline from 'routes/Timeline';
import Background from 'components/Background';
import FriendProfile from 'components/FriendProfile';


function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log('authService.currentUser->',authService.currentUser)//currentUser 는 현재 로그인한 사람 확인 함수
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      console.log('user->',user)
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user)
      } else {
        setIsLoggedIn(false);
      }
    });

  },[]);
  return (
    <>
    {isLoggedIn ? (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<NavigationLayout />}>
            <Route path="Home" element={<Home userObj={userObj}  /> } />
            <Route index element={<Home userObj={userObj} />} />
            <Route path="Chats" element={<Chats userObj={userObj} setSelectedUser={setSelectedUser} />} />
            <Route path="Timeline"element={<Timeline userObj={userObj} />} />
            <Route path="Find" element={<Find />} />
            <Route path="More" element={<More userObj={userObj} />} />
            <Route path="Chatting" element={<Chatting userObj={userObj}/>} />
          </Route>
          <Route path="Profile" element={<Profile userObj={userObj}/>} />
          <Route path="FriendProfile" element={<FriendProfile userObj={userObj}/>} />

        </Routes>
      </BrowserRouter>
    ) : (
      <AppLogin isLoggedIn={isLoggedIn} userObj={userObj}/>
    )}
  </>
  );
}

function NavigationLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/Chatting' && <Navigation />}
      <Background />
      <Outlet />
    </>
  );
}

export default App;
