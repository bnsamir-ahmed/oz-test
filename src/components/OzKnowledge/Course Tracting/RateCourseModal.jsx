import { useState, useContext } from 'react';
import { Modal, Rate } from 'antd';
import { Formik } from 'formik';
import * as Yup from "yup";
import Paragraph from '../../UI/Paragraph';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { rateCourse } from '../../../apis/OzKnowledge';
import Button from '../../UI/Button';

const RateCourseModal = ({ open, handleCancel, courseId }) => {

    const [rating, setRate] = useState();
    const { token, userId } = useContext(AuthContext);

    const ratingChanged = (newRating) => {
        setRate(newRating);
    };

    const rate = async (values) => {
        const controller = new AbortController();
        const signal = controller.signal;

        try {
            const result = await rateCourse(token, userId, courseId, rating, values.first_name, signal);
            handleCancel()
            Modal.success({
                title: result.status,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            });
        } catch (error) {
            handleCancel()
            Modal.error({
                title: 'Error',
                content: error.response.data.message || "An Unknown Error Occurred",
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
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                <div>
                    <Paragraph className="h2-description">Rating</Paragraph>
                    <Formik
                        initialValues={
                            {
                                rating: rating,
                                first_name: ''
                            }
                        }
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            rate(values)
                        }}
                        validationSchema={
                            Yup.object().shape({
                                rating: Yup.string().required(),
                            })
                        }
                        enableReinitialize>
                        {props => {
                            const {
                                values,
                                touched,
                                errors,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className='coures_rate'>
                                        <Paragraph className="h2-description">How was your experience ?</Paragraph>
                                        <div className='d-flex justify-content-center py-3'>
                                            <Rate allowHalf onChange={ratingChanged} />
                                            {errors.rating && touched.rating && <p className='text-danger mb-0'>{errors.rating}</p>}
                                        </div>
                                    </div>
                                    <div className="form__group field my-3">
                                        <label htmlFor="comment"
                                            className="form__label d-flex align-items-center justify-content-start">
                                            Comment
                                        </label>
                                        <input
                                            id='first_name'
                                            type="text"
                                            className={"form__field"}
                                            placeholder="Enter Your comment"
                                            name="first_name"
                                            value={values.first_name}
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
                            )
                        }}
                    </Formik>
                </div>
            </Modal>
        </>
    )
}

export default RateCourseModal;