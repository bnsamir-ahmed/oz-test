import { useState, useContext, useEffect } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import Button from '../../UI/Button';
import { SiteConfigContext } from '../../../apis/context/SiteConfigContext';
import { inquiry } from '../../../apis/AuthApi';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import './Contactus.css';
import { Modal, Select } from 'antd';

const ContactusForm = () => {
    const [code, setCode] = useState(false);
    const siteConfig = useContext(SiteConfigContext);
    const { userProfileData } = useContext(AuthContext);
    const [type, setType] = useState(localStorage.getItem('MembershipInquireOZ'));
    const locations = siteConfig && Object.entries(siteConfig?.profile_dropdown?.fid_7.data).map(([key, value])=>{
        return  <option value={value} key={key}>{value}</option>
    });
    const Obj =siteConfig &&  Object.entries(siteConfig.profile_dropdown?.fid_4.data);
     console.log(siteConfig?.profile_dropdown?.fid_7.data);
     console.log(Obj);
     

    const optionList = siteConfig && Object.entries(siteConfig.profile_dropdown?.fid_4.data).map(item => {
        return { value: item.id, label: item.name }
    });

    useEffect(() => {
        setType(localStorage.getItem('MembershipInquireOZ'))
    }, []);

    const handleSubmit = async (values) => {
        try {
            const result = await inquiry(values.first_name,
                values.last_name,
                values.email,
                values.phone,
                values.user_type,
                values.inquiry_type,
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
    };

    return (
        <>
            <Formik
                initialValues={{
                    first_name: userProfileData ? userProfileData.first_name : '',
                    last_name: userProfileData ? userProfileData.last_name : '',
                    email: userProfileData ? userProfileData.email : '',
                    phone: userProfileData ? userProfileData.phone_number : '',
                    user_type: '',
                    inquiry_type: type || '',
                    location: '',
                    comments: '',
                    code: ''
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
                    user_type: Yup.string().required('user type is required'),
                    inquiry_type: Yup.string().required('inquiry type is required'),
                    location: Yup.string().required('locations is required'),
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
                            <div className='col-lg-6 col-12'>
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
                            <div className='col-lg-6 col-12'>
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
                            <div className="form__group field my-3 group-check">
                                <label htmlFor="user_type" className="form__label">User Type</label>
                                <Select
                                    id='user_type'
                                    defaultValue={values.user_type || undefined}
                                    value={values.user_type || undefined}
                                    className="form__field placeholderSelect"
                                    onBlur={handleBlur}
                                    onChange={(value, key) => {
                                        setFieldValue('user_type', value);
                                        if (key.children === 'Company') {
                                            setCode(true);
                                        } else {
                                            setCode(false);
                                        }
                                    }}
                                    bordered={false}
                                    placeholder={'Choose Type'}
                                >
                                    {siteConfig && Object.entries(siteConfig.profile_dropdown?.fid_4.data).map(([key, value]) => (
                                        <option key={key} value={key}>
                                            {value}
                                        </option>
                                    ))}
                                </Select>
                                {errors.user_type && touched.user_type && <p className='text-danger mb-0'>{errors.user_type}</p>}
                            </div>
                            {code && <div className="form__group field mt-3 group-check">
                                <label htmlFor="code" className="form__label">code</label>
                                <input
                                    id='code'
                                    type="text"
                                    className={
                                        errors.code && touched.code
                                            ? "form__field is-invalid"
                                            : "form__field"
                                    }
                                    placeholder="Enter company code"
                                    name="code"
                                    value={values.code}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {errors.code && touched.code && <p className='text-danger mb-0'>{errors.code}</p>}
                            </div>}
                            <div className="form__group field mt-3 group-check">
                                <label htmlFor='inquiry_type' className="form__label">Inquiry Type</label>
                                <Select
                                    id='inquiry_type'
                                    defaultValue={values.inquiry_type || undefined}
                                    value={values.inquiry_type || undefined}
                                    className="form__field placeholderSelect"
                                    onBlur={handleBlur}
                                    onChange={(value) => setFieldValue('inquiry_type', value)}
                                    bordered={false}
                                    placeholder={'Choose Type'}
                                >
                                    <Select.Option value="membership">Membership</Select.Option>
                                    <Select.Option value="booking">Booking</Select.Option>
                                </Select>
                                {errors.inquiry_type && touched.inquiry_type && <p className='text-danger mb-0'>{errors.inquiry_type}</p>}
                            </div>
                            <div className="form__group field mt-3 group-check">
                                <label htmlFor="location" className="form__label">Locations</label>
                                <Select
                                    id='location'
                                    defaultValue={values.location || undefined}
                                    value={values.location || undefined}
                                    className="form__field placeholderSelect"
                                    onBlur={handleBlur}
                                    onChange={(value) => setFieldValue('location', value)}
                                    bordered={false}
                                    placeholder={'Choose Location'}
                                >
                                    {locations}
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
                    )
                }}
            </Formik>
        </>
    )
}
export default ContactusForm;