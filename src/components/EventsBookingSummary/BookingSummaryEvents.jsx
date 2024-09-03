import React, { useContext, useEffect, useState } from "react";
import { Modal, Steps, message } from "antd";
import Paragraph from "../UI/Paragraph";
import CaseOne from "./CaseOne";
import CaseTwo from "../PaymentCases/CaseTwo";
import CaseThree from "./CaseThree";
import Button from "../UI/Button";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { attendEvent } from '../../apis/Events';
import { getInovice } from '../../apis/config';
import { getBranchById } from "../../apis/config";

const BookingSummaryEvents = () => {
 


  const [messageApi, contextHolder] = message.useMessage();
  const {token, userId, branchId} = useContext(AuthContext);
  const [branch, setBransh] = useState('');
  const [current, setCurrent] = useState(0);
  const [bookingResult, setBookingResult] = useState({});
  const eventDetails = JSON.parse(localStorage.getItem("OZEventAttend")) || {};
  const [inputValue, setInputValue] = useState();
  const [promo_code_id, setPromo_code_id] = useState(0);
  const [promo_discount, setPromo_discount] = useState(0);

  const getPaymentValue = (value) => {
    setInputValue(value);
  }

  const getPromoId = (value) => {
    setPromo_code_id(value);
  };

  const getPromoValue = (value) => {
    setPromo_discount(value);
  };

  useEffect(() => {
    getBranchById(token, branchId).then((res) => {
      setBransh(res.name);
    });
  }, [branchId]);
  


  const steps = [
    {
      title: "Summary Booking",
      ContentTitle: "Summary Attend Events",
      content: <CaseOne 
          details={eventDetails} 
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
      content: <CaseThree bookingResult={bookingResult} branch={branch}/>,
    },
  ];

  const attendEventCheck = async () => {
    try{
        const res = await attendEvent(token, userId, eventDetails.id, promo_code_id, promo_discount);
        Modal.success({
            title: res.status,
            content: res.message,
            centered: true,
            afterClose: ()=>{
              getInoviceTransaction(res?.transaction_id);
              setCurrent(current + 1);
            }
          });
    }catch(error){
        Modal.error({
            title: error.response.data.status,
            content: error.response.data.message,
            footer: false,
            centered: true,
            closable: true,
            maskClosable: true,
        });
    }
  };

  const getInoviceTransaction = async (id) => {
    try{
      const result = await getInovice(token, id, 'EventAttendee');
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
        attendEventCheck();
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
          <div>
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
                  to="/"
                  className="button-outLine btn-bg-white"
                  tagType="link"
                >
                  Back Home
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

export default BookingSummaryEvents;
