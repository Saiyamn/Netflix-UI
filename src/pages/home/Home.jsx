import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios';

import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import { AuthContext } from '../../authContext/AuthContext';
import BASE_API_URL from '../../api/routes';

const Home = ({type}) => {

  // To store the movie/series lists from backend
  const [lists,setLists] = useState([]);
  const [genre,setGenre] = useState(null);
  const {user} = useContext(AuthContext);
  const userToken = `Bearer ${user.accessToken}`;
  
  useEffect(()=>{
    
    const getRandomLists = async()=>{
       try{
         const url = BASE_API_URL+`lists${type ? "?type=" + type :""}${genre ? "genre=" + genre : ""}`;
         const res = await axios.get(url,{
            headers:{
              token: userToken
            }
          }
          );   
          setLists(res.data.slice(0,5));
         
       }catch(err){
        console.log(err);
       }
    };
    
    getRandomLists();
  },[type,genre,userToken]);
  return (
    <div className='home'>
      <Navbar/>
      <Featured type={type}/> 
      {lists.map((list)=>(
        <List list={list}/>
      ))}
      
    </div>
  )
}

export default Home