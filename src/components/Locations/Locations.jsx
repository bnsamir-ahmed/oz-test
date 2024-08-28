import React, { useEffect, useState } from 'react';
import './Locations.css';
import Slider from "react-slick";
import LocationsList from "./LocationsList";
import Buttons from "../UI/Button";
import Paragraph from '../UI/Paragraph';
import {getSiteLocations} from '../../apis/config';
import { useQuery } from '@tanstack/react-query';

const Locations = (props) => {

    const { error, data: locations } = useQuery({
        queryKey: ['get-SiteLocations'],
        queryFn: ({signal}) => getSiteLocations(signal)
    });

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        cssEase: "linear",
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3000,
        lazyLoad: true,
        // responsive: [
        //     {
        //         breakpoint: 425,
        //         settings: {
        //             dots: false
        //         }
        //     }
        // ]
    };

    return (
        <>
            <section className="locations mb-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-content-sec">
                                <Paragraph className='head_feature'>Explore Houses</Paragraph>                              
                            </div>
                        </div>
                    </div>
                    <div className="row border-of-section">
                        <div className="col-lg-8 col-md-7 col-12 border-right ">
                            <Slider {...settings}>
                                {locations?.length !== 0 && locations?.map((location, index) => {
                                    const {id, address, main_image, title} = location;
                                        return (
                                            <div key={index}>
                                                <LocationsList id={id} address={address} img={main_image} title={title} addAddress={true} />
                                            </div>
                                            )
                                        })}
                            </Slider>
                            {locations?.length === 0 && <p className='empty'>theres is no Locations yet!!</p>}
                            {error  && <p className={`empty text-danger mt-2 mb-0`}>{error}</p>}
                        </div>
                        <div className="col-lg-4 col-md-5 col-12 my-auto ">
                            <div className="box-content p-lg-4 p-3">
                                {props.configData ? props.configData.map((configItem, index) => (
                                    <React.Fragment key={index}>
                                        {configItem.key === 'home_page_location_title' && (
                                            <h3 className='paragraph_black'>{configItem.value}</h3>                                        
                                        )}
                                        {configItem.key === 'home_page_location_description' && (
                                            <Paragraph className='description_black'>{configItem.value}</Paragraph>    
                                        )}                                   
                                    </React.Fragment>
                                )): ''}
                                    <Buttons
                                        tagType='link' 
                                        className="btn button-outLine btn-bg-white"
                                        to={'/houses'}>our houses</Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo( Locations);
