import React, { useState } from 'react';
import { FaGoogle, FaGithub } from "react-icons/fa";
import '../styles/Auth.scss';
import { authService } from 'fbase';
import Loading from './Loading.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup  } from "firebase/auth"; /*신규 사용자 가입을 위한 파이어베이스 모듈 함수 */
import { async } from '@firebase/util';


function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true); //true 회원가입, false로그인
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>{
    console.log('e.target.name->',e.target.name);
    console.log(e);
    const {target:{name, value}} =e;
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }

  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try{//try catch 서버에 요청할때 사용
      let data;
      if(newAccount){
      //회원가입  || 파이어베이스 신규 사용자 가입에서 가져온 코드
      data = await createUserWithEmailAndPassword(authService, email, password)
    }else{
      //로그인 || 파이어베이스 기존사용자 로그인에서 가져온 코드
      data = await signInWithEmailAndPassword(authService, email, password)
    }
    console.log('data->',data);
  } catch (error){
    console.log('error->',error);
    setError(error.message)
  } finally {
    setLoading(false);
  }
}
  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = async (e) =>{
    console.log('e.target.name->', e.target.name);
    const {target:{name}} = e; //<-구조분해 할당
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();

    }
   const data = await signInWithPopup(authService, provider);
   console.log('data->',data);
    
  }
  
  return (
    <body>
    {loading && <Loading />}
    <section className='athsection'>
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>
      <div className='authdiv' >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className='form'>
          <h2>Login Form</h2>
        <form onSubmit={onSubmit} className="loginform">
          <div class="inputBox">
            <input name="email" id="kakaoid" type='email' placeholder='이메일' required value={email} onChange={onChange}/>
          </div>
          <div class="inputBox">
            <input name="password" id="kakaopw" type='password' placeholder='비밀번호' required value={password} onChange={onChange}/>
          </div>
          <div className='inputBox'>
          <input type='submit' id="kakaologin" value={newAccount ? "Create Account" : "Log In"} />
          </div>
          <p class="forget">Forgot Password? <a href="#">Click Here</a></p>
          <p  onClick={toggleAccount} class="forget">{newAccount ? "Sign In" : "Create Acoount"}</p>
        </form>  
        <div className='etclogin'>
          <button onClick={onSocialClick} name="google" className='Googlebtn' >Continue width Google<i ><FaGoogle/></i></button>
          <button onClick={onSocialClick} name="github" className='Githubbtn'>Continue width Github<i><FaGithub /></i></button>
          </div>
        <div>
        </div>
        </div>
      </div>
    </section>
    </body>
  )
}

export default Auth