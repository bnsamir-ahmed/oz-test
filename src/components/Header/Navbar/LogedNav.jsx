import Profile from '../../../assets/images/profile-img.png';
import Paragraph from '../../UI/Paragraph';
import Booking from '../../../assets/images/icons/booking-profile.svg';
import Event from '../../../assets/images/icons/event-profile.svg';
import Plan from '../../../assets/images/icons/plan-profile.svg';
import Logout_icon from '../../../assets/images/icons/logout.svg';
import { useState, useContext, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Logout } from '../../../apis/AuthApi';
import Button from '../../UI/Button';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { getNotificationList , getNotifications , getCount} from '../../../apis/User';
import { Badge, Dropdown, Modal } from 'antd';
import { useNavigate } from "react-router-dom";

const LogedNav = ({ showBlackNav, token, show }) => {

    const [Open, SetOpen] = useState(false);
    const [mark, setmark] = useState("All");
    const [activeTab, setActiveTab] = useState('all');
    const [seenCount, setSeenCount] = useState();
    const [notification, setNotification] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const Navigate = useNavigate();


    const handProp = (e) => {
        e.stopPropagation()
    }
    const handleMark = (name) => {
        setmark(name)
    };

    const handleTabClick = (key) => {
        setActiveTab(key);
        // setSeenCount(0);
        getList(key);
    };

    const { handleLogout, userProfileData } = useContext(AuthContext);

    const handelLogout = async () => {
        SetOpen(!Open);
        try {
            const result = await Logout(token);
            handleLogout();
        } catch (error) {
            handleLogout();
        }
    };

    // useEffect(()=>{
        const getList = async (tab) => {
            try {
                const result = await getNotificationList(token, tab);
                setNotification(result);
                // console.log(result);
                
                // setSeenCount(0);
                // result.map(item => {setSeenCount
                //     if (item.seen === '0') {
                //         getCount( item.id)
                //     }
                // });
            } catch (error) {
                console.log(error);
            }
        };
        // getList();
    // },[])

    const setDay = (roomdate) => {
        const parts = roomdate.split(/[- :]/);

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        const hour = parseInt(parts[3]);
        const minute = parseInt(parts[4]);

        const date = new Date(year, month - 1, day, hour, minute);

        const dayFormated = {
            weekday: 'long'
        };
        const formattedDay = date.toLocaleTimeString('en-US', dayFormated);

        const timeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const formattedTime = date.toLocaleTimeString('en-US', timeFormatOptions);
        return (
            <>
                <span className='mb-0 text-center me-2'>{formattedDay.split(' ')[0]}</span>
                at
                <span className='mb-0 text-center ms-2'>{formattedTime}</span>
            </>
        );
    }

    useEffect(() => {
        const getCounterNotification = async () =>{
            try{
                const result = await getNotifications(token);
                const counter = result.all
                setSeenCount(counter)
                
                
            }catch(error){
                console.log(error);
                
            }
         }
         getCounterNotification();
    }, [token, activeTab ,notification]);

    const handelRoute = async (type, object  , seen , id) => {
        if (seen == 0) {
            try {
                await getCount(token, id);
                const result = await getNotifications(token);
            } catch (error) {
                console.log(error);
            }
        }
           
        
        
       
        switch (type) {
            case 'booking_reminder_extension':
                Navigate(`/mybookingDetails/${object?.id}?reminder=true`);
                break;
            case 'booking_confirmed':
                Navigate(`/mybookingDetails/${object?.reservation_id}`);
                break;
            case 'booking_cancelation':
                Navigate(`/mybookingDetails/${object?.id}`);
                break;
            case 'booking_reschedule':
                Navigate(`/mybookingDetails/${object?.reservation_id}`);
                break;
            case 'booking_rating':
                Navigate(`/mybookingDetails/${object?.id || object?.reservation_id}?rate=true`);
                break;
            case 'booking_reminder':
                Navigate(`/mybookingDetails/${object?.id}`);
                break;
            case 'booking_invitations':
                Navigate(`/mybookingDetails/${object?.id}`);
                break;
            case 'membership_reminder':
                Navigate(`/myplanDetials/${object?.id}?addExtra=true`);
                break;
            case 'membership_cancel':
                // there is no cancellation for membership
                break;
            case 'membership_upgrade':
                Navigate(`/myplanDetials/${object?.id}`);
                break;
            case 'membership_amenitties_use':
                Navigate(`/myplanDetials/${object?.id}`);
                break;
            case 'event_cancelation':
                Navigate(`/myeventDetails/${object?.id}`);
                break;
            case 'event_reminder':
                Navigate(`/myeventDetails/${object?.id}`);
                break;
            case 'event_accept_ad':
                Navigate(`/projectDetails/${object?.id}`);
                break;
            case 'newsfeed':
                Navigate(`/community/newsfeed/singleFeed/${object?.id}`);
                break;
            case 'interest_events':
                console.log(object);
                break;
            case 'chat_notification':
                console.log(object);
                // Navigate(`/dmchat/provider/${object?.id}`);
                break;
            case 'admin_reply':
                Navigate(`/contactadmin`);
                break;
            case 'from_dashbord':
                console.log(object);

                break;
            default:
                console.log('default');
                break;
        }

    };

    const itemsNotifications = [{
        key: '1',
        label: (
            <div className="Notifications">
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey={activeTab}
                    className=''>
                    <div className='box_Notifications'>
                        <div className='d-flex justify-content-start align-items-center py-3'>
                            <Paragraph className="p_notification mb-0">Notifications</Paragraph>
                            <Badge count={seenCount}></Badge>
                        </div>
                        <Nav variant="pills" className="mx-auto">
                            <Nav.Item onClick={(e) => { e.stopPropagation(); handleTabClick('all') }}>
                                <Nav.Link
                                    eventKey={'all'}
                                    className='notification_mark py-0'>
                                    All
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={(e) => { e.stopPropagation(); handleTabClick('event') }}>
                                <Nav.Link
                                    eventKey={'event'}
                                    className='notification_mark py-0'>
                                    Events
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={(e) => { e.stopPropagation(); handleTabClick('invitation') }}>
                                <Nav.Link
                                    eventKey={'invitation'}
                                    className='notification_mark py-0'>
                                    Invitation
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Pane eventKey={activeTab} className='noti_container'>
                        <ul className='ps-0'>
                           
                            {notification && notification?.map((item, index) => {
                                return (
                                    <li className="border-dropdown d-flex px-sm-4 px-2" key={index}
                                    onClick={() => {
                                        handelRoute(item?.type, item?.object , item.seen , item.id);
                                    }}
                                    style={{ backgroundColor: item.seen != 0 ? '#ffff' : 'transparent' }}
                                    >
                                        <img className='rounded-circle' alt='profile' src={item.icon} />
                                        <div className='info_profile mt-4 ms-4'>
                                            <Paragraph className='profile_notifications mb-2'>{item.title}</Paragraph>
                                            <Paragraph className='grey-span2 mb-2'>{item.text}</Paragraph>
                                            <Paragraph className='email mb-2' alt='#/'>{setDay(item.time_formmated)}</Paragraph>
                                        </div>
                                    </li>
                                )
                            })}
                            {(notification && notification.length === 0) && <Paragraph className='empty py-5 px-3'>
                                {`there is no notifications yet in ${activeTab}`}
                            </Paragraph>}
                        </ul>
                    </Tab.Pane>
                </Tab.Container>
            </div>
        )
    }];

    const itemsProfile = [
        {
            key: '1',
            label: (
                <li className="li_img border_profile_bottom">
                    <img className='rounded-circle' alt='profile' width='80px' height='80px' src={userProfileData?.avatar || Profile} />
                    <div className='info_profile ps-3'>
                        <Button className='name_profile p-0 text-start' to={'/profile'} tagType='link'>{userProfileData?.first_name} {userProfileData?.last_name}</Button>
                        <Paragraph className='email mb-0 text-center'>{userProfileData?.email}</Paragraph>
                    </div>
                </li>
            )
        },
        // {
        //     key: '2',
        //     label: (
        //         <li onClick={() => SetOpen(!Open)} className=" li_profile">
        //             <Button className='p-0' tagType='link' to={'/profile/mybooking'}>
        //                 <img className='px-2' src={Booking} /> My Booking
        //             </Button>
        //         </li>
        //     )
        // },
        // {
        //     key: '3',
        //     label: (
        //         <li onClick={() => SetOpen(!Open)} className=" li_profile">
        //             <Button className='p-0' tagType='link' to={'/profile/myevents'}>
        //                 <img className='px-2' src={Event} />My Events
        //             </Button>
        //         </li>
        //     )
        // },
        {
            key: '4',
            label: (
                <li onClick={() => SetOpen(!Open)} className=" li_profile">
                    <Button className='p-0' tagType='link' to={'/profile/myplan'}>
                        <img className='px-2' src={Plan} />My plan
                    </Button>
                </li>
            )
        },
        // {
        //     key: '5',
        //     label: (
        //         <li onClick={() => SetOpen(!Open)} className=" li_profile">
        //             <Button className='p-0' tagType='link' to={'/coursesHistory'}>
        //                 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-2'>
        //                     <path d="M23.0922 23.9946C25.7221 23.9667 27.188 23.8019 28.1611 22.8287C29.3327 21.6572 29.3327 19.7716 29.3327 16.0003V10.667C29.3327 6.89575 29.3327 5.01014 28.1611 3.83856C26.9895 2.66699 25.1039 2.66699 21.3327 2.66699L10.666 2.66699C6.89478 2.66699 5.00916 2.66699 3.83759 3.83857C2.66602 5.01014 2.66602 6.89576 2.66602 10.667L2.66602 16.0003C2.66602 19.7716 2.66602 21.6572 3.83759 22.8288C4.8621 23.8533 6.43265 23.9819 9.33268 23.998" stroke="black" stroke-width="1.5" />
        //                     <path d="M12 8L20 8" stroke="black" stroke-width="1.5" stroke-linecap="round" />
        //                     <path d="M9.33398 12.667H22.6673" stroke="black" stroke-width="1.5" stroke-linecap="round" />
        //                     <circle cx="16" cy="21.333" r="4" stroke="#BDBDBD" stroke-width="1.5" />
        //                     <path d="M16 25.6796L12.9828 28.5722C12.5507 28.9865 12.3347 29.1936 12.1517 29.2653C11.7348 29.4286 11.2723 29.2888 11.053 28.9332C10.9568 28.7772 10.9268 28.4957 10.8668 27.9327C10.8329 27.6148 10.816 27.4559 10.7646 27.3228C10.6495 27.0248 10.4077 26.793 10.0969 26.6826C9.95804 26.6334 9.79226 26.6171 9.46071 26.5847C8.87349 26.5272 8.57989 26.4984 8.41711 26.4061C8.04617 26.1959 7.90038 25.7525 8.07074 25.3528C8.1455 25.1774 8.36155 24.9703 8.79364 24.556L10.7646 22.6664L12.1517 21.2793" stroke="#BDBDBD" stroke-width="1.5" />
        //                     <path d="M16 25.6802L19.0172 28.5728C19.4493 28.9871 19.6653 29.1942 19.8483 29.2659C20.2652 29.4292 20.7277 29.2894 20.947 28.9338C21.0432 28.7778 21.0732 28.4963 21.1332 27.9333C21.1671 27.6154 21.184 27.4565 21.2354 27.3234C21.3505 27.0254 21.5923 26.7936 21.9031 26.6833C22.042 26.634 22.2077 26.6177 22.5393 26.5853C23.1265 26.5278 23.4201 26.499 23.5829 26.4067C23.9538 26.1965 24.0996 25.7531 23.9293 25.3534C23.8545 25.178 23.6384 24.9709 23.2064 24.5566L21.2354 22.667L20 21.4316" stroke="#BDBDBD" stroke-width="1.5" />
        //                 </svg>
        //                 Course History
        //             </Button>
        //         </li>
        //     )
        // },
        // {
        //     key: '6',
        //     label: (
        //         <li onClick={() => SetOpen(!Open)} className=" li_profile border_profile_bottom">
        //             <Button className='p-0' tagType='link' to={'/gymhistory'}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className='px-2'>
        //                     <path d="M24.7334 32.0761L32.0748 24.7346M15.9237 23.2664L23.2651 15.9249" stroke="#BDBDBD" stroke-width="2.25" stroke-linecap="round" />
        //                     <path d="M7.84861 37.2146L8.6441 36.4191L7.84861 37.2146ZM10.7852 40.1511L9.98968 40.9466L10.7852 40.1511ZM18.1266 40.1511L17.3311 40.9466H17.3311L18.1266 40.1511ZM19.5949 41.6194L20.3904 40.8239H20.3904L19.5949 41.6194ZM29.2108 38.7549L28.1241 38.4637L28.1241 38.4637L29.2108 38.7549ZM26.9363 34.278L26.1408 35.0735V35.0735L26.9363 34.278ZM29.2108 37.1426L28.1241 37.4337L29.2108 37.1426ZM24.0718 43.8939L23.7806 42.8072H23.7806L24.0718 43.8939ZM22.4595 43.8939L22.7506 42.8072H22.7506L22.4595 43.8939ZM4.10588 23.928L5.19255 24.2192V24.2192L4.10588 23.928ZM6.38032 28.4049L5.58482 29.2004L6.38032 28.4049ZM4.10588 25.5403L3.01922 25.8315L4.10588 25.5403ZM9.24489 18.789L9.53606 19.8757V19.8757L9.24489 18.789ZM13.7218 21.0634L12.9263 21.8589H12.9263L13.7218 21.0634ZM10.8572 18.789L11.1484 17.7023L10.8572 18.789ZM38.7546 29.211L38.4634 28.1243H38.4635L38.7546 29.211ZM34.2778 26.9366L33.4823 27.7321V27.7321L34.2778 26.9366ZM37.1423 29.211L37.4335 28.1243H37.4335L37.1423 29.211ZM43.8936 24.072L42.807 23.7808L42.807 23.7808L43.8936 24.072ZM43.8936 22.4597L42.807 22.7509L42.807 22.7509L43.8936 22.4597ZM23.9278 4.10613L23.6366 3.01946V3.01946L23.9278 4.10613ZM28.4046 6.38056L27.6091 7.17606V7.17606L28.4046 6.38056ZM25.54 4.10613L25.2489 5.1928L25.2489 5.1928L25.54 4.10613ZM18.7887 9.24513L17.7021 8.95396L18.7887 9.24513ZM21.0632 13.722L20.2677 14.5175H20.2677L21.0632 13.722ZM18.7888 10.8574L19.8754 10.5663V10.5663L18.7888 10.8574ZM13.7831 34.2167C14.2224 34.656 14.2224 35.3683 13.7831 35.8076C13.3438 36.247 12.6315 36.247 12.1921 35.8076L13.7831 34.2167ZM35.8074 12.1924C36.2467 12.6317 36.2467 13.344 35.8074 13.7833C35.3681 14.2227 34.6557 14.2227 34.2164 13.7833L35.8074 12.1924ZM24.7339 32.0756L25.5294 31.2801V31.2801L24.7339 32.0756ZM32.0753 24.7341L32.8708 23.9386V23.9386L32.0753 24.7341ZM15.9242 23.2659L16.7197 22.4704H16.7197L15.9242 23.2659ZM23.2656 15.9244L24.0611 15.1289H24.0611L23.2656 15.9244ZM8.6441 36.4191L11.5807 39.3557L9.98968 40.9466L7.05311 38.0101L8.6441 36.4191ZM39.3554 11.5809L36.4188 8.64434L38.0098 7.05335L40.9464 9.98993L39.3554 11.5809ZM39.3554 15.8631C40.0701 15.1484 40.5243 14.6908 40.8139 14.3113C41.0836 13.9578 41.1024 13.8072 41.1024 13.722H43.3524C43.3524 14.4969 43.0251 15.1224 42.6027 15.6761C42.2 16.2038 41.6161 16.7844 40.9464 17.4541L39.3554 15.8631ZM40.9464 9.98993C41.6161 10.6596 42.2 11.2402 42.6027 11.7679C43.0251 12.3215 43.3524 12.9471 43.3524 13.722H41.1024C41.1024 13.6368 41.0836 13.4862 40.8139 13.1327C40.5243 12.7532 40.0701 12.2956 39.3554 11.5809L40.9464 9.98993ZM11.5807 39.3557C12.2953 40.0703 12.753 40.5246 13.1324 40.8141C13.486 41.0838 13.6366 41.1026 13.7218 41.1026L13.7217 43.3526C12.9468 43.3526 12.3213 43.0253 11.7676 42.6029C11.2399 42.2003 10.6593 41.6163 9.98968 40.9466L11.5807 39.3557ZM17.4538 40.9466C16.7842 41.6163 16.2036 42.2003 15.6759 42.6029C15.1222 43.0253 14.4967 43.3526 13.7217 43.3526L13.7218 41.1026C13.8069 41.1026 13.9575 41.0838 14.3111 40.8141C14.6905 40.5246 15.1482 40.0703 15.8628 39.3557L17.4538 40.9466ZM8.6441 32.1369C7.92945 32.8516 7.47519 33.3092 7.18565 33.6887C6.91592 34.0422 6.89713 34.1928 6.89713 34.278L4.64713 34.278C4.64713 33.5031 4.97442 32.8776 5.39685 32.3239C5.79948 31.7962 6.38344 31.2156 7.05311 30.5459L8.6441 32.1369ZM7.05311 38.0101C6.38344 37.3404 5.79948 36.7598 5.39685 36.2321C4.97442 35.6785 4.64713 35.0529 4.64713 34.278L6.89713 34.278C6.89713 34.3632 6.91592 34.5138 7.18565 34.8673C7.47519 35.2468 7.92945 35.7044 8.6441 36.4191L7.05311 38.0101ZM30.5457 7.05335C31.2154 6.38369 31.7959 5.79972 32.3236 5.3971C32.8773 4.97467 33.5028 4.64738 34.2778 4.64738V6.89738C34.1926 6.89738 34.042 6.91617 33.6885 7.1859C33.309 7.47543 32.8513 7.9297 32.1367 8.64434L30.5457 7.05335ZM36.4188 8.64434C35.7042 7.9297 35.2465 7.47543 34.8671 7.1859C34.5135 6.91617 34.3629 6.89738 34.2778 6.89738V4.64738C35.0527 4.64738 35.6782 4.97467 36.2319 5.3971C36.7596 5.79972 37.3402 6.38369 38.0098 7.05335L36.4188 8.64434ZM18.9221 39.3557L20.3904 40.8239L18.7994 42.4149L17.3311 40.9466L18.9221 39.3557ZM26.1408 40.8239C26.8416 40.1232 27.3133 39.65 27.6431 39.2544C27.963 38.8707 28.0758 38.644 28.1241 38.4637L30.2974 39.046C30.1297 39.6719 29.7914 40.1913 29.3712 40.6953C28.9609 41.1874 28.4033 41.7434 27.7318 42.4149L26.1408 40.8239ZM27.7318 33.4825C28.4033 34.154 28.9609 34.7101 29.3712 35.2021C29.7914 35.7062 30.1297 36.2255 30.2974 36.8514L28.1241 37.4337C28.0758 37.2535 27.963 37.0267 27.6431 36.643C27.3133 36.2474 26.8416 35.7743 26.1408 35.0735L27.7318 33.4825ZM28.1241 38.4637C28.2145 38.1263 28.2145 37.7711 28.1241 37.4337L30.2974 36.8514C30.49 37.5703 30.49 38.3272 30.2974 39.046L28.1241 38.4637ZM27.7318 42.4149C27.0603 43.0864 26.5043 43.644 26.0122 44.0543C25.5082 44.4746 24.9888 44.8128 24.3629 44.9805L23.7806 42.8072C23.9609 42.7589 24.1876 42.6461 24.5713 42.3262C24.9669 41.9964 25.4401 41.5247 26.1408 40.8239L27.7318 42.4149ZM20.3904 40.8239C21.0912 41.5247 21.5643 41.9964 21.9599 42.3262C22.3436 42.6461 22.5704 42.7589 22.7506 42.8072L22.1683 44.9805C21.5424 44.8128 21.0231 44.4746 20.519 44.0543C20.027 43.644 19.4709 43.0864 18.7994 42.4149L20.3904 40.8239ZM24.3629 44.9805C23.6441 45.1732 22.8872 45.1732 22.1683 44.9805L22.7506 42.8072C23.088 42.8976 23.4432 42.8976 23.7806 42.8072L24.3629 44.9805ZM7.17581 21.8589C6.47503 22.5597 6.00339 23.0329 5.67355 23.4285C5.35365 23.8121 5.24085 24.0389 5.19255 24.2192L3.01922 23.6368C3.18692 23.0109 3.5252 22.4916 3.94545 21.9876C4.35575 21.4955 4.91332 20.9394 5.58482 20.2679L7.17581 21.8589ZM5.58482 29.2004C4.91332 28.5289 4.35575 27.9728 3.94545 27.4807C3.5252 26.9767 3.18692 26.4573 3.01922 25.8315L5.19255 25.2491C5.24085 25.4294 5.35365 25.6562 5.67355 26.0398C6.00339 26.4354 6.47503 26.9086 7.17581 27.6094L5.58482 29.2004ZM5.19255 24.2192C5.10215 24.5565 5.10215 24.9117 5.19255 25.2491L3.01922 25.8315C2.8266 25.1126 2.8266 24.3557 3.01922 23.6368L5.19255 24.2192ZM5.58482 20.2679C6.25632 19.5964 6.81237 19.0389 7.30446 18.6286C7.80848 18.2083 8.32784 17.87 8.95372 17.7023L9.53606 19.8757C9.35579 19.924 9.12901 20.0368 8.74535 20.3567C8.34976 20.6865 7.87659 21.1581 7.17581 21.8589L5.58482 20.2679ZM12.9263 21.8589C12.2255 21.1581 11.7523 20.6865 11.3567 20.3567C10.9731 20.0368 10.7463 19.924 10.566 19.8757L11.1484 17.7023C11.7742 17.87 12.2936 18.2083 12.7976 18.6286C13.2897 19.0389 13.8457 19.5964 14.5172 20.2679L12.9263 21.8589ZM8.95372 17.7023C9.67258 17.5097 10.4295 17.5097 11.1484 17.7023L10.566 19.8757C10.2286 19.7853 9.87342 19.7853 9.53606 19.8757L8.95372 17.7023ZM40.9464 17.3314L42.4147 18.7996L40.8237 20.3906L39.3554 18.9223L40.9464 17.3314ZM42.4147 27.7321C41.7432 28.4036 41.1871 28.9611 40.695 29.3714C40.191 29.7917 39.6717 30.13 39.0458 30.2977L38.4635 28.1243C38.6437 28.076 38.8705 27.9632 39.2542 27.6433C39.6498 27.3135 40.1229 26.8419 40.8237 26.1411L42.4147 27.7321ZM35.0733 26.1411C35.774 26.8419 36.2472 27.3135 36.6428 27.6433C37.0265 27.9632 37.2532 28.076 37.4335 28.1243L36.8512 30.2977C36.2253 30.13 35.7059 29.7917 35.2019 29.3714C34.7098 28.9611 34.1538 28.4036 33.4823 27.7321L35.0733 26.1411ZM39.0458 30.2977C38.3269 30.4903 37.57 30.4903 36.8512 30.2977L37.4335 28.1243C37.7709 28.2147 38.1261 28.2147 38.4634 28.1243L39.0458 30.2977ZM40.8237 26.1411C41.5245 25.4403 41.9961 24.9671 42.326 24.5715C42.6459 24.1879 42.7587 23.9611 42.807 23.7808L44.9803 24.3632C44.8126 24.989 44.4743 25.5084 44.0541 26.0124C43.6438 26.5045 43.0862 27.0606 42.4147 27.7321L40.8237 26.1411ZM42.4147 18.7996C43.0862 19.4711 43.6438 20.0272 44.0541 20.5193C44.4743 21.0233 44.8126 21.5427 44.9803 22.1685L42.807 22.7509C42.7587 22.5706 42.6459 22.3438 42.326 21.9602C41.9961 21.5646 41.5245 21.0914 40.8237 20.3906L42.4147 18.7996ZM42.807 23.7808C42.8974 23.4435 42.8974 23.0882 42.807 22.7509L44.9803 22.1685C45.1729 22.8874 45.1729 23.6443 44.9803 24.3632L42.807 23.7808ZM20.2677 5.58507C20.9392 4.91357 21.4952 4.35599 21.9873 3.94569C22.4913 3.52544 23.0107 3.18717 23.6366 3.01946L24.2189 5.1928C24.0387 5.2411 23.8119 5.3539 23.4282 5.67379C23.0326 6.00364 22.5595 6.47528 21.8587 7.17606L20.2677 5.58507ZM27.6091 7.17606C26.9083 6.47528 26.4352 6.00364 26.0396 5.67379C25.6559 5.3539 25.4291 5.2411 25.2489 5.1928L25.8312 3.01946C26.4571 3.18717 26.9765 3.52545 27.4805 3.94569C27.9726 4.35599 28.5286 4.91357 29.2001 5.58507L27.6091 7.17606ZM23.6366 3.01946C24.3554 2.82685 25.1124 2.82685 25.8312 3.01946L25.2489 5.1928C24.9115 5.1024 24.5563 5.1024 24.2189 5.1928L23.6366 3.01946ZM21.8587 7.17606C21.1579 7.87684 20.6863 8.35 20.3564 8.74559C20.0365 9.12926 19.9237 9.35604 19.8754 9.5363L17.7021 8.95396C17.8698 8.32808 18.2081 7.80872 18.6283 7.30471C19.0386 6.81262 19.5962 6.25657 20.2677 5.58507L21.8587 7.17606ZM20.2677 14.5175C19.5962 13.846 19.0386 13.2899 18.6283 12.7979C18.2081 12.2938 17.8698 11.7745 17.7021 11.1486L19.8754 10.5663C19.9237 10.7465 20.0365 10.9733 20.3564 11.357C20.6863 11.7526 21.1579 12.2257 21.8587 12.9265L20.2677 14.5175ZM19.8754 9.5363C19.785 9.87367 19.785 10.2289 19.8754 10.5663L17.7021 11.1486C17.5095 10.4297 17.5095 9.67283 17.7021 8.95396L19.8754 9.5363ZM7.17581 27.6094L13.7831 34.2167L12.1921 35.8076L5.58482 29.2004L7.17581 27.6094ZM29.2001 5.58507L35.8074 12.1924L34.2164 13.7833L27.6091 7.17606L29.2001 5.58507ZM26.1408 35.0735L23.9384 32.8711L25.5294 31.2801L27.7318 33.4825L26.1408 35.0735ZM33.4823 27.7321L31.2798 25.5296L32.8708 23.9386L35.0733 26.1411L33.4823 27.7321ZM23.9384 32.8711L15.1287 24.0614L16.7197 22.4704L25.5294 31.2801L23.9384 32.8711ZM15.1287 24.0614L12.9263 21.8589L14.5172 20.2679L16.7197 22.4704L15.1287 24.0614ZM31.2798 25.5296L22.4701 16.7199L24.0611 15.1289L32.8708 23.9386L31.2798 25.5296ZM22.4701 16.7199L20.2677 14.5175L21.8587 12.9265L24.0611 15.1289L22.4701 16.7199ZM39.3554 18.9223C38.5106 18.0776 38.5106 16.7079 39.3554 15.8631L40.9464 17.4541C40.9803 17.4202 40.9803 17.3652 40.9464 17.3314L39.3554 18.9223ZM17.3311 40.9466C17.365 40.9805 17.4199 40.9805 17.4538 40.9466L15.8628 39.3557C16.7076 38.5109 18.0773 38.5109 18.9221 39.3557L17.3311 40.9466Z" fill="black" />
        //                 </svg>Gym History
        //             </Button>
        //         </li>
        //     )
        // },
        {
            key: '7',
            label: (
                <li onClick={handelLogout} className=" li_profile">
                    <Button className='p-0' tagType='link'>
                        <img className='px-2' src={Logout_icon} />Log out
                    </Button>
                </li>
            )
        },
    ];

    return (
        <>
       
            {/* <Dropdown
                menu={{
                    items: itemsNotifications
                }}
                trigger={['click']}
                className='notifications_icon'
            >
                <a onClick={(e) => { e.preventDefault(); getList(activeTab) }} style={{
                    cursor: 'pointer'
                }}>
                    <Badge dot={show}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path opacity="0.4" d="M15.8652 11.5254V14.1696" stroke="#0C0507" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                            <path d="M15.8816 8C12.9595 8 10.5932 10.3663 10.5932 13.2884V14.9559C10.5932 15.4958 10.3709 16.3057 10.093 16.7663L9.08454 18.4497C8.46518 19.4899 8.89397 20.6492 10.0374 21.0303C13.8329 22.2929 17.9382 22.2929 21.7337 21.0303C22.8057 20.673 23.2662 19.4184 22.6866 18.4497L21.6781 16.7663C21.4002 16.3057 21.1779 15.4879 21.1779 14.9559V13.2884C21.1699 10.3821 18.7878 8 15.8816 8Z" stroke={showBlackNav ? '#fff' : '#0C0507'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                            <path opacity="0.4" d="M18.5091 21.3555C18.5091 22.8086 17.318 23.9996 15.8649 23.9996C15.1423 23.9996 14.4753 23.6979 13.9989 23.2215C13.5224 22.7451 13.2207 22.0781 13.2207 21.3555" stroke={showBlackNav ? '#fff' : '#0C0507'} stroke-width="1.5" stroke-miterlimit="10" />
                        </svg>
                    </Badge>
                </a>
            </Dropdown> */}
            <Dropdown
                menu={{
                    items: itemsProfile
                }}
                trigger={['click']}
                className='notifications_icon mx-2'
            >
                <a onClick={(e) => e.preventDefault()} style={{
                    cursor: 'pointer'
                }}>
                    
                    <span className='user_name me-2'>{userProfileData?.first_name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke={showBlackNav ? '#fff' : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.27344 18.3457C4.27344 18.3457 6.50246 15.5 12.0024 15.5C17.5024 15.5 19.7315 18.3457 19.7315 18.3457" stroke={showBlackNav ? '#fff' : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke={showBlackNav ? '#fff' : '#BDBDBD'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </Dropdown>
            <Modal title="Basic Modal" open={isModalOpen}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}
export default LogedNav;