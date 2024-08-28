import React , { useState }  from "react";
import CashPay from "../../UI/Icons/CashPay";
import CridetPay from "../../UI/Icons/CridetPay";
import Paragraph from "../../UI/Paragraph";

const CaseTwo = ({ getPaymentValue }) => {

  const handleCheckboxChange = (e) => {
    getPaymentValue(e.target.value);
  };
  
  return (
    <>
      <div className="p-5 bg_white">
        <Paragraph className="paragraph_black light py-3">
          Choose Payment Method
        </Paragraph>
        <form>
          <ul className="p-0">
            <li className="form-check d-flex align-items-center justify-content-between mb-4 pb-4 border-bottom">
              <label
                className="form-check-label d-flex align-items-center"
                htmlFor="cash"
              >
                <CashPay />
                <Paragraph className="mb-0 mx-2 black-span ">
                  Cash Payment
                </Paragraph>
              </label>
              <input
                type="radio"
                value={"cash"}
                onChange={handleCheckboxChange}
                name="payment"
                id="cash"
                className="radio_payment form-check-input"
              />
            </li>
            <li className="form-check d-flex align-items-center justify-content-between  mb-4 pb-4">
              <label
                className="form-check-label d-flex align-items-center"
                htmlFor="credit"
              >
                <CridetPay />
                <Paragraph className="black-span mb-0 mx-2">
                  Credit Payment
                </Paragraph>
              </label>
              <input
                type="radio"
                value={"credit"}
                name="payment"
                onChange={handleCheckboxChange}
                id="credit"
                className="radio_payment form-check-input"
              />
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default CaseTwo;
