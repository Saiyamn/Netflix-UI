import React, { useRef,useState } from 'react'
import LazyLoad from 'react-lazy-load';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import './list.scss';
import ListItem from '../listitem/ListItem';


const List = ({list}) => {
  const [isMoved,setIsMoved] = useState(false);
  const [slideNumber,setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction)=>{
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x-50;
      if(direction === 'left'&& slideNumber > 0){
         setSlideNumber(slideNumber-1);
         listRef.current.style.transform = `translateX(${230+distance}px)`;
      }

      if(direction === 'right' && slideNumber < 5){
        setSlideNumber(slideNumber+1);
        listRef.current.style.transform = `translateX(${-230+distance}px)`;
     }
  }
  return (
    <div className='list'>
       <span className="list-title">{list.title}</span>
       <div className="wrapper">
           <ArrowBackIosOutlinedIcon 
            style={{display: !isMoved && 'none'}}
            className='slider-arrow left' 
            onClick={()=>handleClick('left')}
           />
            <div className='container' ref={listRef}>
               {/* Adding lazy load to first load images on the view port to improve website performance*/}
              {list.content.map((item,i)=>{
                return (
                  <LazyLoad height={120} width={225} offset={20}>
                    <ListItem index={i} item={item}/>
                  </LazyLoad>
                );
              })}
            </div>
           <ArrowForwardIosOutlinedIcon className='slider-arrow right' onClick={()=>handleClick('right')}/>
       </div>
    </div>
  )
}

export default List