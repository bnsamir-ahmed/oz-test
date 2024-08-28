import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { Radio, Modal as model } from 'antd';
import {useNavigate} from 'react-router-dom'; 

const ApplyMonthPlanModal = ({show, onHide, type, details, planName}) => {

    const [valuePlan, setValuePlan] = useState(details?.price_6_month);
    // const [selectedPlan, setSelectedPlan] = useState({});
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = ({ target: { value } }) => {
        setValuePlan(value);
    };

    const calcDiscount = (price, discount, discount_type) => {
        if(discount_type === 'fixed'){
            return price-discount;
        }else{
            const priceDicounted =  price * discount / 100;
            return price-priceDicounted;
        }
    };

    const options = [
        {
          label: (
            <div className='price_monthly p-4' key={'1'}>
                <div className='price_body'>
                    <p className='mb-2'>Monthly</p>
                    <div className='d-flex align-items-center mb-3'>
                        <p className='priceafter mb-0'><span className="discount">{details?.price}/month</span> {calcDiscount(details?.price, details?.discount, details?.discount_type)} EGP / month</p>
                        <span className='ms-2'>inclusive of VAT</span>
                    </div>
                    <p className='mb-0 refund'>No refund if you cancel.</p>
                </div>
            </div>
          ),
          value: `${calcDiscount(details?.price, details?.discount, details?.discount_type)}`,
        },
        {
          label: (
            <div className='price_monthly p-4' key={'2'}>
                <div className='price_body'>
                    <p className='mb-2'>6 Months</p>
                    <div className='d-flex align-items-center mb-3'>
                        <p className='priceafter mb-0'><span className="discount">{details?.price * 6}/6 month</span> {details?.price_6_month} EGP / 6 Month</p>
                        <span className='ms-2'>inclusive of VAT</span>
                    </div>
                    <p className='mb-0 refund'>No refund if you cancel.</p>
                </div>
            </div>
          ),
          value: `${details?.price_6_month}`,
        },
        {
          label: (
            <div className='price_monthly p-4' key={'3'}>
                <div className='price_body'>
                    <p className='mb-2'>Annual</p>
                    <div className='d-flex align-items-center mb-3'>
                        <p className='priceafter mb-0'><span className="discount">{details?.price * 12}/Annual</span> {details?.price_12_month} EGP / Annual</p>
                        <span className='ms-2'>inclusive of VAT</span>
                    </div>
                    <p className='mb-0 refund'>No refund if you cancel.</p>
                </div>
            </div>
          ),
          value: `${details?.price_12_month}`,
        },
    ];

    const confirmMembership = () => {
        const selectedPlan = {
            planId: type,
            mainPlan: planName,
            selectedPackage: details.type,
            price: details.price,
            priceDicounted: calcDiscount(details.price, details.discount),
            description: details.description,
            time: details.time,
            time_count: details.time_count,
            discount: details.discount,
            selected_plan_price: valuePlan || details?.price_6_month,
            selected_plan: getPlan(valuePlan || details?.price_6_month),
            amenities: details.amenities
        } 
       localStorage.setItem('selectedPlanOZ', JSON.stringify(selectedPlan));
        navigate('/membership-bookingSummary');
    };

    const getPlan = (plan) => {
        if(plan !== undefined){
            if(plan === details?.price_6_month){
                return '6-Months'
            }else if(plan === details?.price_12_month){
                return '12-Months'
            }else{
                return 'Month'
            }
        }else{
            return '6-Months'
        }
    };

    return (
        <>{console.log(valuePlan)}
            <Modal
                show={show}
                onHide={onHide}
                keyboard={false}
                backdropClassName="custom-backdrop bg-navy"
                centered
            >
                <Modal.Header closeButton style={{border: 'none'}}></Modal.Header>
                    <Modal.Body className={`justify-content-center align-items-center pt-3  monthly-plan`}>
                        <div className='card-header'>
                            <h1>{details.name}</h1>
                            <p>the {planName} membership</p>
                            <span>Membership plans: Find your perfect fit</span>
                        </div>
                        <div className='card-body pt-4'>
                        <Radio.Group
                            options={options}
                            onChange={handleChange}
                            value={valuePlan}
                            optionType="button"
                            buttonStyle="solid"
                            defaultValue={details?.price_6_month}
                        />
                            <div className="d-flex buttons-group mt-5">
                                <a onClick={confirmMembership} className="btn button-outLine btn-bg-white">Confirm</a>
                                <a onClick={onHide} className="btn button-outLine btn-bg-white opacity-50">cancel</a>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )

}
export default ApplyMonthPlanModal;