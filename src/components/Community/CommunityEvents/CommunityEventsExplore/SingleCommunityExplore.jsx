import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import date from "../../../../assets/images/icons/calendar-event.svg";
import user from "../../../../assets/images/icons/user.svg";
import time from "../../../../assets/images/icons/alarm-event.svg";
import './CommunityEventsExplore.css';
import Button from '../../../UI/Button';
import ShareButton from '../../../UI/ShareButton';
import AddToFavButton from '../../../UI/AddToFavButton';

const SingleCommunityExplore = ({id, img, title, text, category, day, host, clock, img_style, is_favorite}) => {
    
    const [url, setUrl] = useState('');
    useEffect(()=>{
        const fullUrl = window.location.origin;
        setUrl(fullUrl);
    },[])

    return (
        <>
            <Card className="slider-card" key={id}>
                <div className="position-relative">
                    <Card.Img variant="top" src={img} className={`rounded-0 ${img_style}`} title={title}/>
                    <AddToFavButton is_favorite={is_favorite} id={id} add_fav={true} type='event'/>
                </div>

                <Card.Body>
                    <span className="card-category">{category}</span>
                    <Card.Title className="title-explore">{title}</Card.Title>
                    <Card.Text className='dynamic_wraper'>{text}</Card.Text>
                    <div className="d-flex justify-content-start align-items-center">
                        <div className="details-event d-flex align-items-center ms-0">
                            <img src={date} alt={day}/>
                            <span>{day}</span>
                        </div>
                        <div className="details-event d-flex align-items-center">
                            <img src={time} alt={clock}/>
                            <span>{clock}</span>
                        </div>
                        <div className="details-event d-flex align-items-center">
                            <img src={user} alt={host}/>
                            <span>{host}</span>
                        </div>
                    </div>
                    <div className="cards-event-buttons d-flex">
                        <Button tagType='link' to={`/events/${title}/${id}`}
                              className="btn ms-0 button-outLine btn-bg-white attend-btn">view</Button>
                        <ShareButton border={true} shareUrl={`${url}/events/${title}/${id}`} title={title} description={text}/>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default SingleCommunityExplore;
