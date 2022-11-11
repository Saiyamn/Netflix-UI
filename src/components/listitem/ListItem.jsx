import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { PlayArrow,Add,ThumbUpAltOutlined, ThumbDownOutlined } from '@mui/icons-material';

import './listitem.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import BASE_API_URL from '../../api/routes';

const ListItem = ({index,item}) => {

  const [isHovered,setIsHovered] = useState(false);
  const [movie,setMovie] = useState({});
  const {user} = useContext(AuthContext);
  const userToken = `Bearer ${user.accessToken}`;

  useEffect(()=>{
     const getMovie = async()=>{
       try{
          const url = BASE_API_URL+'movies/find/';
          const res = await axios.get(url+item,{
            headers:{
              token: userToken
            }
          });

          setMovie(res.data);
       }catch(err){
        console.log(err);
       }
     }

     getMovie();
  },[item,userToken]);

   return (
    <Link to='/watch' state={{movie:movie}}>
      <div 
        className='listitem'
        style={{left: isHovered && index * 225 -50 + index * 2.5}}
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        >
        <img 
          src={movie.img} 
          alt=''
          />
        {isHovered && (
          
          <>
            <video src={movie.trailer} autoPlay={true} loop/>
              <div className='item-info'>
                  <div className='icons'>
                    <PlayArrow className='icon'/>
                    <Add className='icon'/>
                    <ThumbUpAltOutlined className='icon'/>
                    <ThumbDownOutlined className='icon'/>
                  </div>
                  <div className='item-info-top'>
                    <span>{movie.duration}</span>
                    <span className='limit'>+{movie.certificate}</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className='desc'>
                      {/*movie.desc*/}
                  </div>
                  <div className='genre'>{movie.genre}</div>
              </div>
            </>
            )}
      </div>
    </Link>
  )
}

export default ListItem