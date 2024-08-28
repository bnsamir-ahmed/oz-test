import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import vector from "../../assets/images/Vector.png";
import facebook from "../../assets/images/icons/Facebook.svg";
import google from "../../assets/images/icons/Google.svg";
import linkedin from "../../assets/images/icons/linkedin.svg";
import "./Auth.css";
import Paragraph from "../UI/Paragraph";
import Button from "../UI/Button";
import RegisterForm from './RegisterForm';
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialLinkedin
  } from 'reactjs-social-login';

const Register = () => {
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState(null);
    const location = useLocation();

    useEffect(()=>{
        const route = location.pathname;
        localStorage.setItem('prevLocationOZ', route)
    },[]);

    return (
        <>
            <section className="contactus auth my-5">
                <div className="position-relative">
                    <div className='img_float'>
                        <img
                            src={vector} 
                            alt="shape"/>
                    </div>
                </div>
                    <div className="container-fluid px-70">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="pb-3 position-relative">
                                    <div className="text-shape">
                                        <h1 className="hand-write">Welcome,</h1>
                                        <h3 className="bold-head">Register to Access</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-card p-md-5 p-3">
                                    <RegisterForm provider={provider} profile={profile} />
                                    <div className="py-3 log-social d-flex justify-content-center">
                                        <LoginSocialFacebook
                                            appId={process.env.REACT_APP_FB_APP_ID || ''}
                                            onResolve={({ provider, data }) => {
                                            setProvider(provider)
                                            setProfile(data)
                                            console.log(data);
                                            }}
                                            onReject={(err) => {
                                            console.log(err)
                                            }}
                                        >
                                            <img src={facebook} alt="Facebook" />
                                        </LoginSocialFacebook>
                                        <LoginSocialGoogle
                                            client_id={'468809410339-uiq561ijnarf0duksu85jm9j6oa83bib.apps.googleusercontent.com'}
                                            onResolve={({ provider, data }) => {
                                            setProvider(provider)
                                            setProfile(data);
                                            console.log(data);
                                            }}
                                            onReject={(err) => {
                                            console.log(err)
                                            }}
                                            className="px-3"
                                        >
                                            <img src={google} alt="Google"/>
                                        </LoginSocialGoogle>
                                        <LoginSocialLinkedin
                                            client_id={'77kx7wk728z6ww'}
                                            client_secret={'qAS0CnCJKVvEbMgh'}
                                            redirect_uri="https://macber-eg.com/rinku/app/index.php"
                                            onResolve={({ provider, data }) => {
                                            setProvider(provider)
                                            setProfile(data);
                                            console.log(data,provider);
                                            }}
                                            onReject={(err) => {
                                            console.log(err)
                                            }}
                                        >
                                            <img src={linkedin} alt="LinkedIn"/>
                                        </LoginSocialLinkedin>
                                    </div>
                                    <div className="text-center py-4">
                                        <Paragraph className='authFooter_copyright auth_desc mb-0'>Do you already have an account?
                                            <Button className='p-0 signup_title' tagType='link' to={'/login'}>Sign In here</Button>
                                        </Paragraph>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
export default Register;