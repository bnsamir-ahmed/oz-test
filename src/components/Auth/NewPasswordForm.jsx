import { Formik } from 'formik';
import * as Yup from "yup";
import { ForgotPasswordChange } from "../../apis/AuthApi";
import { useNavigate } from "react-router-dom";
import Button  from '../UI/Button';
import Paragraph from '../UI/Paragraph';
import { Modal } from 'antd';

const NewPasswordForm = ()=>{

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const email = localStorage.getItem("emailuseroz");
        const otp = localStorage.getItem("otpuseroz");
        try {
            const result = await ForgotPasswordChange(email, otp, values.password);
            if(result){
                Modal.success({
                    title: result.message,
                    content: result.message,
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true,
                });
                localStorage.removeItem("emailuseroz");
                localStorage.removeItem("otpuseroz");
                navigate('/login')
            }
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
                        password: '',
                        confirm_password: ''
                    }
                }
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    handleSubmit(values);
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().required('password is required'),
                    confirm_password: Yup.string().required('confirm password is required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                })}>
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
                    <div className="head-content text-center py-4">
                        <Paragraph className="hand-write">Forget Password ,</Paragraph>
                        <Paragraph className="bold-head">Enter New Password</Paragraph>
                    </div>
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
                            className="btn_outline_black auth_btn_padding">Submit</Button>
                    </div>
                </form>
            )}}
            </Formik>
        </>
    )
}
export default NewPasswordForm;