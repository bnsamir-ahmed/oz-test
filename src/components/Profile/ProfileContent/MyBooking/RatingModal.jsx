import {Formik} from 'formik';
import * as Yup from "yup";
import { useState, useContext } from 'react';
import ReactStars from "react-rating-stars-component";
import Modal from 'react-bootstrap/Modal';
import Paragraph from  '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { rateBooking } from '../../../../apis/Booking';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { Modal as modal } from 'antd';

const RatingModal = (props)=>{

    const [rating, setRate] = useState('3.5');
    const {token, userId} = useContext(AuthContext);

    const ratingChanged = (newRating) => {
        setRate(newRating);
    };

    const handleSubmit = async (values) => {
        try{
            const result = await rateBooking(token, userId, props.booking_id, props.venueId, rating, values.message_rate);
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
                        <Paragraph className="h2-description">Rating</Paragraph>
                        <Formik
                            initialValues={{
                                rating: rating,
                                message_rate: '',
                            }}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                handleSubmit(values)
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    rating: Yup.string().required(),
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
                                        <div>
                                            <Paragraph className="h2-description">How was your experience ?</Paragraph>
                                            <div className='d-flex justify-content-center'>
                                                <ReactStars
                                                    count={5}
                                                    onChange={ratingChanged}
                                                    size={50}
                                                    isHalf={true}
                                                    value={2.5}
                                                    emptyIcon={<i className="fa-solid fa-star"></i>}
                                                    halfIcon={<i className="fa-solid fa-star-half"></i>}
                                                    fullIcon={<i className="fa-solid fa-star"></i>}
                                                    activeColor="#EE9E03"
                                                />
                                                {errors.rating && touched.rating && <p className='text-danger mb-0'>{errors.rating}</p>}
                                            </div>
                                        </div>
                                        <div className="form__group field my-3">
                                            <label htmlFor="comment_rate"
                                                className="form__label d-flex align-items-center justify-content-start">
                                                    Comment
                                            </label>
                                            <input 
                                                type='text'
                                                id="comment_rate" 
                                                name="message_rate"
                                                value={values.message_rate}
                                                placeholder='Enter your comment'
                                                className="form__field color-grey"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
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
    )
}
export default RatingModal;