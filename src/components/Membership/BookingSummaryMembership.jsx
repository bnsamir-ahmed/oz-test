import React, { useContext, useState, useEffect } from "react";
import { Modal, Steps, message } from "antd";
import Paragraph from "../UI/Paragraph";
import CaseOne from "./CasesPay/CaseOne";
import CaseTwo from "../PaymentCases/CaseTwo";
import CaseThree from "./CasesPay/CaseThree";
import Button from "../UI/Button";
import { upgradePlan } from '../../apis/User';
import { getInovice } from '../../apis/config';
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useNavigate } from "react-router-dom";
import { getBranchById } from "../../apis/config";
import { payMent } from "../../apis/config";

const BookingSummaryMembership = () => {

  const { token, branchId } = useContext(AuthContext);
  const [current, setCurrent] = useState(0);
  const [branch, setBransh] = useState('');
  const [bookingResult, setBookingResult] = useState({});
  console.log(bookingResult);
  
  const [messageApi, contextHolder] = message.useMessage();
  const [invoice, setInvoice] = useState({});
  const paymentDetails = JSON.parse(localStorage.getItem("selectedPlanOZ"));
  // console.log(paymentDetails);
  
  const userProfileData = JSON.parse(localStorage.getItem("userProfileData"));  
  // const bookingData = JSON.parse(localStorage.getItem("BookingOZDetails")) || {};
  // const bookingServices = JSON.parse(localStorage.getItem("BookingOZServices"));

  // const [servicePrice, setservicePrice] = useState(bookingServices?.reduce((sum, item) => sum + item.price, 0));



  // const [price, setPrice] = useState(0);
  const [inputValue, setInputValue] = useState();
  const [promo_code_id, setPromo_code_id] = useState(0);
  const [promo_discount, setPromo_discount] = useState(0);


  const navigate = useNavigate();

  const getPaymentValue = (value) => {
    setInputValue(value);
  };

  const getPromoId = (value) => {
    setPromo_code_id(value);
  };

  const getPromoValue = (value) => {
    setPromo_discount(value);
  };
  const handlePayment = async () => {
    try{
      const res = await payMent ({
        invoiceid: bookingResult.id, 
        amount: bookingResult?.price, 
        firstname: userProfileData.first_name, 
        lastname: userProfileData.last_name, 
        email: userProfileData.email, 
        address1: 'address1', 
        address2: 'd', 
        city: 'd', 
        state: 'd', 
        postcode: 'd', 
        country: 'd', 
        phonenumber: userProfileData.phone_number
    });
      window.location.href = res.data.link;

      
    }catch(error){
      console.log(error);
      
    }
  }
  useEffect(() => {
    getBranchById(token, branchId).then((res) => {
      setBransh(res.name);
    });
    // const calcPrice = () => {
    //   if (bookingData.membershipPackageOffer) {
    //     const price = bookingData.membershipPackageOffer.price;
    //     if (price === 0) {
    //       if (servicePrice) {
    //         setPrice(servicePrice);
    //       }
    //       else {
    //         setPrice(0);
    //         setservicePrice(0);
    //       }
    //     } else {
    //       if (servicePrice) {
    //         setPrice(servicePrice + price);
    //       } else {
    //         setPrice(price);
    //         setservicePrice(0);
    //       }
    //     }
    //   }
    // };
    // calcPrice()
    getInoviceTransaction()
  }, [branchId]);

  const steps = [
    {
      title: "Summary Membership",
      ContentTitle: "Summary Membership",
      content: <CaseOne 
        details={paymentDetails}
        getPromoId={getPromoId}
        getPromoValue={getPromoValue}
        branch={branch}
      />,
    },
    {
      title: "Payment Method",
      ContentTitle: "Payment Method",
      content: <CaseTwo getPaymentValue={getPaymentValue} />,
    },
    {
      title: "Invoice details",
      ContentTitle: bookingResult?.status === 'paid' ? 'Receipt' : 'Amount Due',
      content: <CaseThree bookingResult={bookingResult} branch={branch}  />,
    },
  ];

  const bookRequset = async () => {
    try {
      const result = await upgradePlan(token, paymentDetails.planId, paymentDetails.selected_plan_price, 0,promo_code_id, promo_discount);
      console.log(result);
      
      Modal.success({
        title: result.status,
        content: result.message_data,
        afterClose: ()=>{
          getInoviceTransaction(result?.transaction_id, 'ManagePro');
          setCurrent(current + 1);
        }
      });
    }catch(error){
      Modal.error({
        title: 'error',
        content: error.response.data.message,
        afterClose: ()=>navigate('/membership')
      });
    }
  };

  const getInoviceTransaction = async (id, type) => {
    try{
      const result = await getInovice(token, id, type);
      console.log(result);
      
      setBookingResult(result);
    }catch(error){
      console.log(error);
    }
  };

  const next = () => {
    if (current === 1) {
      if(inputValue === null || inputValue === undefined){
        messageApi.open({
          type: 'error',
          content: 'Please Choose Payment Method',
        });
      }else{
        bookRequset();
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <div className="container-fluid p-70 steps-payment">
        <div className="px_7" style={{
              textAlign: '-webkit-center'
        }}>
          <div className="col-9 d-flex justify-content-center align-items-center">
            <Steps
              type="navigation"
              size="small"
              current={current}
              className="site-navigation-steps"
              items={items}
            />
          </div>
        </div>
        <div>
          <Paragraph className="paragraph_black py-5 font-5">
            {steps[current].ContentTitle}
          </Paragraph>
          <div className={current < steps.length - 1 ? "" : null}>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
            >
              {steps[current].content}

              <div className="text-center p-5">
                {current < steps.length - 1 && (
                  <Button
                    tagType="link"
                    className="button-outLine btn-bg-white"
                    onClick={() => next()}
                  >
                    confirm
                  </Button>
                )}
              </div>
            </div>
            <div className="text-center">
              {current === steps.length - 1 && (
                  <Button
                  to= '/'
                  className="button-outLine btn-bg-white"
                  tagType="link"
                  onClick={inputValue === 'credit' ? handlePayment : undefined}
                >
                   {inputValue === 'credit' ? 'Pay' : 'Back Home'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default BookingSummaryMembership;
