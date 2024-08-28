import React, { useEffect, useState } from "react";
import Paragraph from "../../UI/Paragraph";
import Calunder from "../../UI/Icons/Calunder";
import Alarm from "../../UI/Icons/Alarm";
import Advanced from "../../UI/Icons/Advanced";
import Payment from "../../UI/Icons/Payment";
import moment from "moment";
import PromoCode from '../../promo-code/PromoCode';

function CaseOne({ details, discountRoles, getPromoValue, getPromoId }) {
  const [priceAfterPromo, setPriceAfterPromo] = useState('');
  const [price, setPrice] = useState(Math.floor(details?.price));

  const getPrice = (value) => {
    setPriceAfterPromo(value);
  };

  useEffect(()=>{
    const applayRoles = () => {
      if(discountRoles && discountRoles !== ''){
        if(discountRoles?.price === 'Free'){
          setPrice(discountRoles?.price)
        }else{
          setPrice(discountRoles?.price)
        }
      }
    }
    applayRoles()
  },[])

  return (
    <>
      <div className="p-5 bg_white col-md-8 col-12">
        <Paragraph className="paragraph_black light py-3">
          {details.title}
        </Paragraph>
        <ul className="p-0" style={{
          listStyle: 'none'
        }}>
          <li className="summary_item d-flex align-items-center mb-4">
            <Calunder />
            <Paragraph className="mb-0 mx-2">{moment(details.date).format("dddd, MMM. D, YYYY")}</Paragraph>
          </li>
          <li className="summary_item d-flex align-items-center mb-4">
            <Alarm />
            <Paragraph className="mb-0 mx-2">{details.duration} Hour</Paragraph>
          </li>
          <li className="summary_item d-flex align-items-center mb-4">
            <Advanced />
            <Paragraph className="mb-0 mx-2">{details.level}</Paragraph>
          </li>
          <li className="mb-4">
            {(discountRoles && discountRoles !== '') ? (
              <>
              <div className="d-flex">
                <Payment />
                <Paragraph className="summary_item mb-0 mx-2">
                  {price}
                </Paragraph>
              </div>
                <Paragraph className="mb-0 ms-5">
                  {discountRoles?.desc}
                </Paragraph>
              </>

            ) : 
            (
              <div className="d-flex">
                <Payment />
                <Paragraph className={`summary_item mb-0 mx-2 ${priceAfterPromo !== '' ? 'promoApplided' : ''}`}>
                  {price} EGP 
                </Paragraph>
              </div>
            )}
      
          </li>
          <li className="mb-0">
              <PromoCode 
                price={price} 
                getPrice={getPrice}
                getPromoId={getPromoId} 
                getPromoValue={getPromoValue}
              />
            </li>
              <div className="my-32" style={{
                borderBottom: '1px solid black'
              }}></div>
            <li className="price-promo">
              <div className="d-flex justify-content-between align-items-center">
                <p>Total Price:</p>
                <p>{(priceAfterPromo || priceAfterPromo === 0) ? priceAfterPromo : price} EGP</p>
              </div>
            </li>
        </ul>
      </div>
    </>
  );
}

export default CaseOne;
