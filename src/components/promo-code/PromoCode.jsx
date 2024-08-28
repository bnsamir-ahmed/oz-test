import React, { useContext, useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { applyPromoCode } from '../../apis/config';

const PromoCode = ({price, getPrice, getPromoId, getPromoValue}) => {

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, seterror] = useState('');
    const [discount, setDiscount] = useState('');
    const [discount_type, setDiscount_type] = useState('');
    const [disabled, setDisabled] = useState(false);
    const {token} = useContext(AuthContext);

    const handelChange = (e) => {
        setCode(e.target.value);
        seterror('');
        setSuccess('');
    };

    const addPromoCode = async () => {
        if(code !== ''){
            setLoading(true);
            seterror('');
            setSuccess('');
            try{
                const result = await applyPromoCode(token, code);
                calcPrice(result?.discount, result?.discount_type);
                setLoading(false);
                setDisabled(true);
                getPromoId(result?.id);
            }catch(error){
                setLoading(false);
                seterror(error.response.data.message);
            }
        }else{

        }
    };

    const calcPrice = (discount, discount_type) => {
        if(discount_type === 'fixed'){
            const final_price = price - discount;
            getPromoValue(discount);
            getPrice(final_price);
            setDiscount(discount);
            setDiscount_type(discount_type);
            setSuccess(`You Have ${discount} EGP Off`);
        }else{
            const discunt_value = (price * discount) / 100 ;
            const final_price = price - discunt_value;
            getPromoValue(discunt_value);
            getPrice(final_price);
            setDiscount(discount);
            setDiscount_type(discount_type);
            setSuccess(`You Have ${discunt_value} EGP Off`);
        }
    };

    useEffect(()=> {
        if(discount !== ''){
            calcPrice(discount, discount_type)
        }
    },[price])

    return(
        <>
            <div className="col-12 d-flex justify-content-between align-items-center mb-2">
                <div className="col-10 d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="21" viewBox="0 0 26 21" fill="none">
                        <path d="M15.406 1H10.594C6.05726 1 3.78888 1 2.37949 2.39124C1.40909 3.34915 1.10684 4.70903 1.01269 6.925C0.994023 7.36445 0.984687 7.58418 1.06761 7.73078C1.15054 7.87738 1.48159 8.06032 2.1437 8.42622C2.87903 8.83258 3.37608 9.60899 3.37608 10.5C3.37608 11.391 2.87903 12.1674 2.1437 12.5738C1.4816 12.9397 1.15054 13.1226 1.06761 13.2692C0.984687 13.4158 0.994022 13.6355 1.01269 14.075C1.10684 16.291 1.40909 17.6509 2.37949 18.6088C3.78888 20 6.05726 20 10.594 20H15.406C19.9427 20 22.2111 20 23.6205 18.6088C24.5909 17.6509 24.8932 16.291 24.9873 14.075C25.006 13.6355 25.0153 13.4158 24.9324 13.2692C24.8495 13.1226 24.5184 12.9397 23.8563 12.5738C23.121 12.1674 22.6239 11.391 22.6239 10.5C22.6239 9.60899 23.121 8.83258 23.8563 8.42622C24.5184 8.06032 24.8495 7.87738 24.9324 7.73078C25.0153 7.58418 25.006 7.36445 24.9873 6.925C24.8932 4.70903 24.5909 3.34915 23.6205 2.39124C22.2111 1 19.9427 1 15.406 1Z" stroke="#BDBDBD" stroke-width="1.5"/>
                        <path d="M9.40039 14.0625L16.6004 6.9375" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M17.2008 13.4688C17.2008 14.1246 16.6635 14.6562 16.0008 14.6562C15.338 14.6562 14.8008 14.1246 14.8008 13.4688C14.8008 12.8129 15.338 12.2812 16.0008 12.2812C16.6635 12.2812 17.2008 12.8129 17.2008 13.4688Z" fill="black"/>
                        <path d="M11.2027 7.53125C11.2027 8.18709 10.6655 8.71875 10.0027 8.71875C9.33999 8.71875 8.80273 8.18709 8.80273 7.53125C8.80273 6.87541 9.33999 6.34375 10.0027 6.34375C10.6655 6.34375 11.2027 6.87541 11.2027 7.53125Z" fill="black"/>
                    </svg>
                    <input 
                        id='promo_code'
                        type="text"
                        className={"form__field ms-2"}
                        placeholder="Enter your Promo Code"
                        name="promoCode"
                        value={code}
                        onChange={handelChange}
                        disabled={disabled}                    
                    />
                </div>
                <Button 
                    className='apply_btn' 
                    loading={loading} 
                    onClick={addPromoCode}
                    disabled={disabled}>
                APPLY
                </Button>
            </div>
            {error !== '' ? 
                (<div className="fs-16 text-danger d-flex align-items-center align-self-start" role="alert">
                    {error}
                </div>) 
                : null}
            {(success !== '' &&  discount !== '') ? 
                (<div className="fs-16 text-success d-flex align-items-center align-self-start" role="alert">
                    {success}
                </div>) 
                : null}
        </>
    )
};
export default PromoCode;