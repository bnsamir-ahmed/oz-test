import React ,{ useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import "../src/assets/fonts/golden-hopes/golden-hopes.otf";
import AOS from "aos";
import "aos/dist/aos.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './apis/context/SiteDataContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useScroll, useSpring } from "framer-motion";
import RootLayout from './pages/RootLayout';
import Membership from "./pages/Membership";
import Login from "./components/Auth/Login";
import Contactus from "./pages/ContactUS";
import MembershipOptions from "./components/Membership/MembershipOptions/MembershipOptions";
import Joinus from "./components/Forms/JoinUS/Joinus";
import Home from "./pages/Home";
import Community from "./pages/Community";
import NewsFeed from "./pages/NewsFeed";
import SingleNewFeed from "./components/NewsFeed/NewsFeedBlogs/SingleNewFeed/SingleNewFeed";
import CommunityEventsExplore from "./components/Community/CommunityEvents/CommunityEventsExplore/CommunityEventsExplore";
import CommunityEventsDetails from "./components/Community/CommunityEvents/CommunityEventsDetails/CommunityEventsDetails";
import PrivateEvents from "./pages/PrivateEvents";
import Houses from "./pages/Houses";
import HouseDetails from "./components/Houses/HousesDetails/HouseDetails";
import Booking from "./pages/Booking";
import BookingDetails from "./components/Booking/BookinDetails/BookingDetails";
import BookingSummaryVenue from "./components/Booking/BookinDetails/SpaceDetails/BookingSummary/BookingSummaryVenue";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Profile from "./pages/Profile";
import MemberPackage from "./components/Membership/MembershipTypes/MemberPackage/MemberPackage";
import Register from './components/Auth/Register';
import ForgetPass from './components/Auth/ForgetPass';
import NewPassword from './components/Auth/NewPassword';
import MyBookingDetails from "./components/Profile/ProfileContent/MyBooking/MyBookingDetails";
import RescheduleBooking from './components/Profile/ProfileContent/MyBooking/RescheduleBooking';
import MyplanDetials from './components/Profile/ProfileContent/MyPlan/PlanDetails';
import MyEventDetails from "./components/Profile/ProfileContent/MyEvents/MyEventDetilas";
import Ozys from './components/Ozys/Ozys';
import Amenities from './components/Amenities/Amenities';
import PersonalData from './components/Profile/ProfileContent/Personal Data/PersonalData';
import ChangePassword from './components/Profile/ProfileContent/Change Password/ChangePassword';
import IssueReporting from './components/Profile/ProfileContent/IssueReporting/IssueReporting';
import IssueType from './components/Profile/ProfileContent/IssueReporting/IssueType';
import MyBooking from "./components/Profile/ProfileContent/MyBooking/MyBooking";
import MyEvents from "./components/Profile/ProfileContent/MyEvents/MyEvents";
import MyPlan from "./components/Profile/ProfileContent/MyPlan/MyPlan";
import Favoriates from "./components/Profile/ProfileContent/Favoriates/Favoriates";
import PrivacyPolicy from "./components/Profile/ProfileContent/Privacy Policy/PrivacyPolicy";
import TermsConditions from "./components/Profile/ProfileContent/TermsConditions/TermsConditions";
import SubissueType from './components/Profile/ProfileContent/IssueReporting/SubissueType';
import AddPlacesIssueDetails from './components/Profile/ProfileContent/IssueReporting/AddPlacesIssueDetails';
import TalentMarket from './components/Talent Market/TalentMarket';
import AddService from './components/Talent Market/AddService';
import Error404 from './pages/Error404';
import SiteMap from "./components/SiteMap&Faq/SiteMap";
import Faq from "./components/SiteMap&Faq/Faq";
import ServiceDetails from './components/Talent Market/ServiceDetails';
import DMChat from './components/Talent Market/DMChat';
import DMChatProvider from './components/Talent Market/DMChatProvider';
import Spaces from './pages/Spaces';
import ContactAdmin from './components/ContactAdmin/ContactAdmin';
import ContactAdminHistory from './components/ContactAdmin/ContactAdminHistory';
import ContactAdminReply from './components/ContactAdmin/ContactAdminReply';
import IssueHistory from './components/Profile/ProfileContent/IssueReporting/IssueHistory';
import IssueDetails from './components/Profile/ProfileContent/IssueReporting/IssueDetails';
import Invoice from "./components/UI/Invoice";
import Knowledge from './components/OzKnowledge/Knowledge';
import ZeeStudio from "./components/ZeeSudio/ZeeStudio";
import CoursesHistory from './components/OzKnowledge/CoursesHistory';
import OZCourses from './components/OzKnowledge/OZCourses';
import CourseDetails from './components/OzKnowledge/CourseDetails/CourseDetails';
import RouterGuard from './apis/RouterGuard';
import MoreClasses from "./components/ZeeSudio/MoreClasses";
import OurTrainerPage from "./components/ZeeSudio/OurTrainerPage";
import GymDetails from "./components/ZeeSudio/GymDetails";
import GymHistory from "./components/ZeeSudio/GymHistory";
import PaymentGym from "./components/ZeeSudio/PaymentGym";
import CourseTracting from './components/OzKnowledge/Course Tracting/CourseTracting';
import BookCourse from './components/OzKnowledge/BookCourse';
import BookingSummaryEvents from './components/EventsBookingSummary/BookingSummaryEvents';
import BookingSummaryMembership from './components/Membership/BookingSummaryMembership';

function App() {

    useEffect(() => {
      AOS.init({
        duration: 1500,
        once: true, 
      });
    }, []);

    const router = createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />,
        id: "root",
        errorElement: <Error404 />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
          { path: "joinus", element: <Joinus /> },
          { path: "contactus", element: <Contactus /> },
          { path: "sitemap", element: <SiteMap /> },
          { path: "faq", element: <Faq /> },
          {
            path: "profile",
            element: <Profile />,
            id: "profile",
            children: [
              { index: true, element: <PersonalData /> },
              { path: "changePassword", element: <ChangePassword /> },
              { path: "mybooking", element: <MyBooking /> },
              { path: "myevents", element: <MyEvents /> },
              { path: "myplan", element: <MyPlan /> },
              { path: "favoiate", element: <Favoriates /> },
              { path: "privacypolicy", element: <PrivacyPolicy /> },
              { path: "terms&condition", element: <TermsConditions /> },
              { path: "issueReport", element: <IssueReporting /> },
              { path: "issueType/:case_id", element: <IssueType /> },
              {
                path: "subissueType/:case_id/:type_id",
                element: <SubissueType />,
              },
              {
                path: "issueplace/:case_id/:type_id/:id",
                element: <AddPlacesIssueDetails />,
              },
              { path: "issuehistory", element: <IssueHistory /> },
              { path: "issueDetails/:id", element: <IssueDetails /> },
            ],
          },
          { path:'login', element: <Login />},
          { path:'register', element: <Register />},
          { path:'forgetpass', element: <ForgetPass />},
          { path:'newpassword', element: <NewPassword />},
          { path:'membership', element: <Membership />},  
          { path:'membership/:id', element: <MembershipOptions />},
          { path:'singleMember/:id', element: <MemberPackage />},
          { path:'membership-bookingSummary', element: <BookingSummaryMembership />},
          { path:'spaces', element: <Spaces />},
          { path:'community', element: <Community />},
          { path:'community/events', element: <CommunityEventsExplore />},
          { path:'events/:name/:id', element: <CommunityEventsDetails />},
          { path:'event-bookingSummary', element: <BookingSummaryEvents />},
          { path:'community/newsfeed', element: <NewsFeed />},
          { path:'community/newsfeed/singleFeed/:id', element: <SingleNewFeed />},
          { path:'private', element: <PrivateEvents />},
          { path:'houses', element: <Houses />},
          { path:'houses/:id', element: <HouseDetails />},
          { path:'booking', element: <Booking />},
          { path:'bookingDetails/:id', element: <BookingDetails />},
          { path:'mybookingDetails/:id', element: <MyBookingDetails />},
          { path:'RescheduleBooking/:id', element: <RescheduleBooking />},
          { path:'myplanDetials/:id', element: <MyplanDetials />},
          { path:'myeventDetails/:id', element: <MyEventDetails/>},
          { path:'bookingDetails/bookNow', element: <BookingSummaryVenue />},
          { path:'community/galleryshow', element: <Gallery />},
          { path:'ozys', element: <Ozys />},
          { path:'amenities', element: <Amenities />},
          { path:'talentmarket', element: <TalentMarket />},
          { path:'projectDetails/:id', element: <ServiceDetails />},
          { path:'addService', element: <AddService />},
          { path:'dmchat/:project/:user', element: <DMChat />},
          { path:'dmchat/provider/:project', element: <DMChatProvider />},
          { path:'contactadmin', element: <ContactAdminHistory />},
          { path:'replydetails', element: <ContactAdminReply />},
          { path:'sendcontact', element: <RouterGuard element={ContactAdmin} />},
          { path:'invoice', element: <Invoice />},
          { path:'knowledge', element: <Knowledge />},
          { path:'courses/:id', element: <OZCourses />},
          { path:'coursedetails/:id', element: <CourseDetails />},
          { path:'course-bookingSummary', element: <BookCourse />},
          { path:'coursesHistory', element: <RouterGuard element={CoursesHistory} />},
          { path:'coursetracting/:id', element: <CourseTracting />},
          { path: "zeestudio", element: <ZeeStudio /> },
          { path: "ourgymclasses", element: <MoreClasses /> },
          { path: "ourtrainer", element: <OurTrainerPage /> },
          { path: "gymdetails/:id", element: <GymDetails /> },
          { path: "class-bookingSummary", element: <PaymentGym/> },
          { path: "gymhistory", element: <RouterGuard element={GymHistory} /> },
          { path:'invoice', element: <Invoice />}
        ]}
    ]);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
    return (
      <>
      <QueryClientProvider client={queryClient}>
      {/* <motion.div className="progress-bar" style={{ scaleX }} />*/}
        <RouterProvider router={router}/>
      </QueryClientProvider>
      </>
    );
}

export default App;
