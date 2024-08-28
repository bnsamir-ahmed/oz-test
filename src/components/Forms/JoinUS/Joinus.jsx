import React, {useEffect, useState, useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import Button  from '../../UI/Button';
import { SiteConfigContext } from '../../../apis/context/SiteConfigContext';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import './Joinus.css';
import vector from "../../../assets/images/Vector.png";
import { inquiry } from '../../../apis/AuthApi';
import { Modal, Select } from 'antd';

const Joinus = () => {

    const [plan, setPlan] = useState(JSON.parse(localStorage.getItem('selectedPlanOZ')));
    const siteConfig = useContext(SiteConfigContext);
    const { userProfileData } = useContext(AuthContext)
    const [userInfo, setUSerInfo] = useState(userProfileData);

    useEffect(()=>{
        const planDetails = JSON.parse(localStorage.getItem('selectedPlanOZ'));
        setPlan(planDetails);
    },[]);

    const handleSubmit = async (values) => {
        try {
            const result = await inquiry(values.first_name,
                values.last_name,
                values.email,
                values.phone,
                '',
                '',
                values.location,
                values.comments);
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
    }

    return (
        <>
            <div className="position-relative d-md-block d-none">
                <img
                    src={vector} 
                    className="position-absolute"
                    style={{top: "0px", left: "0", width: "100px"}}
                    alt="shape"/>
            </div>
            <section className="contactus my-5 joinus-form">
                <div className="container-fluid px-70">
                    <div className="head-content-left-shape text-left pb-3">
                        <div className="text-shape">
                            <h1 className="hand-write">Join us</h1>
                            <h3 className="bold-head">Get started to join with oz community</h3>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-6">
                            <div className="box-apply-member">
                                <h3>Summary</h3>
                                <div className=" name-price d-flex align-items-center justify-content-between">
                                    <h2 className="d-flex justify-content-start align-items-center ">{plan?.selectedPackage}</h2>
                                    {plan?.discount !== '0' && <div className="d-block">
                                        <del className="member_discount">{plan?.price} / {plan?.time_count} {plan?.time}</del>
                                        <br/>
                                        <strong className="current_price">{plan?.priceDicounted} / {plan?.time_count} {plan?.time}</strong>
                                    </div>}
                                    {plan?.discount === '0' &&
                                        <strong className="current_price">{plan?.price} / {plan?.time_count} {plan?.time}</strong>
                                    }

                                </div>
                                <div className='dynamic_p' dangerouslySetInnerHTML={{ __html: plan?.website_description }}></div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-card p-md-5 p-3">
                            <Formik 
                                initialValues = {{
                                    first_name: userInfo ? userInfo.first_name : '',
                                    last_name: userInfo ? userInfo.last_name : '',
                                    email: userInfo ? userInfo.email : '',
                                    phone: userInfo ? userInfo.phone_number : '',
                                    location: '',
                                    comments: ''
                                }}
                                onSubmit={async values => {
                                    await new Promise(resolve => setTimeout(resolve, 0));
                                    handleSubmit(values);
                                }}
                                validationSchema={Yup.object().shape({
                                    first_name: Yup.string().required('first name is required'),
                                    last_name: Yup.string().required('last name is required'),
                                    email: Yup.string().email().required('email is required'),
                                    phone: Yup.string().required('phone is required'),
                                    location: Yup.string().required('location is required'),
                                    comments: Yup.string().required('comments is required')
                                })}
                                enableReinitialize>
                                {props => {
                                    const {
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue
                                    } = props;
                                return (
                                    <form className="row g-3" onSubmit={handleSubmit}>
                                        <div className='col-lg-6'>
                                            <div className="form__group field my-3 group-check">
                                                <label htmlFor="first_name" className="form__label">First Name</label>
                                                <input 
                                                    id='first_name'
                                                    type="text"
                                                    className={
                                                        errors.first_name && touched.first_name
                                                        ? "form__field is-invalid"
                                                        : "form__field"
                                                    }
                                                    placeholder="Enter Your first Name"
                                                    name="first_name"
                                                    value={values.first_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                {errors.first_name && touched.first_name && <p className='text-danger mb-0'>{errors.first_name}</p>}
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form__group field my-3 group-check">
                                                <label htmlFor="last_name" className="form__label">Last Name</label>
                                                <input 
                                                    id='last_name'
                                                    type="text"
                                                    className={
                                                        errors.last_name && touched.last_name
                                                        ? "form__field is-invalid"
                                                        : "form__field"
                                                    }
                                                    placeholder="Enter Your last Name"
                                                    name="last_name"
                                                    value={values.last_name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                {errors.last_name && touched.last_name && <p className='text-danger mb-0'>{errors.last_name}</p>}
                                            </div>
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
                                        <div className="form__group field my-3 group-check">
                                            <label htmlFor="phone" className="form__label">Phone number</label>
                                            <input 
                                                type="text"
                                                className={"form__field me-3 px-lg-0 country_code"}
                                                placeholder="+20"
                                                disabled
                                            />  
                                            <input 
                                                id='phone'
                                                type="number"
                                                className={
                                                    errors.phone && touched.phone
                                                    ? "form__field phone_field is-invalid"
                                                    : "form__field phone_field"
                                                }
                                                placeholder="Phone No."
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.phone && touched.phone && <p className='text-danger mb-0'>{errors.phone}</p>}
                                        </div>
                                        <div className="form__group field mt-3 group-check">
                                            <label htmlFor="location" className="form__label">Locations</label>
                                            <Select
                                                id='location'
                                                defaultValue={values.location || undefined}
                                                value={values.location || undefined}
                                                className="form__field p-0 placeholderSelect"
                                                onBlur={handleBlur}
                                                onChange={(value) => setFieldValue('location', value)}
                                                bordered={false}
                                                placeholder={'Choose Location'}
                                            >
                                                <Select.Option value="1">1</Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                                <Select.Option value="3">3</Select.Option>
                                            </Select>
                                            {errors.location && touched.location && <p className='text-danger mb-0'>{errors.location}</p>}
                                        </div>
                                        <div className="form__group field my-3 group-check">
                                            <label htmlFor="comments" className="form__label">Comments</label>
                                            <input 
                                                id='comments'
                                                type="text"
                                                className={
                                                    errors.comments && touched.comments
                                                        ? "form__field is-invalid"
                                                        : "form__field"
                                                }
                                                placeholder="Enter Your comments"
                                                name="comments"
                                                value={values.comments}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            /> 
                                            {errors.comments && touched.comments && <p className='text-danger mb-0'>{errors.comments}</p>}
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
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Joinus;
