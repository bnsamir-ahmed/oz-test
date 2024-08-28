import React, { useContext, useEffect, useState } from "react";
import { Modal, Steps, message } from "antd";
import Paragraph from "../UI/Paragraph";
import CaseOne from "./CasesPay/CaseOne";
import CaseTwo from "../PaymentCases/CaseTwo";
import CaseThree from "./CasesPay/CaseThree";
import Button from "../UI/Button";
import { BookKnowledgeCourse } from "../../apis/OzKnowledge";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useNavigate } from "react-router-dom";
import { getBranchById, getInovice } from '../../apis/config';

const BookCourse = () => {

  const {token, userProfileData, branchId} = useContext(AuthContext);
  const [current, setCurrent] = useState(0);
  const [bookingResult, setBookingResult] = useState({});
  const [branch, setBransh] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [inputValue, setInputValue] = useState();
  const paymentDetails =  JSON.parse(localStorage.getItem("OZCourseDetails"));
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

  const HandelSummery = () => {
    const knowledgePackage = userProfileData.zee_knowledge; 
    if(paymentDetails.free === 1){
      if(knowledgePackage){
        if(knowledgePackage.total_remaining_courses > 0){
          return {
            desc: `You Have ${knowledgePackage.total_free_courses} Free Courses Included In Your Package,
            Remaning: ${knowledgePackage.total_remaining_courses} Course`,
            price: 'Free'
          };

        }else{
          const discount_type = knowledgePackage.zee_knowledge_discount_type === 'percentage' ? '%' : '';
          return {
            desc: `Enjoy ${knowledgePackage.discount} ${discount_type} Off`,
            price: `${calcPrice(paymentDetails.price, knowledgePackage.discount, discount_type)} EGP`
          };
        }
      }else{
        return '';
      }
    }
  };

  useEffect(() => {
    getBranchById(token, branchId).then((res) => {
      setBransh(res.name);
    });
  }, [branchId]);

  const steps = [
    {
      title: "Summary Booking",
      ContentTitle: "Summary Course",
      content: <CaseOne 
        details={paymentDetails} 
        discountRoles= {HandelSummery()}
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
  
  const bookRequset = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const result = await BookKnowledgeCourse(token, paymentDetails.id, paymentDetails.date, inputValue, promo_code_id, promo_discount,signal)
      setBookingResult(result.data);
      if(result){
        getInoviceTransaction(result?.data?.transaction_id);
        Modal.success({
          title: result.status,
          content: result.message,
          afterClose: ()=>{
            setCurrent(current + 1);
          }
        });
      }
    }catch(error){
      Modal.error({
        title: 'error',
        content: error.response.data.message,
        afterClose: ()=>navigate('/knowledge')
      });
    }
  };
  
  const getInoviceTransaction = async (id) => {
    try{
      const result = await getInovice(token, id, 'ZeeKnowladgeInvoice');
      console.log(result);
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

  const calcPrice = (price, discount, discount_type) => {
    if(discount_type === 'fixed'){
        return Math.floor(price - discount);
    }else{
        const priceDicounted =  price * discount / 100;
        return Math.floor(price - priceDicounted);
    }
  };

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
            <div className="d-flex flex-column justify-content-center align-items-center">
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

export default BookCourse;
