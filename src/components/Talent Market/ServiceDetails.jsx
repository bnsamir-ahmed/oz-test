import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getSingleItemById } from '../../apis/User';
import {AuthContext} from '../../apis/context/AuthTokenContext';
import LoginAlert from '../Auth/LoginAlertModal';
import vector from '../../assets/images/Vector.png';
import Media from '../Media/Media';
import Button from '../UI/Button';

const ServiceDetails = () => {

    const {id} = useParams();
    const [service, setService] = useState({});
    const { token, userId } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handelHide = ()=>setShow(false);

    useEffect(()=>{
        const source = axios.CancelToken.source();

        getSingleItemById(token, 'market', id, source).then(res=>{
            setService(res);
        }).catch(err=>{});

        return ()=>source.cancel();
    },[token, id]);


    return (
        <>
            <div className="navigator">
                <div className="container-fluid">
                    <div className='d-flex'>
                        <h1 className="title-name mb-0">
                            Service Details
                        </h1>
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
                </div>
            </div>
            <section className="community-events-details">
                <div className="container-fluid">
                    <div className="row border-of-section position-relative ">
                        <div className="col-md-6 col-lg-4 col-sm-4 col-xs-6 border-right  ">
                            <div className="box-content">
                                <h2 className="h2-text-box">{service && service.title}</h2>
                                <div className="event-type-details">
                                    <span className="status-event"><span>{service && service.formatted_time} ago</span></span>
                                </div>
                                <div
                                    className="d-flex  mb-5 amenities-box-details">
                                    <div className="amenities-box">
                                        <img src={service.category?.logo} alt={service.category?.name}/>
                                        <h5 className="amenities-text">{service.category?.name}</h5>
                                    </div>

                                    <div className="amenities-box">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3725 23.931C17.2968 23.7487 17.1858 23.5831 17.046 23.4437C16.9067 23.3043 16.7413 23.1936 16.5592 23.1182C16.3771 23.0427 16.1819 23.0038 15.9847 23.0038C15.7876 23.0038 15.5924 23.0427 15.4103 23.1182C15.2282 23.1936 15.0628 23.3043 14.9235 23.4437L14.181 24.1862C13.3369 25.0303 12.1922 25.5045 10.9985 25.5045C9.80483 25.5045 8.66005 25.0303 7.816 24.1862C6.97195 23.3422 6.49776 22.1974 6.49776 21.0037C6.49776 19.8101 6.97195 18.6653 7.816 17.8212L10.8285 14.8112C11.6397 13.9994 12.7305 13.5283 13.8776 13.4941C15.0248 13.46 16.1416 13.8654 16.9997 14.6275C17.1475 14.7588 17.3196 14.8598 17.5064 14.9245C17.6931 14.9893 17.8908 15.0167 18.0881 15.0051C18.2855 14.9935 18.4786 14.9431 18.6564 14.8569C18.8343 14.7707 18.9934 14.6502 19.1247 14.5025C19.2561 14.3548 19.357 14.1826 19.4218 13.9959C19.4866 13.8091 19.514 13.6114 19.5023 13.4141C19.4907 13.2168 19.4404 13.0237 19.3541 12.8458C19.2679 12.668 19.1475 12.5088 18.9997 12.3775C17.5688 11.1061 15.7058 10.43 13.7925 10.4876C11.8792 10.5453 10.0604 11.3323 8.7085 12.6875L5.6935 15.7012C4.28652 17.1082 3.49609 19.0165 3.49609 21.0062C3.49609 22.996 4.28652 24.9043 5.6935 26.3112C7.10047 27.7182 9.00874 28.5086 10.9985 28.5086C12.9883 28.5086 14.8965 27.7182 16.3035 26.3112L17.046 25.5687C17.1858 25.4294 17.2968 25.2638 17.3725 25.0815C17.4482 24.8991 17.4872 24.7037 17.4872 24.5062C17.4872 24.3088 17.4482 24.1133 17.3725 23.931Z" fill="black"/>
                                        <path d="M26.306 5.69375C24.8979 4.28894 22.99 3.5 21.001 3.5C19.012 3.5 17.1041 4.28894 15.696 5.69375L14.9535 6.43625C14.6717 6.71804 14.5134 7.10023 14.5134 7.49875C14.5134 7.89726 14.6717 8.27945 14.9535 8.56125C15.2353 8.84304 15.6175 9.00135 16.016 9.00135C16.4145 9.00135 16.7967 8.84304 17.0785 8.56125L17.821 7.81875C18.665 6.97469 19.8098 6.50051 21.0035 6.50051C22.1972 6.50051 23.3419 6.97469 24.186 7.81875C25.03 8.6628 25.5042 9.80758 25.5042 11.0012C25.5042 12.1949 25.03 13.3397 24.186 14.1837L21.1722 17.1987C20.3603 18.0102 19.2689 18.4807 18.1215 18.5139C16.9741 18.5471 15.8573 18.1406 14.9997 17.3775C14.852 17.2462 14.6799 17.1452 14.4931 17.0804C14.3064 17.0157 14.1087 16.9883 13.9114 16.9999C13.714 17.0115 13.5209 17.0619 13.3431 17.1481C13.1652 17.2343 13.0061 17.3548 12.8747 17.5025C12.7434 17.6502 12.6425 17.8224 12.5777 18.0091C12.5129 18.1959 12.4855 18.3936 12.4971 18.5909C12.5088 18.7882 12.5591 18.9813 12.6453 19.1592C12.7316 19.337 12.852 19.4962 12.9997 19.6275C14.4297 20.8986 16.2914 21.5751 18.2038 21.5187C20.1162 21.4622 21.9348 20.677 23.2872 19.3237L26.3022 16.31C27.7087 14.9022 28.499 12.9939 28.4997 11.0039C28.5004 9.01394 27.7115 7.10502 26.306 5.69625V5.69375Z" fill="#BDBDBD"/>
                                        </svg>
                                        <a className='' href={`https://${service.portfolio_link}`} target='_blank'>
                                            <h5 className="amenities-text">{service.portfolio_link}</h5>
                                        </a>
                                        
                                    </div>
                                    <div className="amenities-box">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <path d="M5.69531 24.4583C5.69531 24.4583 8.66734 20.6641 16.0006 20.6641C23.334 20.6641 26.3061 24.4583 26.3061 24.4583" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.9974 2.66406C8.6336 2.66406 2.66406 8.6336 2.66406 15.9974C2.66406 23.3611 8.6336 29.3307 15.9974 29.3307C23.3611 29.3307 29.3307 23.3611 29.3307 15.9974C29.3307 8.6336 23.3611 2.66406 15.9974 2.66406Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16 16C18.2092 16 20 14.2092 20 12C20 9.79087 18.2092 8 16 8C13.7908 8 12 9.79087 12 12C12 14.2092 13.7908 16 16 16Z" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                        <h5 className="amenities-text">{service.user_id?.name}</h5>
                                    </div>
                               
                                    <Media type='img'
                                     src={vector}
                                     alt="vector"
                                     className='vector'/>

                                </div>
                                
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-8 col-sm-8 col-xs-6  m-auto">
                            <div className='img_block'>
                                <Media
                                    type="img"
                                    className="image-box w-100 "
                                    src={service.image}
                                    alt={service.name}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <section className="about-event-details px-60 py-5  border-bottom">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="event-type-details">
                                <p className="status-event mb-4">About Project</p>
                                    <p className="p-text-box">
                                        {service.description}
                                    </p>
                            </div>
                            <div className="cards-event-buttons text-center">
                                {(service && service.user_id?.user_id !== userId) ? 
                                    (
                                        <>
                                            {(service && service.contact_type?.includes('hat')) && 
                                                <Button 
                                                    tagType='link'
                                                    onClick={()=>{
                                                        if(token){
                                                            const recipent = {
                                                                name: service.user_id?.name,
                                                                id: service.user_id?.id,
                                                                avatar: service.user_id?.avatar
                                                            }
                                                            localStorage.setItem('recipentOZData',JSON.stringify(recipent));
                                                            navigate(`/dmchat/${service.id}/${service.user_id?.id}`)
                                                        }else{
                                                            setShow(true);
                                                        }
                                                    }}
                                                    className="btn button-outLine btn-bg-white attend-btn">Contact</Button>
                                            }
                                            {(service && service.contact_type?.includes('mail')) && <a className="btn button-outLine btn-bg-white attend-btn" href={`mailto://${service.user_id?.email}`} target='_blank'>Contact</a>}
                                            {(service && service.contact_type?.includes('all')) && <a className="btn button-outLine btn-bg-white attend-btn" href={`tel://${service.user_id?.phone}`} target='_blank'>Contact</a>}
                                        </>
                                    )
                                    :
                                    (
                                        <Button 
                                            tagType='link'
                                            onClick={()=>{
                                                if(token){
                                                    navigate(`/dmchat/provider/${service.id}`)
                                                }else{
                                                    setShow(true);
                                                }
                                            }
                                            }
                                            className="btn button-outLine btn-bg-white attend-btn">See Contacts</Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoginAlert 
                show={show}
                onHide={handelHide}
            />
        </>
    )
};
export default ServiceDetails;