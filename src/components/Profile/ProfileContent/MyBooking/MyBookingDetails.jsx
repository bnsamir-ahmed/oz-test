import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MainHeaderWrapper from '../../../UI/MainHeaderWrapper';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import wifi from '../../../../assets/images/icons/wifi.png';
import ModalInvities from './ModalInvities';
import CancelBookingModalConfirm from './CancelBookingModalConfirm';
import ProfileActions from '../../ProfileContent/ProfileActions';
import {AuthContext} from '../../../../apis/context/AuthTokenContext';
import {getSingleItemById} from '../../../../apis/User';
import RatingModal from './RatingModal';
import RemainderModal from './RemainderModal';

const MyBookingDetails = () => {
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showRemainderModal, setShowRemainderModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [booking, setBooking] = useState(false);
    const { token } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const rate = searchParams.get("rate");
    const reminder = searchParams.get("reminder");
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const closeCancelModal = () => setShowCancelModal(false);
    const closeRemainderModal = () => setShowRemainderModal(false);
    const closeRatingModal = () => setShowRatingModal(false);

    useEffect(()=>{
        const source = axios.CancelToken.source();

        getSingleItemById(token, 'booking', id, source).then(res=>{
            setBooking(res);
        }).catch(err=>{});

        return ()=>source.cancel();
    },[token, id]);

    const convertToUnixTimestamp = (dateString) => {
        const date = new Date(dateString);
        const unixTimestamp = Math.floor(date.getTime() / 1000);
      
        return unixTimestamp;
    };

    const setDate = (roomdate) => {
        const parts = roomdate.split(/[- :]/);
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        const date = new Date(year, month - 1, day);

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return (
            <>
                <span className='mb-0 text-center ms-2'>
                    {date.toLocaleDateString('en-US', options)}
                </span>
            </>
        )
    };

    const setTime = (roomdate) => {
        const parts = roomdate.split(/[- :]/);

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        const hour = parseInt(parts[3]);
        const minute = parseInt(parts[4]);

        const date = new Date(year, month - 1, day, hour, minute);

        const timeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const formattedTime = date.toLocaleTimeString('en-US', timeFormatOptions);

        return (
            <>
              <span className='mb-0 text-center mx-2'>{formattedTime}</span>
            </>
        );
    };

    const setLocalTime = (obj) => {
        const modifiedDate = obj.replace(' PM', '').replace(' AM', '');
        const dateObj = new Date(modifiedDate);
        const formattedTime = dateObj.toISOString();
        return formattedTime;
    };

    const handelReschedule = (e) => {
        e.preventDefault();
        const data  = {
            id: id,
            date: setLocalTime(booking.check_in_formmated),
            time: {
                start: setLocalTime(booking.check_in_formmated),
                end: setLocalTime(booking.check_out_formmated)
            },
            numberOfPeople: booking.guests,
            spaceDetails: booking.venueData,
            services: JSON.parse(localStorage.getItem("BookingOZServices"))
        };
        localStorage.setItem("BookingOZDetails", JSON.stringify(data));
        localStorage.setItem("BookingOZDetailsId", JSON.stringify(id));

        navigate(`/bookingDetails/${booking.venueData?.id}?reschedule=reschedule`);
    };

    useEffect(()=>{
        if(rate){
            setShowRatingModal(true)
        }
    },[rate]);

    useEffect(()=>{
        if(reminder){
            setShowRemainderModal(true)
        }
    },[reminder]);

    return (
        <>
            <div className='position-relative'>
                <MainHeaderWrapper image={(booking?.venueData && booking?.venueData?.gallery && booking?.venueData?.gallery.length !==0) ? booking?.venueData.gallery : ''} special_flex={`justify-content-md-center`}>
                    <div className="container text-center">
                        <Paragraph className="text-one">booking details</Paragraph>
                        <h1 className="text-two">{booking?.venueData && booking?.venueData?.title}</h1>
                        {booking?.max_cancellation_time && 
                        <Button 
                            tagType='link' 
                            className='btn_outline mt-4'
                            onClick={handelReschedule}>Reschedule</Button>}
                            
                        <div className='mt-5'>
                            {booking?.max_cancellation_time && <Button tagType='link' className='btn_underline p-0' onClick={()=>{setShowCancelModal(true)}}>Cancel Booking</Button>}
                        </div>
                    </div>
                </MainHeaderWrapper>
            </div>
            <section className="space-details">
                <div className="container-fluid">
                    <div className="row px-0">
                        <div className="col-lg-8 col-12 p-0 py-5 border-right">
                            <div className="space-description px-sm-5 px-3 mb-5">
                                <Paragraph className="h2-description color-grey">
                                    Booking Details
                                </Paragraph>
                            </div>
                            <div className="space-price px-sm-5 px-3 mb-5">
                                <Paragraph className="h2-description mb-5">
                                    Price
                                </Paragraph>
                                <div className="price-list">
                                    <span>{booking.venueData && booking.venueData?.price} EGP / Hour</span>
                                </div>
                            </div>
                            <hr className='my-5 p-0'/>
                            <div className="space-price px-sm-5 px-3 mb-5">
                                <Paragraph className="h2-description mb-5">
                                    Date & Time
                                </Paragraph>
                                <div className="price-list">
                                    <div className='pe-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M9.33594 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M22.6641 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M2.66406 12H29.3307" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M2.66406 16.0026C2.66406 10.9743 2.66406 8.46013 4.22616 6.89803C5.78826 5.33594 8.30241 5.33594 13.3307 5.33594H18.6641C23.6924 5.33594 26.2065 5.33594 27.7686 6.89803C29.3307 8.46013 29.3307 10.9743 29.3307 16.0026V18.6693C29.3307 23.6976 29.3307 26.2117 27.7686 27.7738C26.2065 29.3359 23.6924 29.3359 18.6641 29.3359H13.3307C8.30241 29.3359 5.78826 29.3359 4.22616 27.7738C2.66406 26.2117 2.66406 23.6976 2.66406 18.6693V16.0026Z" stroke="black" stroke-width="2"/>
                                            <path d="M23.9974 21.3308L21.3307 21.3308M21.3307 21.3308L18.6641 21.3308M21.3307 21.3308L21.3307 18.6641M21.3307 21.3308L21.3307 23.9974" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                        <span className='grey-span opacity-25 ps-3'>{booking && setDate(booking?.check_in_formmated)}</span>
                                    </div>
                                    <div className='ps-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <circle cx="16" cy="17.3281" r="12" stroke="black" stroke-width="2"/>
                                                <path d="M16 12V17.3333L19.3333 20.6666" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M4.66406 5.99739L9.99742 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M27.3333 5.99739L22 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span className='grey-span opacity-25 ps-3'>{booking && setTime(booking?.check_in_formmated)} - {booking && setTime(booking?.check_out_formmated)}</span>
                                    </div>
                                </div>
                            </div>
                            <hr className='my-5 p-0'/>
                            <div className="space-capacity px-sm-5 px-3 mb-5">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Paragraph className="h2-description mb-5">Invites</Paragraph>
                                </div>
                                <span className='grey-span'>{booking && booking.invites?.length} people going</span>
                                {(booking && booking.invites?.length !== 0) && 
                                    <div className="facilities-list going_event">
                                        <ul className="list-options d-flex p-0 py-3 m-0">
                                            {booking.invites?.slice(0,4).map((item, index)=>{
                                                return (
                                                    <li className="list-option-item" key={index}><img src={wifi} alt='wifi'/><span className='grey-span'>Wifi</span></li>
                                                )
                                            })}
                                        </ul>
                                        {booking.invites?.length > 4 && (
                                            <Button
                                                className="more_people"
                                                tagType="link"
                                                onClick={handleOpen}
                                            >
                                                +{booking.invites.length - 4}
                                            </Button>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                            <hr className='my-5 p-0'/>
                            <div className="space-facilities px-sm-5 px-3 mb-5">
                                <Paragraph className="h2-description mb-5">
                                    facilities
                                </Paragraph>
                                <div className="facilities-list">
                                    <ul className="list-options d-flex p-0 py-3 m-0">
                                        {booking && booking.venueData?.facilities.map((item, index)=>{
                                            return (
                                                <li className="list-option-item" key={index}><img src={item.logo} alt={item.name} width='27.43px' height='20.57px'/>{item.name}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <hr className='my-5 p-0'/>
                            <div className="catering px-sm-5 px-3 pb-60">
                                <Paragraph className="h2-catering mb-5">
                                    Services
                                </Paragraph>
                                <ul className="list-options d-flex p-0 py-3 m-0">
                                    {booking && booking?.services.map((item, index)=>{
                                        return (
                                            <li className="list-option-item" key={index}>{item.service_name}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-4 col-12 p-sm-5 p-3'>
                            <ProfileActions canceled={booking?.canceled} details={booking}/>
                        </div>
                    </div>
                </div>
            </section>
            <ModalInvities 
                show={show}
                onHide={handleClose}
            />
            <CancelBookingModalConfirm
                show={showCancelModal}
                onHide={closeCancelModal}
                booking_id={booking.id} 
            />
            <RatingModal
                show={showRatingModal}
                onHide={closeRatingModal}
                booking_id={booking.id}
                venueId={booking.venue_id} 
            />
            <RemainderModal
                show={showRemainderModal}
                onHide={closeRemainderModal}
                booking_id={booking.id}
                venueId={booking.venueData?.id} 
            />
        </>
    )
};

export default MyBookingDetails;
