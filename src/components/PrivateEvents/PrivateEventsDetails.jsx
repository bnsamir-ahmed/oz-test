import React, { useContext } from 'react';
import './PrivateEventsDetails.css';
import PrivateEventsDetailsList from "./PrivateEventsDetailsList";
import { Element } from 'react-scroll';
import { getPrivateEvent } from '../../apis/config';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';

const PrivateEventsDetails = () => {

    const { token } = useContext(AuthContext);

    const { data: privateEvent, isPending } = useQuery({
        queryKey: ['list-oz-getPrivateEvent', token],
        queryFn: ({ signal }) => getPrivateEvent(token, signal)
    });

    return (
        <>
            <section className="private-events-details">
                <div className="container-fluid">
                    {isPending ?
                        (
                            <div className='row g-3'>
                                <div className="col-lg-8 col-md-6 col-12 m-auto border-left img_block">
                                    <Skeleton.Image className="image-box w-100" />
                                </div>
                                <div className="col-lg-4 col-md-6 col-12 m-auto">
                                    <div className="box-content p-xl-4 p-2">
                                        <Skeleton paragraph={{rows: 2}} title={true} active />
                                        <div className="d-flex buttons-group">
                                            <Skeleton.Button active />
                                            <Skeleton.Button active />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            privateEvent?.map((prevent, index) => {
                                const { id, description_1, description_2, pdf, title, image } = prevent;
                                const isEven = index % 2 === 0;
                                const reverse = !isEven;
                                return (
                                    <Element>
                                        <div className={`row border-top border-bottom ${reverse ? 'flex_reverse' : ''}`} key={index} name={title}>
                                            <PrivateEventsDetailsList
                                                id={id}
                                                address={title}
                                                image={image}
                                                desc={description_1}
                                                desc_2={description_2}
                                                index={index}
                                                hrefTag={pdf}
                                            // places={places}
                                            />
                                        </div>
                                    </Element>
                                )
                            })
                        )}
                </div>
            </section>

        </>
    );
};

export default PrivateEventsDetails;
