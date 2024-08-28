import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainHeaderWrapper from '../../../UI/MainHeaderWrapper';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import CancelEventModal from './CancelEventModal';
import { getSingleItemById } from '../../../../apis/User';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import moment from 'moment';

const MyEventDetails = () => {

    const {id} = useParams();
    const [show, setShow] = useState(false);
    const [event, setEvent] = useState({});
    const { token, userId } = useContext(AuthContext);
    const currentTime = new Date();

    const handleClose = () => setShow(false);
    
    useEffect(()=>{
        const source = axios.CancelToken.source();

        getSingleItemById(token, 'event', id, source).then(res=>{
            setEvent(res);
        }).catch(err=>{});

        return ()=>source.cancel();
    },[token, id]);

    const compareTime = (eventStart, eventId) => {
        
        const currentTime = new Date();
        const eventStartTime = new Date(eventStart);

        const currentHour = currentTime.getHours();
        const eventHour = eventStartTime.getHours();
        const isSameDay = currentTime.getDate() === eventStartTime.getDate();
        
        if (isSameDay) {
            
            if(currentTime.setHours(currentHour + 12) < eventStartTime.setHours(eventHour + 12) ){

                if(eventId){
                    return (<Button tagType='link' className='btn_outline mt-4' onClick={()=>setShow(true)}>Cancel Attend</Button>)
                }
            }
        }

        if ((event && eventStartTime) > currentTime) {

            if(eventId){
                return (
                    <Button tagType='link' className='btn_outline mt-4' onClick={()=>setShow(true)}>Cancel Attend</Button>
                )
            }
        }

    };

    const handelInvoice = (eventData) => {
        const data = {
            invoice_info: eventData.invoice_info,
            title: eventData.event_name,
            dates: eventData.dates,
            venue: eventData.venue_data,
            price: eventData.default_price,
            numberOfPeople: 1
        }
        localStorage.setItem('OZInvoice', JSON.stringify(data));
    }

    return (
        <>
            <div className='position-relative'>
                <MainHeaderWrapper image={event.gallery} special_flex={`justify-content-md-center`}>
                    <div className="container text-center">
                        <Paragraph className="text-two">{event.event_name}</Paragraph>
                        <div className='mt-5'>
                            {compareTime(event.start, event.event_attend_id)}
                        </div>
                        <div className='mt-3'>
                            {event.event_attend_id !== null && <Button 
                                tagType='link' 
                                className='btn_underline p-0'
                                onClick={handelInvoice(event)}
                                to={'/invoice'}>View Invoice</Button>}
                        </div>
                    </div>
                </MainHeaderWrapper>
            </div>
            <section className="space-details">
                <div className="container-fluid">
                    <div className="row px-0">
                        <div className="col-lg-6 col-12 p-sm-5 p-3 border-right">
                            <div className="space-description">
                                <Paragraph className="h2-description">
                                    About Event
                                </Paragraph>
                                <Paragraph className="p-description">
                                    {event.description}
                                </Paragraph>
                            </div>
                            <div className="catering py-5">
                                <span className='service_catering'>Area: </span><span className='opacity-50'>{event.venue_data?.title}</span>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 p-sm-5 p-3'>
                            <div className="space-price">
                                <Paragraph className="h2-description mb-3">
                                    Price
                                </Paragraph>
                                <div className="price-list">
                                    <span>{event.default_price} EGP / Hour</span>
                                </div>
                            </div>
                            <div className="catering pt-5">
                                <span className='service_catering'>Status: </span><span className='opacity-50'>{event.event_type && event.event_type.name}</span>
                            </div>
                            <div className="space-price py-5">
                                <Paragraph className="h2-description">
                                    Date & Time
                                </Paragraph>
                                    <div className='mb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M9.33594 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M22.6641 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M2.66406 12H29.3307" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M2.66406 16.0026C2.66406 10.9743 2.66406 8.46013 4.22616 6.89803C5.78826 5.33594 8.30241 5.33594 13.3307 5.33594H18.6641C23.6924 5.33594 26.2065 5.33594 27.7686 6.89803C29.3307 8.46013 29.3307 10.9743 29.3307 16.0026V18.6693C29.3307 23.6976 29.3307 26.2117 27.7686 27.7738C26.2065 29.3359 23.6924 29.3359 18.6641 29.3359H13.3307C8.30241 29.3359 5.78826 29.3359 4.22616 27.7738C2.66406 26.2117 2.66406 23.6976 2.66406 18.6693V16.0026Z" stroke="black" stroke-width="2"/>
                                            <path d="M23.9974 21.3308L21.3307 21.3308M21.3307 21.3308L18.6641 21.3308M21.3307 21.3308L21.3307 18.6641M21.3307 21.3308L21.3307 23.9974" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                        <span className='grey-span opacity-100 ps-3'>{event.dates && moment(event.dates[0].check_in_date).format("DD MMMM")}</span>
                                    </div>
                                    <div className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <circle cx="16" cy="17.3281" r="12" stroke="black" stroke-width="2"/>
                                                <path d="M16 12V17.3333L19.3333 20.6666" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M4.66406 5.99739L9.99742 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M27.3333 5.99739L22 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span className='grey-span opacity-100 ps-3'>{event.dates && moment(event.dates[0].check_in_time, 'HH:mm:ss').format("hh:mm a")}</span>
                                    </div>
                            </div>
                            <div className="space-facilities">
                                <Paragraph className="h2-description">
                                    host
                                </Paragraph>
                                <div className="facilities-list">
                                    {event.host &&
                                        event.host.map((item,index)=>{
                                            return (
                                                <Paragraph className="" key={index}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 3C7.02943 3 3 7.02943 3 12C3 16.9705 7.02943 21 12 21C16.9705 21 21 16.9705 21 12C21 7.02943 16.9705 3 12 3Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M5.04492 17.7096C5.04492 17.7096 7.05104 15.1484 12.001 15.1484C16.951 15.1484 18.9572 17.7096 18.9572 17.7096" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M12.0008 12.0016C13.492 12.0016 14.7008 10.7928 14.7008 9.30156C14.7008 7.8104 13.492 6.60156 12.0008 6.60156C10.5096 6.60156 9.30078 7.8104 9.30078 9.30156C9.30078 10.7928 10.5096 12.0016 12.0008 12.0016Z" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg> <span className='grey-span opacity-100'>{item.name}</span>
                                                </Paragraph>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CancelEventModal 
                show={show}
                onHide={handleClose}
                token={token} 
                userId={userId}
                event_attend_id={event.event_attend_id}
            />
        </>
    )
};

export default MyEventDetails;
