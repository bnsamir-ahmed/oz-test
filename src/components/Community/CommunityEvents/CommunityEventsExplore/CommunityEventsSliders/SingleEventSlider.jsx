import React from 'react';
import Slider from "react-slick";
import SingleCommunityExplore from "../SingleCommunityExplore";
import { Skeleton } from 'antd';

const SingleEventSlider = ({ eventsData, isPending }) => {

    const settingsSingle = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            {isPending ?
                (
                    <div>
                        <Skeleton.Image active className='w-100 mb-3'/>
                        <Skeleton paragraph={{rows: 3}} active title={true} />
                        <Skeleton.Button active width='85%' />
                    </div>
                )
                : (
                    <Slider {...settingsSingle}>
                        {eventsData && eventsData.map((event) => {
                            return (
                                <div key={event.id}>
                                    <SingleCommunityExplore
                                        img={event.gallery[0]?.image}
                                        id={event.id}
                                        title={event.event_name}
                                        category={event.event_type.name}
                                        host={event.host[0].name}
                                        day={event.dates[0].check_in_date}
                                        clock={event.dates[0].check_in_time}
                                        text={event.description}
                                        img_style='img_style'
                                        is_favorite={event.is_favorite} />
                                </div>
                            )
                        })}
                    </Slider>
                )}
        </>
    );
};

export default SingleEventSlider;
