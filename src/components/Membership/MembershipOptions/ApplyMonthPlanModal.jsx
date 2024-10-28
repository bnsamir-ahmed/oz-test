import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

const ApplyMonthPlanModal = ({ show, onHide, type, details, planName }) => {
  const [valuePlan, setValuePlan] = useState(null); // No default selection
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = ({ target: { value } }) => {
    setValuePlan(value);
    setSelectedOption(value);
  };

  const calcDiscount = (price, discount, discount_type) => {
    if (discount_type === 'fixed') {
      return price - discount;
    } else {
      const priceDiscounted = (price * discount) / 100;
      return price - priceDiscounted;
    }
  };

  const options = [
    {
      label: (
        <div className="price_monthly p-4" key={'1'}>
          <div className="price_body">
            <p className="mb-2">Monthly</p>
            <div className="d-flex align-items-center mb-3">
              <p className="priceafter mb-0">{calcDiscount(details?.price, details?.discount, details?.discount_type)} </p>
              <span className="ms-2">inclusive of VAT</span>
            </div>
          </div>
        </div>
      ),
      value: `${calcDiscount(details?.price, details?.discount, details?.discount_type)}`,
    },
    {
      label: (
        <div className="price_monthly p-4" key={'2'}>
          <div className="price_body">
            <p className="mb-2">6 Months</p>
            <div className="d-flex align-items-center mb-3">
              <p className="priceafter mb-0"><span className="discount">{details?.price}</span> {details?.price_6_month} </p>
              <span className="ms-2">inclusive of VAT</span>
            </div>
          </div>
        </div>
      ),
      value: `${details?.price_6_month}`,
    },
    {
      label: (
        <div className="price_monthly p-4" key={'3'}>
          <div className="price_body">
            <p className="mb-2">Annual</p>
            <div className="d-flex align-items-center mb-3">
              <p className="priceafter mb-0"><span className="discount">{details?.price * 12}</span> {details?.price_12_month} EGP </p>
              <span className="ms-2">inclusive of VAT</span>
            </div>
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
      priceDiscounted: calcDiscount(details.price, details.discount),
      description: details.description,
      time: details.time,
      time_count: details.time_count,
      discount: details.discount,
      selected_plan_price: valuePlan,
      selected_plan: getPlan(valuePlan),
      amenities: details.amenities,
    };
    localStorage.setItem('selectedPlanOZ', JSON.stringify(selectedPlan));
    navigate('/membership-bookingSummary');
  };

  const getPlan = (plan) => {
    if (plan !== undefined) {
      if (plan === details?.price_6_month) {
        return '6-Months';
      } else if (plan === details?.price_12_month) {
        return '12-Months';
      } else {
        return 'Month';
      }
    } else {
      return '6-Months';
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} keyboard={false} backdropClassName="custom-backdrop bg-navy" centered>
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        <Modal.Body className={`justify-content-center align-items-center pt-3  monthly-plan`}>
          <div className="card-header">
            <h1>{details.name}</h1>
            <p>the {planName} membership</p>
            <span>Membership plans: Find your perfect fit</span>
          </div>
          <div className="card-body pt-4">
            <Radio.Group
              options={options}
              onChange={handleChange}
              value={valuePlan} // No default value
              optionType="button"
              buttonStyle="solid"
            />
            <div className="d-flex buttons-group mt-5">
              <a
                onClick={confirmMembership}
                className={`btn button-outLine btn-bg-white ${valuePlan ? '' : 'disabled'}`}
              >
                Confirm
              </a>
              <a onClick={onHide} className="btn button-outLine btn-bg-white opacity-50">Cancel</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ApplyMonthPlanModal;
