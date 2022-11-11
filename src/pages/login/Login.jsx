import React,{useState} from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.scss';
import {login} from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';


const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailCheckMessage,setEmailCheckMessage] = useState('');
  const [passwordCheckMessage,setPasswordCheckMessage] = useState('');
  const {dispatch} = useContext(AuthContext);
  const {isFetching} = useContext(AuthContext);
  const {error} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogin = (e)=>{

    e.preventDefault();

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmailCheckMessage('');
    setPasswordCheckMessage('');

    if(!email.match(mailformat)){
       setEmailCheckMessage('Incorrect email format');
       return ;
    }
    
    if(password === ''){
      setPasswordCheckMessage('Password cannot be empty');
      return;
    }

    login({email,password},dispatch);
    
  }

  const handleSignIn = ()=>{
    navigate('/register');
  }

  const ButtonStatus = ()=>{
    if(isFetching){
      return 'Authenticating...';
    }else{
      return 'Sign In';
    }
  }

  return (
    <div className='login'>
       <div className='top'>
          <div className='wrapper'>      
            <img 
              className='logo'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' 
              alt=''
            />
          </div>   
       </div>
       <div className='container'>
            <form>
               <h1>Sign In</h1>
               <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
               <span className='check-message'>{emailCheckMessage}</span>
               <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
               <span className='check-message'>{passwordCheckMessage}</span>
               {error?<span className='check-message'>{'Incorrect Email or Password'}</span>:''}
               <button className='login-button' onClick={handleLogin}><ButtonStatus/></button>
               <span>New to Netflix ? <b onClick={handleSignIn}>Sign up now.</b></span>
               <small>
                 This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                 <b>Learn more</b>
               </small>
            </form>
        </div>
    </div>
  )
}

export default Login;