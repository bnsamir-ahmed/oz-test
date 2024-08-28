import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
import { getMyBookingList } from '../../../../apis/Booking';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import Paragraph from '../../../UI/Paragraph';
import '../../ProfileTabs/ProfileTabs.css';
import { useQuery } from '@tanstack/react-query';

const MyBooking = ()=>{
    const navigate = useNavigate();
    // const [data, setData] = useState();
    const [bookingData, setBookingData] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const { token, userId, branchId } = useContext(AuthContext);

    const {data ,isPending, isError, error } = useQuery({
        queryKey: ['my-booking'],
        queryFn: ({signal}) => getMyBookingList(token, userId, branchId, signal)

    });
    const handleTabClick = (key) => {
        setActiveTab(key);
        setBookingData(data[key]);
    };

    useEffect(()=>{
        if(data){
            const initialTab = Object.keys(data)[0];
            setActiveTab(initialTab);
            setBookingData(data[initialTab]);
        }
    },[data]);

    const setDate = (roomdate)=>{
        const dateParts = roomdate.split(/[- :]/);
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]);
        const optionsDay = { day: '2-digit' };
        const optionsMonth = { month: 'short' }
        return (
            <Paragraph className='mb-0 text-center'>
                {date.toLocaleDateString('en-US', optionsDay)}
                <br />
                {date.toLocaleDateString('en-US', optionsMonth)}
            </Paragraph>
        )
    };

    const handelShowDetails = (item) => {
        navigate(`/mybookingDetails/${item?.id}`);
    }

    return (
        <>
            <Tab.Container 
                id="left-tabs-example" 
                defaultActiveKey={activeTab}
                className='py-4 px-5'>
                <div className="container p-sm-4 p-0">
                    <div className="head-form">
                        <h2>My Booking</h2>
                    </div>
                    <Nav variant="pills" className="col-sm-11 col-12 row mx-auto my-3 justify-content-center booking_nav">
                        {
                            data && Object.keys(data).map((item,index)=>{
                                return (
                                    <Nav.Item className='col-4 justify-content-center text-center p-0' key={index}>
                                        <Nav.Link 
                                            className="booking_navlink" 
                                            eventKey={item}
                                            onClick={()=>{handleTabClick(item)}}>
                                            <span className=''>{item}</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                    </Nav>
                    <Tab.Content animation className='py-4'>
                        <Tab.Pane eventKey={activeTab}>
                        {(bookingData && bookingData.length === 0) && <Paragraph className='empty'>{`there is no ${activeTab} booking`}</Paragraph> }
                        { bookingData && bookingData.map((item, index)=>{
                            return (
                                <div className='card card_event p-3 mb-3' 
                                    onClick={()=>{handelShowDetails(item)}} key={index}>
                                    <div className='row g-3 align-items-center'>
                                        <div className='col-lg-3 col-12 d-flex align-items-center'>
                                            <img src={(item.venueData && item.venueData.gallery.length !== 0 ) && item.venueData?.gallery[0].image} alt='event-img' width={'100%'} height={'136px'} style={{
                                                objectFit:'cover'
                                            }}/>
                                        </div>
                                            <div className='col-lg-7 col-md-8 col-12'>
                                                <Paragraph className='card-title mb-0'>{item.venueData?.title}</Paragraph>
                                                    <ul className="list-options d-flex p-0 py-3 m-0">
                                                        {(item.venueData && item.venueData.services !== null) && item.venueData.services.map((item, index)=>{
                                                            return (
                                                                <li className="list-option-item" key={index}>{item.name}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                <Paragraph className="price-hour mb-0">{item.venueData?.price}EGP / Hour</Paragraph>
                                            </div>
                                            <div className='col-lg-2 col-md-4 col-12 d-flex justify-content-end'>
                                                <div className='event_time'>
                                                    {setDate(item.check_in_formmated)}
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            )
                        })}
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </Tab.Container>
        </>
    );
};
export default MyBooking;