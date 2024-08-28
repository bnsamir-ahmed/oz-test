import React, { useCallback, useState } from "react";
import "./Auth.css";
import vector from "../../assets/images/Vector.png";
import facebook from "../../assets/images/icons/Facebook.svg";
import google from "../../assets/images/icons/Google.svg";
import linkedin from "../../assets/images/icons/linkedin.svg";
import LoginForm from './LoginForm';
import Paragraph from "../UI/Paragraph";
import Button from "../UI/Button";
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialLinkedin
  } from 'reactjs-social-login';

const Login = () => {
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState(null);

    return (
        <>
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
                                    <h1 className="hand-write">Welcome</h1>
                                    <h3 className="bold-head">Please Sign in</h3>
                                </div>
                                <LoginForm provider={provider} profile={profile}/>
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
                                    <Paragraph className='authFooter_copyright auth_desc mb-0'>Don't have an account?
                                        <Button className='p-0 signup_title' tagType='link' to={'/register'}>Sign Up here</Button>
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;