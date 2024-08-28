import React, {useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import Paragraph from '../UI/Paragraph';
import HoverVideoPlayer from "react-hover-video-player";
import {getAmenities} from '../../apis/config';
import { useQuery } from '@tanstack/react-query';
import './AmenitiesList.css' ;

const AmenitiesList = () => {

    const amenitiesListRef = useRef(null);

    const { error, data: AmenitiesList } = useQuery({
        queryKey: ['get-Amenities'],
        queryFn: () => getAmenities()
    });

    useEffect(() => {
        const handleScroll = (event) => {
          const { deltaX } = event;
          amenitiesListRef.current.scrollLeft += deltaX;
        };
    
        const amenitiesList = amenitiesListRef.current;
        amenitiesList.addEventListener('wheel', handleScroll);
    
        return () => {
          amenitiesList.removeEventListener('wheel', handleScroll);
        };
    }, []);
    

    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: AmenitiesList?.length > 7 ?  7  : AmenitiesList?.length,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: AmenitiesList?.length > 7 ?  7  : AmenitiesList?.length,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 6,
                settings: "unslick",

            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]

    };
    return (
        <>
        <div className="col-lg-12 AmenitiesList_videos">
            <div className="amenities-list" ref={amenitiesListRef}>
                <Slider {...settings} className="home-events">
                        {AmenitiesList && AmenitiesList.map((AmenitiesList, index) =>{
                            const {id, title, video, icon} = AmenitiesList;
                            return(
                                        <HoverVideoPlayer
                                            key={index}
                                            videoSrc={video}
                                            overlayTransitionDuration={1000}
                                            restartOnPaused
                                            hoverOverlay={
                                                <div className=''
                                                    style={{
                                                        backgroundColor: "#00000070",
                                                        position: "absolute",
                                                        top: "0",
                                                        left: "0",
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        flexDirection: 'column',
                                                        transition:".7s"
                                                    }}>
                                                        <img src={icon} alt={title} width='40px' height='40px' style={{
                                                            width: '40px',
                                                            height: '40px'
                                                        }}/>
                                                        <Paragraph className='overlay_p'>{title}</Paragraph>
                                                </div>          
                                            }
                                        />
                            )
                        })}
                </Slider>
            </div>
        </div>
        {error && <Paragraph>there is no Amenities to display</Paragraph>}
        </>
    );

}
export default AmenitiesList;