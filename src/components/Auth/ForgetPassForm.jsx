import { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import { ForgetPass } from "../../apis/AuthApi";
import Button  from '../UI/Button';
import ForgetPassOTPModal from './ForgetPassOTPModal';
import { Modal } from 'antd';

const ForgetPassForm = ()=>{

    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleSubmit = async (values) => {
        try {
            const result = await ForgetPass(values.email);
                setShow(true);
                setEmail(values.email);
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
    }
    return (
        <>
            <Formik 
                initialValues={
                    { 
                        email: ''
                    }
                }
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    handleSubmit(values);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required('Email is required'),
                })}>
            {props => {
                const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                } = props;
            return (
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="head-content text-center py-4">
                        <h1 className="hand-write">Forget Password ,</h1>
                        <h3 className="bold-head">Enter your email</h3>
                    </div>
                    <div className="form__group field my-3 group-check">
                        <label htmlFor="email" className="form__label">Email</label>
                        <input 
                            id='email'
                            type="email"
                            className={
                                errors.email && touched.email
                                ? "form__field is-invalid"
                                : "form__field"
                            }
                            placeholder="Enter Your Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        /> 
                        {errors.email && touched.email && <p className='text-danger mb-0'>{errors.email}</p>}
                    </div>
                    <div className="d-flex justify-content-center py-3">
                        <Button 
                            tagType='button'
                            type="submit" 
                            className="btn_outline_black auth_btn_padding">Submit</Button>
                    </div>
                </form>
            )}}
            </Formik>
            <ForgetPassOTPModal 
                show={show}
                onHide={handleClose}
                email={email}/>
        </>
    )
}
export default ForgetPassForm;


