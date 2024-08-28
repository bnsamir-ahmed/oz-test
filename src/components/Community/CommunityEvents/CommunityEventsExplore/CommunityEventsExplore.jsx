import React, { useContext, useEffect } from 'react';
import './CommunityEventsExplore.css';
import MultipleEventSlider from "./CommunityEventsSliders/MultipleEventSlider";
import SingleEventSlider from "./CommunityEventsSliders/SingleEventSlider";
import CommunityExploreHeader from "./CommunityEventsExploreHeader/CommunityExploreHeader";
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { getEventsList } from '../../../../apis/Events';
import Button from '../../../UI/Button';
import { useQuery } from '@tanstack/react-query';
import JoinCommuinty from '../../JoinCommuinty/JoinCommuinty';
import { DataContext } from '../../../../apis/context/SiteDataContext';

const CommunityEventsExplore = () => {

    const { token, userId, branchId } = useContext(AuthContext);
    const { ResetPageName, isPending: isPendingContext, getComponentValue } = useContext(DataContext);

    const { data: eventsData, isPending, error } = useQuery({
        queryKey: ['events-list', branchId],
        queryFn: () => getEventsList(token, userId, branchId)
    });

    useEffect(() => {
        ResetPageName("community");
    }, []);

    return (
        <>
            <div className="navigator-feed">
                <div className='container-fluid'>
                    <div className='d-flex'>
                        <h1 className="title-name mb-0">
                            Community events
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
                    </div>
                </div>
            </div>


            <CommunityExploreHeader configData={getComponentValue("event")} isPending={isPendingContext} />

            <section className="events-show border-bottom border-top">
                <div className="container">
                    {error && (<div className='alert alert-danger' role='alert'>{error.message}</div>)}
                    <div className="row">
                        <div className="col-lg-6 single-margin ">
                            <div className="single-event-slider ">
                                <SingleEventSlider eventsData={eventsData} isPending={isPending} />
                            </div>
                        </div>
                        <div className="col-lg-6 border-left" >
                            <div className="multiple-event-slider ">
                                <MultipleEventSlider eventsData={eventsData} isPending={isPending} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <JoinCommuinty
                configData={getComponentValue("footer")}
                pending={isPendingContext}
                buttontitle={'Become a Member'}
                buttonLink={'/contactus'}
            />
        </>
    );
};

export default CommunityEventsExplore;
