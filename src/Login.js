
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './routes/Auth';
import Home from './routes/Home';

function AppLogin({isLoggedIn, userObj}) {



  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
    {isLoggedIn && (<Home/>) } 
    {/* &&: 앤드연산자 / isLoggedIn이 트루일때 Home 실행 */}
      <Routes>
        {isLoggedIn ? (   
          <>
         <Route path='/' element={<Home userObj={userObj}/>} />
         </>

         ): (
          <Route path='/' element={<Auth />}/>
         )}
      </Routes>
    </BrowserRouter>
  )
}

export default AppLogin