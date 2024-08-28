import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
import '../../ProfileTabs/ProfileTabs.css';
import Paragraph from '../../../UI/Paragraph';
import ProgressBar from "@ramonak/react-progress-bar";
import { getMyPlans } from '../../../../apis/User';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';

const MyPlan = ()=>{
    
    const navigate = useNavigate();
    const {token, userId} = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('active');
    const [plans, setPlans] = useState([]);
    const [planData, setPlanData] = useState([]);

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;

        getMyPlans(token, userId, signal).then(res=>{
            setPlans(res);
        }).catch(err=>{});

        return () => {controller.abort()};
    },[token, userId]);

    useEffect(()=>{
        if(plans){
            const initialTab = Object.keys(plans).reverse()[0];
            setActiveTab(initialTab);
            setPlanData(plans[initialTab]);
        }
    },[plans]);

    const handleTabClick = (key) => {
        setActiveTab(key);
        setPlanData(plans[key]);
    };

    const showDetails = (plan) => {
        localStorage.setItem('myProPlanOZ', JSON.stringify(plan));
        navigate(`/myplanDetials/${plan?.id}`)
    }
    
    return (
        <>
            <Tab.Container id="left-tabs-example"
                defaultActiveKey={activeTab}
                className='py-4 px-5'>
                <div className="container p-sm-4 p-0">
                    <div className="head-form">
                        <h2>My Plan</h2>
                    </div>
                    <Nav variant="pills" className="col-11 row mx-auto my-3 justify-content-center booking_nav">
                        {
                            plans && Object.keys(plans).reverse().map((item,index)=>{
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
                            {(planData && planData.length === 0) && <Paragraph className='empty'>{`there is no ${activeTab} plans`}</Paragraph> }
                            { planData && planData.map((item, index)=>{
                                return (
                                    <div className='card card_event p-3' 
                                        key={index} 
                                        onClick={()=>{
                                            showDetails(item)
                                        }}>
                                        <div className='row g-2 justify-content-between align-items-center'>
                                            <div className='col-lg-6 col-12 d-flex align-items-center'>
                                                <div className='ps-3'>
                                                    <Paragraph className='card-title'>{item?.name}</Paragraph>
                                                    <Paragraph className='grey-span'>{item?.name}</Paragraph>
                                                    <Paragraph className='dynamic_wraper'>{item?.description}</Paragraph>
                                                    <Paragraph className="price-hour mb-0">{item?.pro_current_package_price} EGP / {item?.pro_current_months} {item?.time}</Paragraph>
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-12 d-flex justify-content-end'>
                                                <img src={item?.image} alt='event-img' style={{
                                                    height: '200px',
                                                    objectFit: 'cover'
                                                }}/>
                                            </div>
                                        </div>
                                        <div className='mt-3 d-flex align-items-center justify-content-between'>
                                            <div className='col-11'>
                                                <ProgressBar 
                                                    completed={item?.time_progress}
                                                    bgColor={'#D0DF00'}
                                                    baseBgColor={'#C5CED340'} />
                                            </div>
                                            <span className='completed_percentage'>{item?.time_progress}%</span>  
                                        </div>
                                    </div>
                                )
                                })
                            }
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </Tab.Container>
        </>
    );
};
export default MyPlan;