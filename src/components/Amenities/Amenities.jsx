import { useState, useEffect } from 'react';
import AmenitiesHeader from './AmenitiesHeader';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import HoverVideoPlayer from "react-hover-video-player";
import Paragraph from '../UI/Paragraph';
import MonoBlockBlack from '../UI/MonoBlockBlack';
import {getAmenities} from '../../apis/config';
import { useQuery } from '@tanstack/react-query';

const Amenities = () => {

    const {data , isPending, isError, error } = useQuery({
        queryKey: ['amenities'],
        queryFn: getAmenities

    });
    
    return (
        <>
            <AmenitiesHeader />
            <section className="feed">
                <div className="container-fluid">
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 375: 2, 750: 2, 900: 4, 1440: 5}}
                    >
                        <Masonry columnsCount={4} gutter="10px" className="newsfeeds">

                            {data && data.map((amenity, index) => {
                                const {id, content, title, video, icon} = amenity;
                                return (
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

                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </section>
            <MonoBlockBlack />
        </>
    )

};
export default Amenities;