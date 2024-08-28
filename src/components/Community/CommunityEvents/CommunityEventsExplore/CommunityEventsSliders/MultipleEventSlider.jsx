import React from 'react';
import Slider from "react-slick";
import SingleCommunityExplore from "../SingleCommunityExplore";
import { Skeleton } from 'antd';

const MultipleEventSlider = ({ eventsData, isPending }) => {
    const settings = {
        className: "center",
        dots: false,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        rows: 1,
        slidesPerRow: 2,
        vertical: true,
        verticalSwiping: true,
        infinite: true,
        pauseOnHover: true,
        swipeToSlide: true,
        easing: "ease-in-out",
        duration: 3000,
        useTransform: true,
        lazyLoad: true,
        adaptiveHeight: true
    };

    return (
        <>
            <div className="slider-vertical-rows">
                {isPending ?
                    (
                        <div className=''>
                            <Skeleton.Image active className='w-100 mb-3' />
                            <Skeleton paragraph={{ rows: 3 }} active title={true} />
                            <Skeleton.Button active width='85%' />
                        </div>
                    )
                    : (
                        <Slider {...settings}>
                            {eventsData && eventsData.map((event, index) => {
                                return (
                                    <div key={index}>
                                        <SingleCommunityExplore
                                            img={event.gallery[0]?.image}
                                            id={event.id}
                                            title={event.event_name}
                                            category={event.event_type.name}
                                            host={event.host[0].name}
                                            day={event.dates[0].check_in_date}
                                            clock={event.dates[0].check_in_time}
                                            text={event.description}
                                            img_style={'multi_img_style'} />
                                    </div>
                                )
                            })}
                        </Slider>
                    )}
            </div>
        </>
    );
};

export default MultipleEventSlider;
