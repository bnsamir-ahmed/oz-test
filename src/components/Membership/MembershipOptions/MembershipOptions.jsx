import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './MebershipOptions.css';
import './Membership.css';
import { Container, Row } from "react-bootstrap";
import { getMembershipOptions } from "../../../apis/MembershipApi";
import MainHeaderWrapper from '../../UI/MainHeaderWrapper';
import vector from "../../../assets/images/vectorRight.svg";
import Paragraph from '../../UI/Paragraph';
import Media from "../../Media/Media";
import check_yes from '../../../assets/images/check_yes.svg';
import MembershipTypesSlider from '../MembershipTypes/MembershipTypesSlider';
import MembershipTypesSliderCorporate from '../MembershipTypes/MembershipTypesSliderCorporate';
import Button from '../../UI/Button';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import ApplyPlanModal from './ApplyPlanModal';
import ApplyMonthPlanModal from './ApplyMonthPlanModal';
import { Modal } from 'antd';
import { useQuery } from '@tanstack/react-query';

const MembershipOptions = () => {

    const {id} = useParams();
    const { token } = useContext(AuthContext);
    const [planId, setPlanId] = useState(null);
    const [show, setShow] = useState(false);
    const [showMonthPlan, setShowMonthPlan] = useState(false);
    const [item, setItem] = useState({});
    const [planName, setPlanName] = useState('');
    const navigate = useNavigate(); 

    const handelHide = () => setShow(false);
    const handelMonthModalHide = () => setShowMonthPlan(false);

    const { error, data: typeDetials} = useQuery({
        queryKey: ['get-membership-options', id],
        queryFn: ({signal}) => getMembershipOptions(token, id, signal)
    });

    const calcDiscount = (price, discount, discount_type) => {
        if(discount_type === 'fixed'){
            return price-discount;
        }else{
            const priceDicounted =  price * discount / 100;
            return price-priceDicounted;
        }
    }
    
    const addSlectedMemebershipDetails = (name, item) => {
       const selectedPlan = {
            mainPlan: typeDetials?.name,
            selectedPackage: item.type,
            price: item.price,
            priceDicounted: calcDiscount(item.price, item.discount),
            description: item.description,
            time: item.time,
            time_count: item.time_count,
            discount: item.discount,
            item: item
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
                    setPlanName(name);
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
    
    return (
        <>
            <MainHeaderWrapper image={typeDetials?.logo}>
                <div className="container-fluid px-70">
                    <div className="col-md-6 col-12">
                        <h1 className="main_header_title mb-0">{typeDetials?.is_individual === '1' ? 'individulal' : 'corporate'}</h1>
                        <h2 className="head_paragraph mb-3">{typeDetials?.name}</h2>
                        <Paragraph className="description mb-0">{typeDetials?.description}</Paragraph>
                    </div>
                </div>
            </MainHeaderWrapper>
                        <div className ='position-relative'>
                            <div className='img_float'>
                                <Media
                                    type="img" 
                                    src={vector}
                                    width='100%'
                                    alt="shape"/>
                            </div>
                        </div>
                        <div className='container-fluid px-70 pt-5'>
                            <div className='col-lg-6 pt-70'>
                                <h1>Description Membership</h1>
                                <Paragraph className='opacity-75'>{typeDetials?.description}</Paragraph>
                            </div>
                        </div>
                        <section className="Individual-types p-60">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="head-content-sec border-top border-bottom">
                                            <h2 className="h2-text text-center">Days of Access</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-5'>
                                    <div className="membershipOptionsList container-fluid">
                                        <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 g-3'>
                                            {typeDetials &&
                                                typeDetials.options.map((item, index)=>{
                                                    return(
                                                        <div className='col d-flex justify-content-center' key={index}>
                                                            <div className='card h-100 w-100'>
                                                                <div className='card-header'>
                                                                    <span>{typeDetials?.name}</span>
                                                                    <h1 className='py-3'>{item.type}</h1>
                                                                    <span className={`px-2 ${item.discount !== '0' ? 'discount' : 'priceafter' }`}>{item.price} / {item.time}</span>
                                                                    {item.discount !== '0' && <span className='mb-0 priceafter'>{calcDiscount(item.price, item.discount, item.discount_type)} / {item.time}</span>}
                                                                </div>
                                                                <div className='card-body'>
                                                                    <Paragraph><img type='img' src={check_yes} alt='check_mark' /> Your Plan Benefits</Paragraph>
                                                                    <div className='ps-3 dynamic_p' dangerouslySetInnerHTML={{ __html: item.website_description }}></div>
                                                                </div>
                                                                <div className='card-footer'>
                                                                    <div className='row row-cols-xxl-4 row-cols-lg-2 g-3' style={{
                                                                        marginRight: '15px'
                                                                    }}>
                                                                        {item.amenities.slice(0,4).map((item, index)=>{
                                                                            return (
                                                                                <div className='col d-flex flex-column align-items-center' key={index}>
                                                                                    <Media type='img' src={item.logo} alt={item.title} className='mb-3' />
                                                                                    <span className='amenity_title'>{item.title}</span>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                    <div className='text-center mt-4'>
                                                                        <Button 
                                                                            tagType='link'
                                                                            to={`/singleMember/${item.id}`}
                                                                            onClick={()=>{localStorage.setItem('membership', typeDetials?.name)}}
                                                                            className='ex_link mb-3'>explore more</Button>
                                                                        <Button 
                                                                            tagType='link'
                                                                            onClick={()=>addSlectedMemebershipDetails(typeDetials?.name, item)}
                                                                            className='btn_outline_black d-block auth_btn_padding'>apply</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
            <section className={`membership-types mb-5`}>
                <Container fluid>
                    <Row>
                        <div className="col-lg-12 border-bottom border-top ">
                            <div className="head-content-sec text-center">
                                <h2 className="h2-text">Other Types</h2>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <h2 className="h2-text-bold">Other Membership {typeDetials?.is_individual === '1' ? 'individulal' : 'corporate'}</h2>
                            {typeDetials?.is_individual === '1' ? (
                                <MembershipTypesSlider currentMemberId={id} />
                            ) : (
                                <MembershipTypesSliderCorporate currentMemberId={id} />
                            )}
                        </div>
                    </Row>

                </Container>
            </section> 
            <ApplyPlanModal 
                show={show}
                onHide={handelHide}
                type={planId}
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

export default MembershipOptions;
