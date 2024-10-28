import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import Button from "../UI/Button";
import vector from "../../assets/images/Vector.png";
import { ContactUs } from '../../apis/User';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { Modal } from 'antd';
import { notification } from 'antd';

const ContactAdmin = () => {

    const { userId } = useContext(AuthContext);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async (values) => {
        try {
            const result = await ContactUs(userId, values.subject, values.comment);
            setAlertMessage(result)
          
            Modal.success({
                title: result.message,
                content: result.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
            
        } catch (error) {
            
            Modal.error({
                title: error.response.data.status || "Error",
                content: error.response.data.message || "An Unknown Error Occurred",
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true,
            });
        }
    };

    return (
        <>
        {console.log(alertMessage)}
            <section className="login auth my-5">
                <div className="position-relative">
                    <div className='img_float'>
                        <img
                            type="img" 
                            src={vector} 
                            alt="shape"/>
                    </div>
                </div> 
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-card form-card p-md-5 p-3">
                                <div className="head-content text-center pb-3">
                                    <h1 className="hand-write">let's connect</h1>
                                    <h3 className="bold-head">with admin</h3>
                                </div>
                                <Formik 
                                    initialValues={
                                        { 
                                            subject: '',
                                            comment: ''
                                        }
                                    }
                                    onSubmit={async values => {
                                        await new Promise(resolve => setTimeout(resolve, 0));
                                        handleSubmit(values);
                                    }}
                                    validationSchema={Yup.object().shape({
                                        subject: Yup.string().required(),
                                        comment: Yup.string().required()
                                    })}
                                    >
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
                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="form__group field my-3 group-check">
                                                <label htmlFor="subject" className="form__label">subject</label>
                                                <input 
                                                    id='subject'
                                                    type="text"
                                                    className={
                                                        errors.subject && touched.subject
                                                        ? "form__field is-invalid"
                                                        : "form__field"
                                                    }
                                                    placeholder="Enter subject"
                                                    name="subject"
                                                    value={values.subject}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                {errors.subject && touched.subject && <p className='text-danger mb-0'>{errors.subject}</p>}
                                            </div>
                                            <div className="form__group field mt-3 group-check">
                                                <label htmlFor="comment" className="form__label">comment</label>
                                                <input 
                                                    id='comment'
                                                    type="comment"
                                                    className={
                                                        errors.comment && touched.comment
                                                        ? "form__field is-invalid"
                                                        : "form__field"
                                                    }
                                                    placeholder="Enter Your comment"
                                                    name="comment"
                                                    value={values.comment}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                {errors.comment && touched.comment && <p className='text-danger mb-0'>{errors.comment}</p>}
                                            </div>
                                            <div className="d-flex justify-content-center py-3">
                                                <Button 
                                                    tagType='button'
                                                    type="submit" 
                                                    className="btn_outline_black auth_btn_padding">send</Button>
                                            </div>
                                                <Button tagType='link' className='btn_underline p-0' to={'/contactadmin'}>History</Button>
                                        </form>
                                    )}}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default ContactAdmin;