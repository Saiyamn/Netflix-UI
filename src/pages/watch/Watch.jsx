import React from 'react'
import {ArrowBackOutlined} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

import './watch.scss';


const Watch = () => {

  const location = useLocation();
  const movie = location.state.movie;
  //console.log(location.state.movie);
  
  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackOutlined/>
          Home
        </div>
      </Link>
      <video 
       className='video'
       autoPlay
       controls
       progress
       src={movie.video}
      />
    </div>
  )
}

export default Watch