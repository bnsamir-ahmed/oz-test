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

const BookingSummaryMembership = () => {

  const { token, branchId } = useContext(AuthContext);
  const [current, setCurrent] = useState(0);
  const [branch, setBransh] = useState('');
  const [bookingResult, setBookingResult] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [invoice, setInvoice] = useState({});
  const paymentDetails = JSON.parse(localStorage.getItem("selectedPlanOZ"));
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
  useEffect(() => {
    getBranchById(token, branchId).then((res) => {
      setBransh(res.name);
    });
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

export default BookingSummaryMembership;
