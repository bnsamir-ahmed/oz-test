import { useContext, useEffect, useState } from "react";
import Paragraph from "../UI/Paragraph";
import './ContactAdminHistory.css';
import Button from "../UI/Button";
import {getContactAdminHistory} from '../../apis/User';
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useNavigate } from "react-router-dom";
import {Tab, Nav} from 'react-bootstrap';
import { useQuery } from "@tanstack/react-query";

const ContactAdminHistory = () => {

    // const [contactList, setContactList] = useState([]);
    const {userId} = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: contactList, isError, error, isPending } = useQuery({
        queryKey: ['contact_us'],
        queryFn: ({signal})=>getContactAdminHistory({signal, userId})
    })

    const setDate = (roomdate) => {
        const date = new Date(roomdate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };

        return date.toLocaleDateString('en-US', options);
    };

    const getDetails = (item) => {
        localStorage.setItem('replydetailsOZ', JSON.stringify(item))
        navigate('/replydetails');
    }
    if(isPending){
        console.log('pend');
    }

    return (
        <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="navigator border_bottom">
                <div className='container-fluid d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <h1 className="title-name mb-0">Contact Admin History</h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2"
                            height="127"
                            viewBox="0 0 2 127"
                            fill="none"
                        >
                            <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5"/>
                        </svg>
                    </div>
                    <div className="d-flex history_tabs">
                        <Nav className="d-flex booking_nav">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="booking_navlink">All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="booking_navlink">Read</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className="booking_navlink">Unread</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </div>
            <div className="container py-5 ">
                <Tab.Content style={{
                    minHeight: '50vh'
                }}>
                    <Tab.Pane eventKey="first">
                        {(contactList && contactList.length === 0) && (<Paragraph className='empty'>{'there is no Messages history'}</Paragraph>) }
                        {contactList && contactList.map((item, index)=>{
                            return (
                                <div className="history p-4 my-3" key={index} onClick={()=>{getDetails(item)}}>
                                    <Paragraph className='status-event mb-3'>{item.subject}</Paragraph>
                                    <Paragraph className='p-text-history'>{item.message}</Paragraph>
                                    <div className="d-flex justify-content-between">
                                        <Paragraph className='date-history'>Date Submitted : {setDate(item.updated_at)}</Paragraph>
                                        <Paragraph 
                                            className='date-history'>status : <span style={{
                                                color: `${item.is_read === 0 ? '#0047BB' : '#05B15D'}`
                                            }}>{item.is_read === 0 ? 'Unread' : 'Read'}</span></Paragraph>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        {contactList && contactList.filter((item => item.is_read !== 0)).length > 0 ? (
                            contactList.filter((item => item.is_read === 0)).map((e, index)=>{ 
                                return (
                                    <div className="history p-4 my-3" key={index} onClick={()=>{getDetails(e)}}>
                                        <Paragraph className='status-event mb-3'>{e.subject}</Paragraph>
                                        <Paragraph className='p-text-history'>{e.message}</Paragraph>
                                        <div className="d-flex justify-content-between">
                                            <Paragraph className='date-history'>Date Submitted : {setDate(e.updated_at)}</Paragraph>
                                            <Paragraph 
                                                className='date-history'>status : <span style={{
                                                    color: `${e.is_read === 0 ? '#0047BB' : '#05B15D'}`
                                                }}>{e.is_read === 0 ? 'Unread' : 'Read'}</span></Paragraph>
                                        </div>
                                    </div>)
                                })
                        ): (<Paragraph className='empty'>{'there is no Read Messages'}</Paragraph>)}
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        {contactList && contactList.filter((item => item.is_read === 0)).length > 0 ? (
                            contactList.filter((item => item.is_read === 0)).map((e, index)=>{ 
                                return (
                                    <div className="history p-4 my-3" key={index} onClick={()=>{getDetails(e)}}>
                                        <Paragraph className='status-event mb-3'>{e.subject}</Paragraph>
                                        <Paragraph className='p-text-history'>{e.message}</Paragraph>
                                        <div className="d-flex justify-content-between">
                                            <Paragraph className='date-history'>Date Submitted : {setDate(e.updated_at)}</Paragraph>
                                            <Paragraph 
                                                className='date-history'>status : <span style={{
                                                    color: `${e.is_read === 0 ? '#0047BB' : '#05B15D'}`
                                                }}>{e.is_read === 0 ? 'Unread' : 'Read'}</span></Paragraph>
                                        </div>
                                    </div>)
                                })
                        ): (<Paragraph className='empty'>{'there is no Unread Messages'}</Paragraph>)}
                    </Tab.Pane>

                </Tab.Content>
            </div>
        </Tab.Container>
        </>
    )
}
export default ContactAdminHistory;