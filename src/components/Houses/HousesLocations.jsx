import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import './HousesLocations.css';
import HousesLocationsList from "./HousesLocationsList";
import { getSiteLocations } from '../../apis/config';
import Paragraph from '../UI/Paragraph';
import { Skeleton } from 'antd';

const HousesLocations = ({ configData, pending }) => {

    const { isPending, error, data: locations } = useQuery({
        queryKey: ["site-locations"],
        queryFn: ({ signal }) => getSiteLocations(signal),
    });

    return (
        <>
            <div className="navigator">
                <Container fluid className='justify-content-start'>
                    <div className='d-flex align-items-center change_dir'>
                        <h1 className="title-name mb-0">
                            Houses
                        </h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2"
                            height="127"
                            viewBox="0 0 2 127"
                            fill="none"
                        >
                            <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5" />
                        </svg>
                        {pending ? (<Skeleton active paragraph={{ rows: 2 }} className='p-4' />) : (
                            configData ? configData.map((configItem, index) => (
                                <React.Fragment key={index}>
                                    {configItem.key === 'home_page_location_description' && (
                                        <Paragraph className="p-name ps-sm-4 ps-0 py-sm-0 py-3 mb-0">{configItem.value}</Paragraph>
                                    )}
                                </React.Fragment>
                            )) : ''
                        )}
                    </div>
                </Container>
            </div>

            <section className="locations-houses">
                <div className="container-fluid">
                    <div className="row">
                        {isPending ? (
                            <div className="col-lg-6 col-12 border-all">
                                <div className="box-office">
                                    <div className="location-contact pt-3">
                                        <Skeleton paragraph active />
                                    </div>
                                    <div className="d-lg-flex mb-4 justify-content-between align-items-center d-sm-block">
                                        <div className="btn-explore">
                                            <Skeleton.Button style={{ width: 80 }} active />
                                        </div>
                                    </div>
                                    <Skeleton.Image className="w-100" active />
                                </div>
                            </div>
                        ) : (
                            locations?.map((locations, index) => {
                                const { id, address, title, main_image } = locations;
                                return (
                                    <div className="col-lg-6 col-12 border-all " key={index}>
                                        <HousesLocationsList
                                            id={id}
                                            title={title}
                                            address={address}
                                            main_image={main_image}
                                            isPending={isPending}
                                        />
                                    </div>
                                )
                            })
                        )}
                        {error && <div className="alert alert-danger" role="alert">{error.message}</div>}

                    </div>
                </div>
            </section>
        </>
    );
};

export default HousesLocations;
