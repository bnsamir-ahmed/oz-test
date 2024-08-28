import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { Formik } from 'formik';
import * as Yup from "yup";
import { Login } from "../../apis/AuthApi";
import { useNavigate, useLocation } from "react-router-dom";
import Button  from '../UI/Button';
import {requestForToken} from '../../apis/firebase';
import { getMyPlans } from '../../apis/User';
import { Modal } from 'antd';
import RegisterOTPModal from './RegisterOTPModal';

const LoginForm = ({profile, provider})=>{
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({});
    const [userInfo, setUSerInfo] = useState({});
    const { handleLogin, savePlanId } = useContext(AuthContext);
    // const [notificationToken, setNotificationToken] = useState('');
    const previousLocation = localStorage.getItem('prevLocationOZ');
    const handleClose = () => setShow(false);
    
    useEffect(()=>{
        if(provider === 'google'){
            setUSerInfo({ 
                email: profile.email,
            });
        }else if(provider === 'facebook'){
            setUSerInfo({ 
                email: profile.email,
            });
        }else{

        }
    },[profile, provider]);

    useEffect(()=>{
        const getToken = async () => {
            
        }
        getToken();
    },[]);

    const handleSubmit = async (values) => {
        const controller = new AbortController();
        const signal = controller.signal;

        let notificationToken = '';

        try{
            const result = await requestForToken();
            notificationToken = result;
        }catch(error){
            notificationToken = '';
        };

        try {
            const result = await Login(values.email, values.password, provider, notificationToken);
            handleLogin(result);
            const prevRoute = previousLocation === '/newpassword' || previousLocation === '/register';
            if(result){
                try{
                    const response = await getMyPlans(result.access_token, result.user_id, signal);
                    savePlanId(response['active'][0]?.id);
                }catch(error){}
            }
            if(prevRoute){
                navigate('/');
                localStorage.removeItem('prevLocationOZ')
            }else{
                navigate(-1);
            }
        } catch (error) {
            if(error.response.data.otp){
                setEmail(values.email);
                setMessage(error.response.data.message);
                setShow(true);
            }else{
                Modal.error({
                    title: error.response.data.status || "Error",
                    content: error.response.data.message || "An Unknown Error Occurred",
                    footer: false,
                    centered: true,
                    closable: true,
                    maskClosable: true
                });
            }
        }
    };
    
    return (
        <>
            <Formik 
                initialValues={userInfo ||
                    { 
                        email: '',
                        password: ''
                    }
                }
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    handleSubmit(values);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required(),
                    password: Yup.string().required()
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
                    <div className="d-flex align-items-center justify-content-between p-0">
                        <div className="form-check d-flex align-items-center p-0">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label text-uppercase ps-2" htmlFor="flexCheckDefault">
                                Keep me logged in
                            </label>
                        </div>
                        <Button className='p-0 forgetPassText text-uppercase' tagType='link' to={'/forgetpass'}>Forget your password?</Button>
                    </div>
                    <div className="d-flex justify-content-center py-3">
                        <Button 
                            tagType='button'
                            type="submit" 
                            className="btn_outline_black auth_btn_padding">Login</Button>
                    </div>
                </form>
            )}}
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
export default LoginForm;


