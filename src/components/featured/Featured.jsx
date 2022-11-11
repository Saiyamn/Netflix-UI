import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router-dom';

import './featured.scss';
import { AuthContext } from '../../authContext/AuthContext';
import BASE_API_URL from '../../api/routes';


const Featured = ({type}) => {

  const [content,setContent] = useState({});
  const {user} = useContext(AuthContext);
  const userToken = `Bearer ${user.accessToken}`;
  
  useEffect(()=>{
     const getRandomContent = async()=>{
       try{
         const url = BASE_API_URL+`movies/random?type=${type}`;
         const res = await axios.get(url,{
            headers:{
               token: userToken
            }
         });

         setContent(res.data[0]);
       }catch(err){
         console.log(err);
       }
     }

     getRandomContent();
  },[type,userToken]);

  console.log(content);

  return(
    <div className='featured'>
       

       { /*type && (
            <div className='category'>
               <span>{type==='movies'?'Movies':'Series'}</span>
               <select name='genre' id='genre'>
                  <option>Genre</option>
                  <option value="adventure">Adventure</option>
                  <option value="comedy">Comedy</option>
                  <option value="crime">Crime</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="historical">Historical</option>
                  <option value="horror">Horror</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Sci-fi</option>
                  <option value="thriller">Thriller</option>
                  <option value="western">Western</option>
                  <option value="animation">Animation</option>
                  <option value="drama">Drama</option>
                  <option value="documentary">Documentary</option>
               </select>
            </div>
       ) */}

       <img 
        src={content.img} 
        alt='dp'/>
        <div className='info'>
           <div className='title'>{content.title}</div>
           <span className='desc'>
             {content.desc}
           </span>
           <div className='buttons'>
              <button className='play'>
                <PlayArrowIcon/>
                    <Link to='/watch' state={{movie:content}} style={{textDecoration:'none'}}>
                       <span className='play-text'>
                           Play
                      </span>
                    </Link>
              </button>
             { /*<button className='more'>
                <InfoOutlinedIcon/>
                <span>Info</span>
               </button> */}
           </div>
        </div>
    </div>
  )
}


export default Featured