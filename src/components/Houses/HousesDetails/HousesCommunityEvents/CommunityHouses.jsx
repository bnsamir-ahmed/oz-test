import React from 'react';
import Slider from "react-slick";
import LocationsList from "../../../Locations/LocationsList";
import './CommunityHouses.css';
import { Skeleton } from 'antd';

const CommunityHouses = (props) => {
    const settings = {
        dots: true,
        speed: 300,
        slidesToShow: 1,
        cssEase: "linear",
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true
    }
    return (
        <>
            <section id="community-events" className="locations house-details ">
                <div className="container-fluid">

                    <div className="row border-of-section ">
                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-6 border-right ">
                            {props.isPending ?
                                (<Skeleton.Image active className="image-box w-100" />)
                                : (
                                    <Slider {...settings}>
                                        {props?.event_images && props?.event_images.map((location) => {
                                            const { id, path } = location;
                                            return (
                                                <div key={id}>
                                                    <LocationsList id={id} img={path} />
                                                </div>
                                            )
                                        })}
                                    </Slider>
                                )}
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-6 m-auto ">
                            <div className="box-content p-sm-4 p-2">
                                <h2 className="h2-text-box">Community Events</h2>
                                {props.isPending ?
                                    (<Skeleton paragraph={{ rows: 0 }} active />)
                                    : (
                                        <p className="p-text-box">
                                            {props?.description}
                                        </p>
                                    )}
                            </div>
                        </div>


                    </div>
                </div>
            </section>

        </>
    );
};

export default CommunityHouses;
