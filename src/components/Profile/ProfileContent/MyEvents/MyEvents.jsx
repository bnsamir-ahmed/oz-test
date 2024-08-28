import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
import { getMyEventsList } from '../../../../apis/Events';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import Paragraph from '../../../UI/Paragraph';
import '../../ProfileTabs/ProfileTabs.css';
import moment from 'moment';

const MyEvents = ()=>{
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [eventsData, seteventsgData] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const { token, userId, branchId } = useContext(AuthContext);

    const handleTabClick = (key) => {
        setActiveTab(key);
        seteventsgData(data[key]);
    };
    useEffect(()=>{

        getMyEventsList(token, userId, branchId).then(res=>{
            setData(res)
        })
        .catch(err =>{
            console.log(err);
        })
    },[token, userId]);

    useEffect(()=>{
        if(data){
            const initialTab = Object.keys(data)[0];
            setActiveTab(initialTab);
            seteventsgData(data[initialTab]);
        }
    },[data]);

    return (
        <>
            <Tab.Container 
                id="left-tabs-example" 
                defaultActiveKey={activeTab}
                className='py-4 px-5'>
                <div className="container p-sm-4 p-0">
                    <div className="head-form">
                        <h2>My Events</h2>
                    </div>
                    <Nav variant="pills" className="col-11 row mx-auto my-3 justify-content-center booking_nav">
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
                        {(eventsData && eventsData.length === 0) && <Paragraph className='empty'>{`there is no ${activeTab} events`}</Paragraph> }
                        {eventsData && eventsData.map((event, index)=>{
                            return (
                                <div className='card card_event p-3 mb-3' 
                                    onClick={()=>{navigate(`/myeventDetails/${event.id}`)}} key={index}>
                                    <div className='row g-3 align-items-center'>
                                        <div className='col-lg-3 col-12 d-flex align-items-center'>
                                            <img src={event?.gallery[0].image} alt='event-img' width={'100%'} style={{
                                                height: '136px',
                                                objectFit: 'cover'
                                            }}/>
                                        </div>
                                            <div className='col-lg-8 col-md-10 col-12'>
                                                <Paragraph className='card-title mb-0'>{event?.event_name}</Paragraph>
                                                <ul className="list-options d-flex p-0 py-4 m-0" style={{
                                                    listStyle: 'none'
                                                }}>
                                                    <li className="list-option-item d-flex align-items-center ms-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M7.00195 3.99903V2.5" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round"/>
                                                        <path d="M16.998 3.99903V2.5" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round"/>
                                                        <path d="M1.99805 9H21.998" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round"/>
                                                        <path d="M1.99805 12C1.99805 8.22876 1.99805 6.34315 3.16962 5.17157C4.34119 4 6.22681 4 9.99805 4H13.998C17.7693 4 19.6549 4 20.8265 5.17157C21.998 6.34315 21.998 8.22876 21.998 12V14C21.998 17.7712 21.998 19.6569 20.8265 20.8284C19.6549 22 17.7693 22 13.998 22H9.99805C6.22681 22 4.34119 22 3.16962 20.8284C1.99805 19.6569 1.99805 17.7712 1.99805 14V12Z" stroke="black" stroke-width="1.25"/>
                                                        <path d="M17.998 16L15.998 16M15.998 16L13.998 16M15.998 16L15.998 14M15.998 16L15.998 18" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
                                                        </svg>{event.dates && moment(event.dates[0].check_in_date).format("DD MMMM")}
                                                    </li>
                                                    <li className="list-option-item d-flex align-items-center ms-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="13" r="8.99998" stroke="black" stroke-width="1.25"/>
                                                        <path d="M12 9V13L14.5 15.5" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M3.49805 4.49999L7.49806 2" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M20.5 4.49999L16.5 2" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                        {event.dates && moment(event.dates[0].check_in_time, 'HH:mm:ss').format("hh:mm a")}
                                                    </li>
                                                    <li className="list-option-item d-flex align-items-center ms-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M4.27148 18.3457C4.27148 18.3457 6.5005 15.5 12.0005 15.5C17.5005 15.5 19.7296 18.3457 19.7296 18.3457" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M11.998 2C6.4752 2 1.99805 6.47715 1.99805 12C1.99805 17.5228 6.4752 22 11.998 22C17.5208 22 21.998 17.5228 21.998 12C21.998 6.47715 17.5208 2 11.998 2Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#BDBDBD" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>{event?.host[0].name}
                                                    </li>
                                                </ul>
                                                <Paragraph className="event_price mb-0">{event?.default_price} EGP / Hour - {event?.event_type.name}</Paragraph>
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
export default MyEvents;