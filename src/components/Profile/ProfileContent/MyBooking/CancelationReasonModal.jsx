import { useState, useContext } from 'react';
import {Formik} from 'formik';
import * as Yup from "yup";
import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { getCancelReasonsList } from '../../../../apis/Booking';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { cancelBookingReason, cancelBooking } from '../../../../apis/Booking';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Modal as modal } from 'antd';

const CancelationReasonModal = (props) => {

    const [answer, setReason] = useState('');
    const { token, userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isPending, error, data: cancelReasons } = useQuery({
        queryKey: ["cancel-reason"],
        queryFn: ({ signal }) => getCancelReasonsList(token, userId, signal),
    });

    const Cancel = async (values)=>{
        try{
            const result = await cancelBookingReason(token, userId, props.booking_id, values.cancelReason, answer);
            if(result){
                try{
                    const res = await cancelBooking(token, userId, props.booking_id);
                    modal.success({
                        title: res.status,
                        content: res.message,
                        footer: false,
                        centered: true,
                        closable: true,
                        maskClosable: true,
                    });
                    navigate('/profile/mybooking');
                }catch(error){
                    modal.error({
                        title: error.response.data.status,
                        content: error.response.data.message,
                        footer: false,
                        centered: true,
                        closable: true,
                        maskClosable: true
                    });
                }

            }
            // modal.success({
            //     title: result.status,
            //     content: result.message,
            //     footer: false,
            //     centered: true,
            //     closable: true,
            //     maskClosable: true
            // });
        }catch(error){
            Modal.error({
                title: error.response.data.status  || "Error",
                content: error.response.data.message || "An error occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        }
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                centered
                className='modal-invites'>
                    <Modal.Body className={`justify-content-center align-items-center p-4`}>
                        <Paragraph className="h2-description">Cancellation Booking</Paragraph>
                        <Formik
                            initialValues={{
                                cancelReason: '',
                            }}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                Cancel(values)
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    cancelReason: Yup.string().required()
                                })
                            }
                            >
                                {({ 
                                    values, 
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit }) => (

                                    <form className='m-4' onSubmit={handleSubmit}>
                                        { (cancelReasons && cancelReasons.length !==0 ) && cancelReasons.map((reason, index) => {
                                            return (
                                                <div className="d-flex justify-content-start form-check border-bottom p-3 align-items-center" key={index}>
                                                    <input 
                                                        className={
                                                            errors.cancelReason && touched.cancelReason
                                                            ? "form-check-input me-3 is-radio-invalid"
                                                            : "form-check-input me-3"
                                                        } 
                                                        type="radio" 
                                                        name='cancelReason' 
                                                        value={reason.id} 
                                                        id={reason.id}
                                                        onChange={handleChange}
                                                        onClick={()=>{setReason(reason.question)}}
                                                        onBlur={handleBlur}/>
                                                    <label className="form-check-label cancel_label" htmlFor={reason.id}>
                                                        {reason.question}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                        <div className='text-center'>
                                            <Button 
                                                tagType='button'
                                                type='submit'
                                                className="btn btn_outline_black btn_default auth_btn_padding"> 
                                                save                                               
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                    </Modal.Body>
            </Modal>
        </>
    );
}
export default CancelationReasonModal;