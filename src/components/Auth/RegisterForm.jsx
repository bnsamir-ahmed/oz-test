import { useEffect, useState, useContext } from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";
import { Register } from "../../apis/AuthApi";
import Button from '../UI/Button';
import RegisterOTPModal from './RegisterOTPModal';
import { SiteConfigContext } from '../../apis/context/SiteConfigContext';
import { Select, Modal as modal } from 'antd';

const RegisterForm = ({ provider, profile }) => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userInfo, setUSerInfo] = useState({});
    const [userData, setUserData] = useState({});
    const [code, setCode] = useState(false);
    const handleClose = () => setShow(false);
    const siteConfig = useContext(SiteConfigContext);

    useEffect(() => {
        if (provider === 'google') {
            setUSerInfo({
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email,
                phone: '',
                user_type: '',
                password: '',
                confirm_password: ''
            });
        } else if (provider === 'facebook') {
            setUSerInfo({
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                phone: '',
                user_type: '',
                password: '',
                confirm_password: ''
            });
        } else {

        }
    }, [profile, provider]);

    const handleSubmit = async (values) => {
        try {
            const result = await Register(values.first_name,
                values.last_name,
                values.email,
                values.phone,
                values.user_type,
                values.password,
                values.confirm_password);
            setEmail(values.email);
            setUserData(result.account_data);
            setMessage(result.message);
            setShow(true);
        } catch (error) {
            if (error.response.data.data.otp) {
                setMessage(error.response.data.message);
                setShow(true);
            } else {
                modal.error({
                    title: error.response.data.status || "Error",
                    content: error.response.data.message || "An Unknown Error Occurred",
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true
                });
            }
        }
    }
    return (
        <>
            <Formik
                initialValues={userInfo || {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    user_type: '',
                    code: '',
                    password: '',
                    confirm_password: ''
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
                    password: Yup.string()
                        .required('Password is required')
                        .min(8, "Password must be at least 8 characters.")
                        .matches(/[0-9]/, "You must enter at least one number.")
                        .matches(/[a-z]/, "You must enter at least one lowercase letter.")
                        .matches(/[A-Z]/, "You must enter at least one uppercase letter.")
                        .matches(/[#?!@$%^&*-]/, "You must enter at least one symbols."),
                    confirm_password: Yup.string()
                        .required('Confirm password is required')
                        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
                                    {siteConfig && Object.entries(siteConfig.profile_dropdown?.fid_4?.data).map(([key, value]) => (
                                        <Select.Option key={key} value={key}>
                                            {value}
                                        </Select.Option>
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
                                <label htmlFor="password" className="form__label">Password</label>
                                <input
                                    id='password'
                                    type="password"
                                    className={
                                        errors.password && touched.password
                                            ? "form__field is-invalid"
                                            : "form__field"
                                    }
                                    placeholder="Enter Your Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password && <p className='text-danger mb-0'>{errors.password}</p>}
                            </div>
                            <div className="form__group field mt-3 group-check">
                                <label htmlFor="confirm_password" className="form__label">Confirm Password</label>
                                <input
                                    id='confirm_password'
                                    type="password"
                                    className={
                                        errors.confirm_password && touched.confirm_password
                                            ? "form__field is-invalid"
                                            : "form__field"
                                    }
                                    placeholder="Enter confirm password"
                                    name="confirm_password"
                                    value={values.confirm_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.confirm_password && touched.confirm_password && <p className='text-danger mb-0'>{errors.confirm_password}</p>}
                            </div>
                            <div className="d-flex justify-content-center py-3">
                                <Button
                                    tagType='button'
                                    type="submit"
                                    className="btn_outline_black auth_btn_padding">Register</Button>
                            </div>
                        </form>
                    )
                }}
            </Formik>
            <RegisterOTPModal
                show={show}
                onHide={handleClose}
                email={email}
                userData={userData}
                message={message}
            />
        </>
    )
}
export default RegisterForm;