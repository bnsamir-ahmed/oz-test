import React, { useState } from 'react';
import classes from './MainHeaderWrapper.module.css';
import { useEffect } from 'react';

const MainHeaderWrapper = (props)=>{
    const [imageIndex, setImageIndex] = useState(0);
    const [videoIndex, setVideoIndex] = useState(0);


    useEffect(()=>{
        const timer = setInterval(()=>{
            if(props?.image){
                if(props.image.length > 1){
                    setImageIndex((prevIndex) => (prevIndex + 1) % props.image.length);
                }
            }
        },5000);

        return ()=>clearInterval(timer);
    },[imageIndex]);

    useEffect(()=>{
        if(props?.getVideoTitle){
            props.getVideoTitle(props.video[videoIndex]?.title);
        }
        const timer = setInterval(()=>{
            if(props?.video){
                if(props.video.length > 1){
                    setVideoIndex((prevIndex) => (prevIndex + 1) % props.video.length);
                    if(props.getVideoTitle){
                        props.getVideoTitle(props.video[videoIndex].title);
                    }
                }
            }
        },5000);

        return ()=>clearInterval(timer);
    },[videoIndex]);

    return (
        <div className={`position-relative`}>
            <div className={`${classes.header_bg} ${props.special_flex}`}>
                {props.video && 
                    <video 
                        className={`${classes.video_bg}`} 
                        alt="oz video" 
                        src={props.video[videoIndex]?.video || props?.video} 
                        autoPlay 
                        muted 
                        loop
                    />
                }
                {props.image && 
                    <div style={
                        {
                            backgroundImage: `url(${props.image[imageIndex]?.image || props?.image})`,
                        }
                    } className={`${classes.img_bg}`}></div>
                }
                <div className={'position-relative py-5'} style={{
                    zIndex: 99
                }}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
export default MainHeaderWrapper;