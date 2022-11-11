import axios from 'axios';
import React,{useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';


import './register.scss';
import BASE_API_URL from '../../api/routes';

const Register = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [username,setUsername ]= useState('');
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef= useRef();
  const usernameRef = useRef();
  

  const handleStart = ()=>{
     setEmail(emailRef.current.value);
     
  }

  const handleFinish = async(e)=>{
     e.preventDefault();
     setPassword(passwordRef.current.value);
     setUsername(usernameRef.current.value);
    
     /*

     const user = {
       username:username,
       password:password,
       email:email
     };
     
     */
     
     // Since username and password are used immediately after setting it, the first axios request below sends the username as '' since it is being set by async setUsername ,
     // Thus in order to avoid this issue, send the usernameRef and passwordRef value 

     const user = {
      username : usernameRef.current.value,
      password : passwordRef.current.value,
      email : email
     }

     try{
       const url = BASE_API_URL+'auth/register';
       await axios.post(url,user);
      
       navigate('/login');

     }catch(err){
       console.log(err);
     }
  }

  const handleSignIn = ()=>{
      navigate('/login');
  }

  return (
    <div className='register'>
       <div className='top'>
          <div className='wrapper'>      
            <img 
              className='logo'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' 
              alt=''
            />
            <button className='login-button' onClick={handleSignIn}>Sign In</button>
          </div>
       </div>
       <div className='container'>
          <h1>Unlimited movies, TV shows, and more</h1>
          <h2>Watch anywhere. Cancel anytime</h2>
          <p>
            Ready to watch ? Enter your email to create or restart your membership
          </p>
          {!email ? (
              <div className='input'>
                <input 
                type='email' 
                placeholder='email address'
                ref={emailRef}
                />
                <button className='register-button' onClick={handleStart}>
                  Get Started
                </button>
              </div>
             ):(
              <form className='input'>
                <input 
                type='text' 
                placeholder='username'
                ref={usernameRef}
                />
                <input 
                type='password' 
                placeholder='password'
                ref={passwordRef}
                />
                <button className='register-button' onClick={handleFinish}>
                  Start
                </button>
              </form>

             )}
       </div>
    </div>
  )
}

export default Register