import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import at_oz from "../../../../assets/images/at_oz.png";
import { useParams, useNavigate } from "react-router-dom";
import './MemberPackage.css';
import Media from "../../../Media/Media";
import MainHeaderWrapper from '../../../UI/MainHeaderWrapper';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { getSingleItemById } from '../../../../apis/User';
import ApplyPlanModal from '../../MembershipOptions/ApplyPlanModal';
import HouseServices from '../../../Houses/HousesDetails/HouseServices/HouseServices';
import {upgradePlan} from '../../../../apis/User';
import { Modal } from 'antd';
import ApplyMonthPlanModal from '../../MembershipOptions/ApplyMonthPlanModal';

const MemberPackage = () => {
    const {id} = useParams();
    const [packageDetails, setPackageDetails] = useState({});
    const [membershipType, setMemebershipType] = useState(localStorage.getItem('membership'))
    const objMemberShip = JSON.parse(membershipType);
    const { token, userId } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [valuePlan, setValuePlan] = useState('');
    const [showMonthPlan, setShowMonthPlan] = useState(false);
    const navigate = useNavigate(); 
    const [planName, setPlanName] = useState('');
    const [item, setItem] = useState({});
    const [planId, setPlanId] = useState(null);

    const handelHide = () => setShow(false);
    const handelMonthModalHide = () => setShowMonthPlan(false);


    useEffect(()=>{

        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchEventData = async () => {
            try{
                const res = await getSingleItemById(token, 'membership', id, source);
                if (isMounted) {
                    setPackageDetails(res);
                }
            }catch (error){}
        }
        fetchEventData();

        return ()=>{
            isMounted = false;
            source.cancel();
        };
    },[token, id]);

    const calcDiscount = (price, discount) => {
        const priceDicounted =  price * discount / 100;
        return price-priceDicounted;
    }
    const upgradeYourPlan = async (plan_Id) => {
        try{
            const result = await upgradePlan(token, plan_Id);
                Modal.success({
                    title: result.status,
                    content: result.message_data,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true
                });
        }catch(error){
            Modal.error({
                title: error.response.data.status  || "Error",
                content: error.response.data.message || "An error occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        }
    };

    const addSlectedMemebershipDetails = (item) => {
        const selectedPlan = {
            mainPlan: packageDetails?.type,
            selectedPackage: item.type,
            price: item.price,
            priceDicounted: calcDiscount(item.price, item.discount),
            description: item.description,
            time: item.time,
            time_count: item.time_count,
            discount: item.discount,
        } 
       localStorage.setItem('selectedPlanOZ', JSON.stringify(selectedPlan));
       setPlanId(item.id);
       if(token){
            if(item.time === 'day'){
                setShow(true);
            }else{
                if(item.id !== localStorage.getItem('userPlanIdOZ')){
                    setShowMonthPlan(true);
                    setItem(item);
                    setPlanName(item?.name);
                    // upgradeYourPlan(item.id);
                }else{
                    Modal.error({
                        title: 'error',
                        content: 'You Already Joined This Plan',
                        footer: false,
                        centered: true,
                        closable: true,
                        maskClosable: true
                    });
                }
            }
        }else{
            navigate('/joinus');
        }
    };
    const handleChange = ({ target: { value } }) => {
        console.log(value);
        setValuePlan(value);
    };

    

    return (
        <>
        {/* {console.log(objMemberShip?.options[0]?.amenities)} */}
            <MainHeaderWrapper image={packageDetails?.image}>
                <div className="container-fluid px-70">
                    <div className="col-md-6 col-12">
                        <h1 className="main_header_title mb-0">{objMemberShip?.name}</h1>
                        <h2 className="head_paragraph mb-3">{packageDetails?.type}</h2>
                        <Paragraph className="description mb-0">{packageDetails?.description}</Paragraph>
                    </div>
                </div>
            </MainHeaderWrapper>
                <section className="at_oz py-5">
                    <div className="container-fluid">
                        <div className="row justify-content-between">
                            <div className=" col-md-6 col-lg-6 col-sm-6 col-xs-6 m-auto ">
                                <div className="box-content px-60">
                                    <h2 className="h2-text-box">I'LL BE AT OZ</h2>
                                 
                                    <p className="p-text-box">{packageDetails?.description}</p>
                                    <div className='ps-3 dynamic_p' dangerouslySetInnerHTML={{ __html: packageDetails?.website_description }}></div>
                                        <Button 
                                            tagType='link'
                                            onClick={()=>addSlectedMemebershipDetails(packageDetails)}
                                            className="btn_outline m-auto">
                                            Apply
                                        </Button>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 d-flex justify-content-end">
                                <Media
                                    type="img"
                                    className="image-box w-100-sm"
                                    src={at_oz}
                                    alt="Our OZ Vision"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            
                <HouseServices location_amenities={packageDetails.amenities} dark_theme={true}/>
                <section className='plans container-fluid py-5'>
                    <div className='row  custom-radio justify-content-between align-items-center black mx-xl-0 mx-lg-0 mx-md-0  mx-3'>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm12 price_monthly p-4' key={'1'}>
                            <div className='price_body'>
                                <p className='mb-2'>Monthly</p>
                                <div className='d-flex align-items-center mb-3'>
                                    <p className='priceafter mb-0'>{objMemberShip?.options[0]?.price} / month</p>
                                    <span className='ms-2'>inclusive of VAT</span>
                                    {/* <p></p> */}
                                </div>
                                {/* {item.discount !== '0' && <span className='mb-0 priceafter'>{calcDiscount(item.price, item.discount, item.discount_type)} / {item.time_count} {item.time}</span>} */}
                                <p className='mb-0 refund'>No refund if you cancel.</p>
                            </div>
                        </div>
                            
                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm12 price_monthly p-4' key={'2'}>
                                        <div className='price_body'>
                                            <p className='mb-2'>6 Months</p>
                                            <div className='d-flex align-items-center mb-3'>
                                                <p className='priceafter mb-0'><span className='text-decoration-line-through'>{objMemberShip?.options[0]?.price * 6}</span> {objMemberShip?.options[0]?.price_6_month} /6 month</p>
                                                {/* <span className='ms-2'>inclusive of VAT</span> */}
                                            </div>
                                            {/* {item.discount !== '0' && <span className='mb-0 priceafter'>{calcDiscount(item.price, item.discount, item.discount_type)} / {item.time_count} {item.time}</span>} */}
                                            <p className='mb-0 refund'>No refund if you cancel.</p>
                                        </div>
                                </div>
                        
                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm12 price_monthly p-4' key={'3'}>
                                        <div className='price_body'>
                                            <p className='mb-2'>Annual</p>
                                            <div className='d-flex align-items-center mb-3'>
                                                <p className='priceafter mb-0'><span className='text-decoration-line-through '>{objMemberShip?.options[0]?.price * 12}</span> {objMemberShip?.options[0]?.price_12_month} /12 month</p>
                                                <span className='ms-2'>inclusive of VAT</span>
                                            </div>
                                            {/* {item.discount !== '0' && <span className='mb-0 priceafter'>{calcDiscount(item.price, item.discount, item.discount_type)} / {item.time_count} {item.time}</span>} */}
                                            <p className='mb-0 refund'>No refund if you cancel.</p>
                                        </div>
                                </div>
                    </div>
                           
                </section>
            <ApplyPlanModal 
                show={show}
                onHide={handelHide}
                type={id}
            />
            <ApplyMonthPlanModal 
                show={showMonthPlan}
                onHide={handelMonthModalHide}
                type={planId}
                details={item}
                planName={planName}
            />
        </>
    );
};

export default MemberPackage;
