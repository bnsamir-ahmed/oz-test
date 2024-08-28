import React from "react";
import "./Footer.css";
import logoWhite from "../../assets/images/logoWhite.svg";
import { Link } from "react-router-dom";
import SocialMedia from "../UI/SocialMedia";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";


const Footer = () => {

    return (
        <>
        <footer className="footer-section container-fluid">
            <div className="row align-items-center">
                <div className="col-xl-10 col-lg-8 col-md-12">
                    <div className="row align-items-center justify-content-between py-lg-0 py-4 g-3">
                        <div className="col-xl-2 col-lg-3 col-md-3">
                            <div className="footer-single-col d-flex justify-content-center">
                                <Button 
                                    tagType='link'
                                    className={'p-0'} 
                                    to={'/'}>
                                        <img
                                            src={logoWhite}
                                            alt="logo"
                                            className="img-fluid"
                                        />
                                </Button>
                            </div>
                        </div>
                        <div className="col-xxl-9 col-xl-10 col-lg-9 col-md-9 py-sm-0 py-5">              
                            <div className=''>
                                <div className="d-flex justify-content-center align-items-center flex-wrap">
                                    <Link to='/booking' className="links-footer">Booking</Link>
                                    <Link to='/membership' className="links-footer">Membership</Link>
                                    <Link to='/community' className="links-footer">Community</Link>
                                    <Link to="/community/events" className="links-footer">Events</Link> 
                                    <Link to='/faq' className="links-footer">FAQs</Link>
                                    <Link to='/profile/privacypolicy' className="links-footer">Privacy Policy</Link>
                                    <Link to='/profile/terms&condition' className="links-footer">Term&conditions</Link>
                                    <Link to='/sitemap' className="links-footer">Site Map</Link>
                                </div> 
                            <Paragraph className='mx-auto mt-4 mb-0 text-center copyright'>© 2023, Made with passion by Macber EG</Paragraph>
                            </div>                   
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-12">
                    <div className="footer-social">
                        <div className="d-flex justify-content-center align-items-center ">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="170" viewBox="0 0 2 170" fill="none">
                                <path d="M1 0L1.00001 170" stroke="#BDBDBD" stroke-width="1.5"/>
                            </svg>
                            <div className="social-links d-flex align-items-center">
                                <SocialMedia footer={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
};

export default React.memo(Footer) ;
