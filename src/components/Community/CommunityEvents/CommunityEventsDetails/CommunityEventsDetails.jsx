import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from "antd";
import axios from 'axios';
import vector from '../../../../assets/images/Vector.png';
import './CommunityEventsDetails.css';
import Slider from "react-slick";
import Media from "../../../Media/Media";
import Button from "../../../UI/Button";
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { getSingleItemById } from '../../../../apis/User';
import { attendEvent, checkEvent, cancelEventAttend } from '../../../../apis/Events';
import ShareButton from '../../../UI/ShareButton';
import AddToFavButton from '../../../UI/AddToFavButton';
import { DataContext } from '../../../../apis/context/SiteDataContext';
import Paragraph from '../../../UI/Paragraph';
import LoginAlert from '../../../Auth/LoginAlertModal';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CommunityEventsDetails = () => {

    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [image, setImage] = useState('');
    const [reload, setReload] = useState(false);
    const { token, userId, planId } = useContext(AuthContext);
    const { data, ResetPageName } = useContext(DataContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handelHide = () => setShow(false);

    useEffect(() => {
        ResetPageName('gallery');

        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchEventData = async () => {
            try {
                const res = await getSingleItemById(token, 'event', id, source);
                if (isMounted) {
                    setEventDetails(res);
                    setImage(res.gallery[0]?.image)
                }
            } catch (error) { }
        }
        fetchEventData();

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [token, id, reload]);

    const url = window.location.href;

    const navigatePayment = (price) => {
        const OZEventAttend = {
            id: eventDetails?.id,
            date: eventDetails?.dates,
            title: eventDetails?.event_name,
            genre: eventDetails?.event_type?.name,
            capacity: eventDetails?.capacity,
            price: price,
            active_membership_discount: eventDetails?.active_membership_discount
        };
        localStorage.setItem("OZEventAttend", JSON.stringify(OZEventAttend));
        navigate(`/event-bookingSummary`);
    };

    const attend = async () => {
        if (token) {
            try {
                const result = await checkEvent(token, userId, id);
                console.log(result);

                if (result.bookable) {
                    navigatePayment(eventDetails.default_price);
                } else {
                    Modal.success({
                        title: result.status,
                        content: result.message,
                        footer: false,
                        centered: true,
                        closable: true,
                        maskClosable: true
                    });
                }
            } catch (error) {
                Modal.error({
                    title: error.response.data.status,
                    content: error.response.data.message,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true
                });
            }
        } else {
            setShow(true);
        }
    };

    const cancel = async () => {
        setReload(false);
        try {
            const res = await cancelEventAttend(token, userId, eventDetails.event_attend_id);
            if (res) {
                Modal.success({
                    title: res.status,
                    content: res.message,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true
                });
                setReload(true);
            }
        } catch (error) {
            Modal.error({
                title: error.response.data.status,
                content: error.response.data.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        cssEase: "linear",
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true
    };

    const settingsGallry = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true,
    };

    // const compareTime = (eventEnd, eventId) => {

    //     const currentTime = new Date();
    //     const eventEndTime = new Date(eventEnd);

    //     const currentHour = currentTime.getHours();
    //     const eventHour = eventEndTime.getHours();
    //     const isSameDay = currentTime.getDate() === eventEndTime.getDate();

    //     if (isSameDay) {

    //         if(currentTime.setHours(currentHour + 12) < eventEndTime.setHours(eventHour + 12) ){

    //             if(eventId === null){
    //                 return (
    //                     <Button 
    //                     tagType='link'
    //                     className="btn button-outLine btn-bg-white attend-btn m-0"
    //                     onClick={attend}>Attend</Button>
    //                 )
    //             }else{
    //                 return (
    //                     <Button 
    //                     tagType='link'
    //                     className="btn button-outLine btn-bg-white attend-btn m-0"
    //                     onClick={cancel}>cancel</Button>
    //                 )
    //             }
    //         }
    //     }

    //     if ((eventDetails && eventEndTime) > currentTime) {

    //         if(eventId === null){
    //             return (
    //                 <Button 
    //                 tagType='link'
    //                 className="btn button-outLine btn-bg-white attend-btn m-0"
    //                 onClick={attend}>Attend</Button>
    //             )
    //         }else{
    //             return (
    //                 <Button 
    //                 tagType='link'
    //                 className="btn button-outLine btn-bg-white attend-btn m-0"
    //                 onClick={cancel}>cancel</Button>
    //             )
    //         }
    //     }

    // };

    return (
        <>
            <div className="navigator-feed">
                <div className='container-fluid'>
                    <div className='d-flex'>
                        <h1 className="title-name mb-0">
                            Events
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

            <section className="community-events-details">
                <div className="container-fluid">
                    <div className="row border-of-section position-relative ">
                        <div className="col-md-6 col-lg-4 col-sm-4 col-xs-6 border-right  ">
                            <div className="box-content">
                                <h2 className="h2-text-box">{eventDetails && eventDetails.event_name}</h2>
                                <div className="event-type-details">
                                    <span className="status-event">genre: <span>{eventDetails && eventDetails.event_type?.name}</span></span>
                                </div>
                                <div className="d-flex  mb-5 flex-column">
                                    <div className="amenities-box col-12">
                                        <div className='d-flex flex-column '>

                                            {eventDetails && eventDetails.dates?.map(date => {
                                                return (
                                                    <div className='row'>
                                                        <div className='col-6 mb-3' >

                                                            <div className='d-flex align-items-center mb-2'>

                                                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                    <path d="M9.33594 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
                                                                    <path d="M22.6641 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
                                                                    <path d="M2.66406 12H29.3307" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
                                                                    <path d="M2.66406 16.0026C2.66406 10.9743 2.66406 8.46013 4.22616 6.89803C5.78826 5.33594 8.30241 5.33594 13.3307 5.33594H18.6641C23.6924 5.33594 26.2065 5.33594 27.7686 6.89803C29.3307 8.46013 29.3307 10.9743 29.3307 16.0026V18.6693C29.3307 23.6976 29.3307 26.2117 27.7686 27.7738C26.2065 29.3359 23.6924 29.3359 18.6641 29.3359H13.3307C8.30241 29.3359 5.78826 29.3359 4.22616 27.7738C2.66406 26.2117 2.66406 23.6976 2.66406 18.6693V16.0026Z" stroke="black" stroke-width="2" />
                                                                    <path d="M23.9974 21.3308L21.3307 21.3308M21.3307 21.3308L18.6641 21.3308M21.3307 21.3308L21.3307 18.6641M21.3307 21.3308L21.3307 23.9974" stroke="black" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                                <h5 className="event_text">{moment(date.check_in_date).format("DD MMMM")}</h5>
                                                            </div>
                                                            <div className='d-flex align-items-center mb-2'>

                                                                <svg className='me-2'  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                    <circle cx="16" cy="17.3281" r="12" stroke="black" stroke-width="2" />
                                                                    <path d="M16 12V17.3333L19.3333 20.6666" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M4.66406 5.99739L9.99742 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M27.3333 5.99739L22 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <h5 className="event_text">{moment(date.check_in_time, 'HH:mm:ss').format("hh:mm a")}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='col-6 mb-3'>


                                                            <div className='d-flex align-items-center mb-2'>

                                                                <svg className='me-2'  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                    <path d="M9.33594 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
                                                                    <path d="M22.6641 5.33594V3.33594" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
                                                                    <path d="M2.66406 12H29.3307" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" />
                                                                    <path d="M2.66406 16.0026C2.66406 10.9743 2.66406 8.46013 4.22616 6.89803C5.78826 5.33594 8.30241 5.33594 13.3307 5.33594H18.6641C23.6924 5.33594 26.2065 5.33594 27.7686 6.89803C29.3307 8.46013 29.3307 10.9743 29.3307 16.0026V18.6693C29.3307 23.6976 29.3307 26.2117 27.7686 27.7738C26.2065 29.3359 23.6924 29.3359 18.6641 29.3359H13.3307C8.30241 29.3359 5.78826 29.3359 4.22616 27.7738C2.66406 26.2117 2.66406 23.6976 2.66406 18.6693V16.0026Z" stroke="black" stroke-width="2" />
                                                                    <path d="M23.9974 21.3308L21.3307 21.3308M21.3307 21.3308L18.6641 21.3308M21.3307 21.3308L21.3307 18.6641M21.3307 21.3308L21.3307 23.9974" stroke="black" stroke-width="2" stroke-linecap="round" />
                                                                </svg>
                                                                <h5 className="event_text">{moment(date.check_out_date).format("DD MMMM")}</h5>

                                                            </div>
                                                            <div className='d-flex align-items-center mb-2'>

                                                                <svg className='me-2'  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                    <circle cx="16" cy="17.3281" r="12" stroke="black" stroke-width="2" />
                                                                    <path d="M16 12V17.3333L19.3333 20.6666" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M4.66406 5.99739L9.99742 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M27.3333 5.99739L22 2.66406" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <h5 className="event_text">{moment(date.check_out_time, 'HH:mm:ss').format("hh:mm a")}</h5>

                                                            </div>
                                                        </div>

                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>





                                    {eventDetails && eventDetails.host?.map(host => {
                                        return (
                                            <div className="d-flex my-2">
                                                <svg className='me-2'  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path d="M5.69531 24.4583C5.69531 24.4583 8.66734 20.6641 16.0006 20.6641C23.334 20.6641 26.3061 24.4583 26.3061 24.4583" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M15.9974 2.66406C8.6336 2.66406 2.66406 8.6336 2.66406 15.9974C2.66406 23.3611 8.6336 29.3307 15.9974 29.3307C23.3611 29.3307 29.3307 23.3611 29.3307 15.9974C29.3307 8.6336 23.3611 2.66406 15.9974 2.66406Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M16 16C18.2092 16 20 14.2092 20 12C20 9.79087 18.2092 8 16 8C13.7908 8 12 9.79087 12 12C12 14.2092 13.7908 16 16 16Z" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <h5 className="amenities-text">{host.name}</h5>
                                            </div>
                                        )

                                    })}
                                    <Media type='img'
                                        src={vector}
                                        alt="vector"
                                        className='vector' />

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-8 col-sm-8 col-xs-6  m-auto">
                            <Slider {...settings}>
                                {eventDetails && eventDetails.gallery?.map((item, index) => {
                                    return (
                                        <div className='img_block' key={index}>
                                            <Media
                                                type="img"
                                                className="image-box w-100 "
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    height: '560px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </Slider>

                        </div>

                    </div>
                </div>
            </section>


            <section className="about-event-details px-60 py-5  border-bottom">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="event-type-details">
                                <div className="event-type-details">
                                    <Paragraph className="status-event">Price:<br /><span className='mt-3'>{eventDetails.default_price} EGP</span></Paragraph>
                                </div>

                            </div>
                            <div className="event-type-details">
                                <span className="status-event">About Event</span>
                                <Paragraph className="event_text mt-3">
                                    {eventDetails.description}
                                </Paragraph>
                            </div>
                            <span className="status-event">Host:
                                {eventDetails && eventDetails.host?.map(host => {
                                    return (
                                        <span className='ms-2'>{host.name}</span>
                                    )
                                })}
                            </span>

                            <div className="cards-event-buttons d-flex justify-content-center align-items-center">
                                {/* {compareTime(eventDetails.end, eventDetails.event_attend_id)} */}
                                <Button
                                    tagType='link'
                                    className="btn button-outLine btn-bg-white attend-btn m-0"
                                    onClick={attend}>Attend</Button>

                                <div className='mx-4'>
                                    <ShareButton border={true} shareUrl={url} title={eventDetails.event_name} description={eventDetails.description} />
                                </div>
                                <AddToFavButton border={true} add_fav={false} is_favorite={eventDetails.is_favorite} id={eventDetails.id} type={'event'} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="border-of-section py-5">
                <div className="container-fluid">
                    <div className="row  ">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-6  ">
                            <div className="box-content text-center">
                                <h2 className="h2-text-box">pervious gallery events</h2>
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-6">
                            <Slider {...settingsGallry}>
                                {data && data.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img
                                                type="img"
                                                className="image-box w-100"
                                                src={item.value}
                                                alt={item.key}
                                                height='306px'
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </Slider>

                        </div>

                    </div>
                </div>
            </section>
            <LoginAlert
                show={show}
                onHide={handelHide}
            />

        </>
    );
};

export default CommunityEventsDetails;
