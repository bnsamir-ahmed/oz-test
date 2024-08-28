import React, { useContext, useState, useEffect } from "react";
import Paragraph from "../UI/Paragraph";
import Calunder from "../UI/Icons/Calunder";
import Alarm from "../UI/Icons/Alarm";
import Payment from "../UI/Icons/Payment";
import moment from "moment";
import PromoCode from '../promo-code/PromoCode';
import { AuthContext } from '../../apis/context/AuthTokenContext';

function CaseOne({ details, getPromoValue, getPromoId, branch }) {
  const [priceAfterPromo, setPriceAfterPromo] = useState('');
  const [price, setPrice] = useState(details.price);
  const { planId } = useContext(AuthContext);

  const getPrice = (value) => {
    setPriceAfterPromo(value);
  };

  const checkPackage = () => {
    if (details?.active_membership_discount && details?.active_membership_discount !== null) {
      if (+planId === details?.active_membership_discount?.id) {
        const discount = details?.active_membership_discount?.discount;
        const discount_type = details?.active_membership_discount?.discount_type === 'percentage' ? '%' : '';
        const price = details?.active_membership_discount?.price;
        // CalcPrice(discount, price, discount_type);
        return (
          <>
            <Paragraph className='mb-0 mx-2 fs-16 light'>
              You Have {discount} {discount_type} Off
            </Paragraph>
          </>
        )
      } else {
        return details?.price;
      }
    } else {
      return '';
    }
  };

  useEffect(() => {
    const CalcPrice = () => {
      if (details?.active_membership_discount && details?.active_membership_discount !== null) {
        if (+planId === details?.active_membership_discount?.id) {
          const discount = details?.active_membership_discount?.discount;
          const discount_type = details?.active_membership_discount?.discount_type === 'percentage' ? '%' : '';
          const price = details?.active_membership_discount?.price;
          if (discount_type === 'fixed') {
            setPrice(details?.price - discount);
          } else {
            const priceDicounted = details?.price * discount / 100;
            setPrice(details?.price - priceDicounted);
          }
        } else {
          return details?.price;
        }
      } else {
        return details?.price;
      }
    };
    CalcPrice();
  }, [])

  return (
    <>
      <div className="w-100 row p-5 bg_white">
        <span className="mainPlan">Summary</span>
        <Paragraph className="paragraph_black pt-3 pb-5">
          {details.title}
        </Paragraph>
        <div className="col-md-6 col-12">
          <ul className="p-0" style={{
            listStyle: 'none'
          }}>
            <li className="d-flex align-items-center mb-4">
              <Calunder />
              <Paragraph className="mb-0 mx-2 summary_item">{
                details.date.map(item => {
                  return moment(item.check_in_date).format("dddd, MMM. D, YYYY")
                })
              }</Paragraph>
            </li>
            <li className="d-flex align-items-center mb-4">
              <Alarm />
              <Paragraph className="mb-0 mx-2 summary_item">{
                details.date.map(item => {
                  return item.check_in_time
                })
              }</Paragraph>
            </li>
            <li className="d-flex align-items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M11 4V7.6" stroke="#0C0507" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.6016 4V7.6" stroke="#0C0507" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M5.59961 12.5078H25.9996" stroke="#0C0507" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M26.6 11.7988V21.9988C26.6 25.5988 24.8 27.9988 20.6 27.9988H11C6.8 27.9988 5 25.5988 5 21.9988V11.7988C5 8.19883 6.8 5.79883 11 5.79883H20.6C24.8 5.79883 26.6 8.19883 26.6 11.7988Z" stroke="#0C0507" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M19.3772 18.721C19.3489 18.6306 19.2968 18.5502 19.2269 18.489C19.1569 18.4277 19.0719 18.388 18.9813 18.3743L17.101 18.0904L16.2586 16.287C16.2184 16.201 16.1557 16.1284 16.0777 16.0777C15.9997 16.0269 15.9095 16 15.8175 16C15.7254 16 15.6352 16.0269 15.5572 16.0777C15.4792 16.1284 15.4165 16.201 15.3764 16.287L14.5342 18.0898L12.622 18.3741C12.5309 18.3877 12.4453 18.4276 12.375 18.4893C12.3048 18.551 12.2526 18.632 12.2245 18.723C12.1965 18.8141 12.1936 18.9115 12.2163 19.0041C12.239 19.0967 12.2864 19.1809 12.3529 19.2469L13.7407 20.6232L13.3908 22.5983C13.3742 22.692 13.3833 22.7887 13.4169 22.8773C13.4505 22.9659 13.5074 23.043 13.5811 23.0997C13.6547 23.1564 13.7423 23.1906 13.8337 23.1983C13.9251 23.2059 14.0167 23.1868 14.0982 23.1431L15.8156 22.2208L17.5011 23.1414C17.582 23.1856 17.6732 23.2055 17.7643 23.1987C17.8555 23.1919 17.943 23.1588 18.017 23.1031C18.091 23.0474 18.1486 22.9713 18.1832 22.8834C18.2178 22.7955 18.228 22.6993 18.2128 22.6057L17.8905 20.6232L19.2531 19.2432C19.3186 19.1769 19.365 19.0928 19.3869 19.0005C19.4088 18.9082 19.4054 18.8114 19.3772 18.721ZM17.0219 20.08C16.9652 20.1375 16.9227 20.2085 16.8981 20.2868C16.8735 20.3651 16.8675 20.4484 16.8807 20.5297L17.0809 21.7608L16.0457 21.1954C15.9759 21.1572 15.8982 21.1372 15.8192 21.1369C15.7403 21.1366 15.6625 21.1561 15.5924 21.1938L14.5363 21.7609L14.7531 20.537C14.7678 20.4539 14.7624 20.3682 14.7373 20.2878C14.7122 20.2074 14.6683 20.1347 14.6094 20.0763L13.7602 19.2341L14.9311 19.06C15.0105 19.0482 15.0859 19.0163 15.1507 18.9672C15.2155 18.918 15.2677 18.8531 15.3027 18.7781L15.8175 17.6761L16.3323 18.7781C16.3672 18.853 16.4193 18.9178 16.4839 18.9669C16.5485 19.016 16.6237 19.0479 16.7029 19.0599L17.8572 19.2341L17.0219 20.08Z" fill="black" />
              </svg>
              <Paragraph className="mb-0 mx-2 summary_item">{details.genre}</Paragraph>
            </li>
            <li className="d-flex align-items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M5.33398 13.5257C5.33398 7.52914 10.1096 2.66797 16.0007 2.66797C21.8917 2.66797 26.6673 7.52914 26.6673 13.5257C26.6673 19.4753 23.2629 26.4179 17.9512 28.9006C16.713 29.4793 15.2883 29.4793 14.0501 28.9006C8.73842 26.4179 5.33398 19.4753 5.33398 13.5257Z" stroke="black" stroke-width="2" />
                <ellipse cx="16" cy="13.332" rx="4" ry="4" stroke="#BDBDBD" stroke-width="2" />
              </svg>
              <span className='ms-2 summary_item'>{branch}</span>
            </li>
          </ul>
        </div>
        <div className="col-md-6 col-12 border-left">
          <ul className="p-0 px-sm-3 px-1" style={{
            listStyle: 'none'
          }}>
            <li className="d-flex align-items-center mb-4">
              <Payment />
              <Paragraph className={`mb-0 mx-2 summary_item ${priceAfterPromo !== '' ? 'promoApplided' : ''}`}>
                {price} EGP
              </Paragraph>
              {checkPackage()}
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
      </div>
    </>
  );
}

export default CaseOne;