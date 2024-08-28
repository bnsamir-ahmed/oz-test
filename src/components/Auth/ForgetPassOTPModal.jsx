import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import Paragraph from  '../UI/Paragraph';
import Button from '../UI/Button';
import OTPInput, { ResendOTP } from "otp-input-react";
import { ResendOtp, ConfirmOTP } from '../../apis/AuthApi';
import './Auth.css';

const ForgetPassOTPModal = (props) => {
    const [OTP, setOTP] = useState('');
    const [response, setResponse] = useState('');
    const [responseType, setResponseType] = useState();
    const navigate = useNavigate();

    const Confirm_OTP = async () => {
        try {
            const result = await ConfirmOTP(OTP, props.email, 'forgot_password');
            localStorage.setItem("emailuseroz", props.email);
            localStorage.setItem("otpuseroz", OTP);
            navigate('/newpassword');
        } catch (error) {
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
            setResponseType(false);
            setResponse(error.response.data.message);
        }
    }
    const Resend_Otp = async () => {
        try{
            const result = await ResendOtp(props.email);
            Modal.success({
                title: result.message,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
            setResponseType(true);
            setResponse('success')
        } catch (error) {
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
            setResponseType(false);
            setResponse(error.response.data.message)
        }
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                keyboard={false}
                backdropClassName="custom-backdrop"
                centered>
                    <Modal.Header closeButton style={{
                        border: 'none'
                    }}></Modal.Header>
                    <Modal.Body className={`justify-content-center align-items-center p-5`}>
                        <div className="head-content text-center pb-3">
                            <h1 className="hand-write mb-0">Please,</h1>
                            <h3 className="bold-head">Enter the OTP</h3>
                        </div>
                        <OTPInput  
                            value={OTP} 
                            onChange={setOTP} 
                            autoFocus 
                            OTPLength={5} 
                            otpType="number"
                            className='otp_container'
                        />
                        <div className="text-center py-4">
                            <Paragraph className='d-flex justify-content-center align-items-center authFooter_copyright auth_desc mb-0'>Don't receive code?
                                <ResendOTP 
                                    className='p-0 otp_resend' 
                                    onResendClick={Resend_Otp} 
                                    maxTime='60'>Re-send</ResendOTP>
                            </Paragraph>
                        </div>
                        <Paragraph className={`text-center mb-0 ${responseType ? 'text-success' : 'text-danger'}`}>{response}</Paragraph>
                        <div className="text-center py-4">
                            <Button    
                                tagType='link'
                                onClick={Confirm_OTP} 
                                className='btn btn_outline_black w-75 py-2'>Confirm</Button>
                        </div>
                    </Modal.Body>
            </Modal>
        </>
    )

}
export default ForgetPassOTPModal;