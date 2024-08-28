import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DataProvider } from '../apis/context/SiteDataContext';
import ScrollToTop from "../ScrollToTop";
import Header from "../components/Header/Navbar/Header";
import Footer from "../components/Footer/Footer";
import FooterAuth from '../components/Footer/FooterAuth';
import { SiteConfigProvider } from '../apis/context/SiteConfigContext';
import { AuthProvider } from '../apis/context/AuthTokenContext';
import Notification from '../components/UI/Notification';

const RootLayout = ()=>{
    const location = useLocation();

    const isGalleryRoute = location.pathname === '/community/galleryshow';
    const isAboutRoute = location.pathname === '/about';
    const isAmenitiesRoute = location.pathname === '/amenities';
    const isSingleMemberRoute = location.pathname.includes('/singleMember');

    const [show, setShow] = useState(false);

    const AuthRoutes = location.pathname === '/login' || 
        location.pathname === '/contactus' || 
        location.pathname === '/joinus' || 
        location.pathname === '/register' || 
        location.pathname === '/forgetpass' || 
        location.pathname === '/sendcontact';

        useEffect(()=>{
            if(isGalleryRoute || isAboutRoute || isAmenitiesRoute || isSingleMemberRoute){
                document.body.classList.add('body_dark');
            }
            return ()=>{
                document.body.classList.remove('body_dark');
            }
        },[location]);

        const getShowDot = (data) => {
            setShow(data);
        }

    return(
        <AuthProvider>
            <DataProvider>
                <ScrollToTop/>
                    <Notification getShowDot={getShowDot}/>
                    <SiteConfigProvider>
                        <Header 
                            className="navbar"
                            showBlackNav={isGalleryRoute || isAboutRoute || isAmenitiesRoute || isSingleMemberRoute}
                            show={show}
                        />
                        <Outlet />
                        {!AuthRoutes && <Footer />}
                        {AuthRoutes && <FooterAuth />}

                    </SiteConfigProvider>
            </DataProvider>
        </AuthProvider>
    )
}
export default RootLayout;