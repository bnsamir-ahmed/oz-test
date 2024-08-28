import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { useState, useContext } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { extendBooking } from '../../../../apis/Booking';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Modal as modal } from 'antd';
import {Formik} from 'formik';
import * as Yup from "yup";

const RemainderModal = (props)=>{

    const { token } = useContext(AuthContext);
    const [value, setValue] = useState('00:15');

    const onChange = (time) => {
        setValue(time);
    }

    const extend = async (values) => {
        try{
            const result = await extendBooking(token, props.booking_id, value)
            modal.success({
                title: result.status,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
            props.onHide();
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
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                keyboard={false}
                centered
                className='modal-invites'>
                    <Modal.Body className={`justify-content-center align-items-center p-4`}>
                        <Paragraph className="h2-description">Reminder</Paragraph>
                        <div className='d-flex justify-content-center flex-column align-items-center'>
                            <div className='my-4' style={{
                                width: '150px',
                                height: '150px'
                            }}>
                                <CircularProgressbarWithChildren 
                                    value={'90'} 
                                    styles={buildStyles({
                                        pathTransitionDuration: 0.5,
                                        pathColor: `#000`,
                                        trailColor: '#fff',
                                        backgroundColor: '#fff',
                                    })}
                                >
                                    <span className='progress_text'>Booking</span>
                                    <span className='progress_percentage'>90%</span>
                                </CircularProgressbarWithChildren>
                            </div>
                            <Paragraph className='text_reminder'>Reminder: 10 mintes left</Paragraph>
                        </div>
                        <Formik
                            initialValues={{
                                time: value,
                            }}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                extend(values)
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    time: Yup.string().required(),
                                })}>
                                {props => { 
                                   const { 
                                    values, 
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit } = props;
                                    return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form__group field my-3">
                                            <label htmlFor="extendtime"
                                                className="form__label d-flex align-items-center justify-content-start">
                                                    Extend time
                                            </label>
                                            <TimePicker 
                                                defaultValue={dayjs(value, 'HH:mm')} 
                                                minuteStep={15} 
                                                format='HH:mm' 
                                                onChange={onChange}
                                                onBlur={handleBlur} 
                                            />
                                            {errors.time && touched.time && <p className='text-danger mb-0'>{errors.time}</p>}
                                        </div>
                                        <div className="col-12 d-flex justify-content-center py-3">
                                            <Button 
                                                type='submit'
                                                tagType='button'
                                                className="btn_outline_black auth_btn_padding w-100">
                                                confirm
                                            </Button>
                                        </div>
                                    </form>
                                )}}
                            </Formik>
                    </Modal.Body>
            </Modal>
        </>
    );
}
export default RemainderModal;