import React, { useState, useEffect, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./BookingSummary.css";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import cash from "../../../../../assets/images/icons/Cash.svg";
import wallet from "../../../../../assets/images/icons/Credit.svg";
import Media from "../../../../Media/Media";
import { getBranchById } from "../../../../../apis/config";
import { AuthContext } from "../../../../../apis/context/AuthTokenContext";
import Button from "../../../../UI/Button";
import { confirmBooking, rescheduleBooking } from "../../../../../apis/Booking";
import Paragraph from "../../../../UI/Paragraph";
import TermsAndConditionsModal from "../../../../UI/TermsAndConditionsModal";
import ShareButton from "../../../../UI/ShareButton";
import { useSearchParams } from "react-router-dom";
import { Modal } from "antd";
import { getUserInfo } from '../../../../../apis/User';
import PromoCode from '../../../../promo-code/PromoCode';
import moment from 'moment';

const BookingSummary = () => {

  const bookingData = JSON.parse(localStorage.getItem("BookingOZDetails")) || {};
  const [bookingServices, setBookingServices] = useState(JSON.parse(localStorage.getItem("BookingOZServices")) || []);
  const [branch, setBransh] = useState();
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [payment, setPayment] = useState(1);
  const [priceAfterPromo, setPriceAfterPromo] = useState('');
  const { token, userId, branchId, modifyUserData } = useContext(AuthContext);

  const handelClose = () => setShow(false);

  const [searchParams] = useSearchParams();
  const reschedule = searchParams.get("reschedule");

  const steps = [
    { key: "summary", label: "Summary Booking" },
    { key: "payment", label: "Payment Method" },
    { key: "invoice", label: "Invoice Details" },
  ];

  const handleTabSelect = (step) => {
    if (step <= activeStep) {
      setActiveStep(step);
    }
  };

  const handleBookingClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const renderTabLink = (step, index) => {
    const isActive = activeStep === index;
    const isChecked =
      index <= activeStep ? (
        <span className="check-circle">
          <FaRegCheckCircle />
        </span>
      ) : (
        <span className="check-circle">
          <FaRegCircle />
        </span>
      );

    const isDisabled = index > activeStep;

    return (
      <Nav.Link
        key={step.key}
        eventKey={step.key}
        disabled={isDisabled}
        onSelect={() => handleTabSelect(index)}
      >
        <div
          className={`tab-link ${isActive ? "active" : ""}`}
          style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
        >
          {isChecked}
          {step.label}
        </div>
      </Nav.Link>
    );
  };

  const setDate = (roomdate) => {
    const date = new Date(roomdate);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const setDateApi = (roomdate) => {
    const date = new Date(roomdate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateNew = `${year}-${month}-${day}`;
    return dateNew;
  }

  const setTime = (roomdate) => {
    const date = new Date(roomdate);

    return date.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        })
  };

  const setTimeApi = (roomdate) => {
    const date = new Date(roomdate);
    const newTime = date.toLocaleTimeString("en-us", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    return newTime;
  };

  const getPeriod = (start, end) => {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);
    const durationInMs = dateEnd - dateStart;
    const durationHours = Math.floor(durationInMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor(
      (durationInMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${durationHours} Hours - ${durationMinutes} MIN`;
  }

  useEffect(() => {
    getBranchById(token, branchId).then((res) => {
      setBransh(res.name);
    });
  }, [bookingData, branchId]);

  const confirmBookingVenue = async () => {
    const price = JSON.parse(bookingData.price);
    try {
        if(reschedule){
          const result = await rescheduleBooking(
            token,
            userId,
            bookingData.id,
            bookingData.spaceDetails.id,
            setDateApi(bookingData.date),
            setTimeApi(bookingData.time.start),
            setTimeApi(bookingData.time.end)
            );
          if (result) {
            Modal.success({
              title: result.status,
              content: result.message,
            });
            handleBookingClick();
            getUserDataInfo();
          }
        }else{
          const result = await confirmBooking(
            token,
            userId,
            bookingData.spaceDetails.amenitie.branche_id,
            bookingData.spaceDetails.id,
            bookingData.numberOfPeople,
            bookingData.spaceDetails.booking_code,
            bookingData.services,
            price.venue_price,
            price.service_price,
            price.total_price,
            setDateApi(bookingData.date),
            setTimeApi(bookingData.time.start),
            setTimeApi(bookingData.time.end)
          );
          if (result) {
            Modal.success({
              title: result.status,
              content: result.message,
            });
            handleBookingClick();
            getUserDataInfo();
          }
        }
    } catch (error) {
      Modal.error({
        title: 'error',
        content: error.response.data.message,
      })
    }
  };

  const getUserDataInfo = async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      try{
        const res = await getUserInfo(token, userId, signal);
        modifyUserData(res['user_data']);
      }catch(err){
        console.log(err);
      }
  };
  
  const removeService = (index) => {
    // Create a copy of the services array without the item to be removed
    const updatedServices = bookingServices.filter((_, i) => i !== index);
    
    // Update the local storage
    localStorage.setItem('BookingOZServices', JSON.stringify(updatedServices));
  
    // Update the state to trigger a re-render and update the UI
    setBookingServices(updatedServices);
  };
  

  useEffect(()=>{
    setBookingServices(JSON.parse(localStorage.getItem("BookingOZServices")));
  }, []);


  const getPrice = (value) => {
    setPriceAfterPromo(value);
  };

  return (
    <>
      <section className="summary position-relative">
        <div className="container-fluid px-70">
          <Tab.Container
            activeKey={steps[activeStep]?.key}
            onSelect={handleTabSelect}
          >
            <Nav variant="tabs" className="mb-4">
              {steps.map((step, index) => (
                <Nav.Item key={step.key}>{renderTabLink(step, index)}</Nav.Item>
              ))}
            </Nav>
            <Tab.Content>
              {steps.map((step) => {
                const price = JSON.parse(bookingData?.price);
                return (
                <Tab.Pane key={step.key} eventKey={step.key}>
                  <h2 className="step-label">{step.label}</h2>
                  {step.key === "summary" && (
                    <>
                      <div className="summary-bg">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="box-summary">
                              <div className="head-box-summary">
                                <span>Summary</span>
                                <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
                                  <h2>{bookingData?.spaceDetails.title}</h2>
                                  <Button
                                    tagType="link"
                                    to={`/bookingDetails/${bookingData?.spaceDetails.id}`}
                                    className="p-0"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="48"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M30.6196 12.3347C31.0659 11.8884 31.7895 11.8884 32.2359 12.3347L35.6644 15.7633C36.1107 16.2096 36.1107 16.9332 35.6644 17.3795L25.3787 27.6653C25.2039 27.8401 24.977 27.9535 24.7322 27.9885L20.7322 28.5599C20.3761 28.6108 20.0168 28.491 19.7625 28.2367C19.5081 27.9823 19.3884 27.623 19.4392 27.2669L20.0107 23.2669C20.0456 23.0221 20.1591 22.7953 20.3339 22.6204L30.6196 12.3347ZM22.2195 23.9673L21.9175 26.0817L24.0319 25.7796L33.2401 16.5714L31.4277 14.7591L22.2195 23.9673Z"
                                        fill="#BDBDBD"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M16 17.7154C15.0532 17.7154 14.2857 18.4829 14.2857 19.4297V32.0011C14.2857 32.9479 15.0532 33.7154 16 33.7154H28.5714C29.5182 33.7154 30.2857 32.9479 30.2857 32.0011V23.4297H32.5714V32.0011C32.5714 34.2102 30.7806 36.0011 28.5714 36.0011H16C13.7909 36.0011 12 34.2102 12 32.0011V19.4297C12 17.2205 13.7909 15.4297 16 15.4297H24.5714V17.7154H16Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-12 border-right">
                            <ul className="list-details px-sm-3 px-1 mb-0">
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  className="me-3"
                                >
                                  <path
                                    d="M9.33398 5.33203V3.33203"
                                    stroke="#BDBDBD"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M22.666 5.33203V3.33203"
                                    stroke="#BDBDBD"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M2.66602 12H29.3327"
                                    stroke="#BDBDBD"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M2.66602 15.9987C2.66602 10.9704 2.66602 8.45623 4.22811 6.89413C5.79021 5.33203 8.30437 5.33203 13.3327 5.33203H18.666C23.6943 5.33203 26.2085 5.33203 27.7706 6.89413C29.3327 8.45623 29.3327 10.9704 29.3327 15.9987V18.6654C29.3327 23.6937 29.3327 26.2078 27.7706 27.7699C26.2085 29.332 23.6943 29.332 18.666 29.332H13.3327C8.30437 29.332 5.79021 29.332 4.22811 27.7699C2.66602 26.2078 2.66602 23.6937 2.66602 18.6654V15.9987Z"
                                    stroke="black"
                                    stroke-width="2"
                                  />
                                  <path
                                    d="M23.9993 21.3347L21.3327 21.3347M21.3327 21.3347L18.666 21.3347M21.3327 21.3347L21.3327 18.668M21.3327 21.3347L21.3327 24.0013"
                                    stroke="black"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                  />
                                </svg>
                                {moment(bookingData?.date).format("dddd, MMM. D, YYYY")}
                              </li>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  className="me-3"
                                >
                                  <circle
                                    cx="16"
                                    cy="17.3359"
                                    r="12"
                                    stroke="black"
                                    stroke-width="2"
                                  />
                                  <path
                                    d="M16 12V17.3333L19.3333 20.6666"
                                    stroke="#BDBDBD"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M4.66797 6.00129L10.0013 2.66797"
                                    stroke="#BDBDBD"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M27.3333 6.00129L22 2.66797"
                                    stroke="#BDBDBD"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                {(bookingData?.fullDay && bookingData?.fullDay !== '') ? bookingData?.fullDay : 
                                  <>
                                    {setTime(bookingData?.time.start)} - {" "}
                                    {setTime(bookingData?.time.end)} - (
                                    {getPeriod(
                                      bookingData?.time.start,
                                      bookingData?.time.end
                                    )})
                                  </>
                                }
                              </li>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                >
                                  <ellipse
                                    cx="15.9993"
                                    cy="8.0013"
                                    rx="5.33333"
                                    ry="5.33333"
                                    stroke="black"
                                    stroke-width="1.5"
                                  />
                                  <path
                                    d="M24 11.9987C26.2091 11.9987 28 10.5063 28 8.66536C28 6.82442 26.2091 5.33203 24 5.33203"
                                    stroke="#BDBDBD"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M8 11.9987C5.79086 11.9987 4 10.5063 4 8.66536C4 6.82442 5.79086 5.33203 8 5.33203"
                                    stroke="#BDBDBD"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                  />
                                  <ellipse
                                    cx="16"
                                    cy="22.6654"
                                    rx="8"
                                    ry="5.33333"
                                    stroke="black"
                                    stroke-width="1.5"
                                  />
                                  <path
                                    d="M26.666 25.3346C29.005 24.8217 30.666 23.5227 30.666 22.0013C30.666 20.4799 29.005 19.1809 26.666 18.668"
                                    stroke="#BDBDBD"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M5.33398 25.3346C2.99499 24.8217 1.33398 23.5227 1.33398 22.0013C1.33398 20.4799 2.99499 19.1809 5.33398 18.668"
                                    stroke="#BDBDBD"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                  />
                                </svg>
                                <span className='ms-3'>{bookingData?.numberOfPeople} People</span>
                              </li>
                              <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                  <path d="M5.33398 13.5257C5.33398 7.52914 10.1096 2.66797 16.0007 2.66797C21.8917 2.66797 26.6673 7.52914 26.6673 13.5257C26.6673 19.4753 23.2629 26.4179 17.9512 28.9006C16.713 29.4793 15.2883 29.4793 14.0501 28.9006C8.73842 26.4179 5.33398 19.4753 5.33398 13.5257Z" stroke="black" stroke-width="2"/>
                                  <ellipse cx="16" cy="13.332" rx="4" ry="4" stroke="#BDBDBD" stroke-width="2"/>
                                </svg>
                                <span className='ms-3'>{branch}</span>
                              </li>
                              <li className='justify-content-between position-relative change_dir'>
                                <span className='d-flex align-items-center'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <ellipse cx="15.9993" cy="8.0013" rx="5.33333" ry="5.33333" stroke="#1C274C" stroke-width="1.5"/>
                                    <path opacity="0.5" d="M20.0007 17.7682C18.7654 17.4869 17.4152 17.332 16.0007 17.332C10.1096 17.332 5.33398 20.0183 5.33398 23.332C5.33398 26.6457 5.33398 29.332 16.0007 29.332C23.5839 29.332 25.776 27.9743 26.4097 25.9987" stroke="#1C274C" stroke-width="1.5"/>
                                    <ellipse cx="23.9993" cy="21.3333" rx="5.33333" ry="5.33333" stroke="#1C274C" stroke-width="1.5"/>
                                    <path d="M24 19.5547V23.1102" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M22.2207 21.332L25.7763 21.332" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                  <span className='ms-sm-3 ms-1 spec_size'>https://www.ozcoworkingspace.com</span>
                                </span>
                                <ShareButton shareUrl={bookingData?.spaceDetails.booking_url+bookingData?.spaceDetails.booking_code}/>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6 col-12">
                            <ul className="list-details px-sm-3 px-1">
                              <li className="align-items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className='me-3' width="32" height="32" viewBox="0 0 32 32" fill="none">
                                  <path d="M14.481 4.48577C15.1566 3.2739 15.4944 2.66797 15.9993 2.66797C16.5043 2.66797 16.8421 3.2739 17.5177 4.48577L17.6924 4.79929C17.8844 5.14367 17.9804 5.31585 18.13 5.42947C18.2797 5.54308 18.4661 5.58525 18.8389 5.66959L19.1783 5.74638C20.4901 6.0432 21.146 6.19161 21.3021 6.69343C21.4581 7.19525 21.011 7.71814 20.1166 8.76393L19.8853 9.03449C19.6311 9.33167 19.5041 9.48026 19.4469 9.66408C19.3897 9.84791 19.4089 10.0462 19.4474 10.4427L19.4823 10.8036C19.6175 12.199 19.6852 12.8966 19.2766 13.2068C18.8681 13.5169 18.2539 13.2341 17.0257 12.6686L16.7079 12.5223C16.3589 12.3616 16.1843 12.2812 15.9993 12.2812C15.8144 12.2812 15.6398 12.3616 15.2908 12.5223L14.973 12.6686C13.7448 13.2341 13.1306 13.5169 12.7221 13.2068C12.3135 12.8966 12.3812 12.199 12.5164 10.8036L12.5513 10.4427C12.5898 10.0462 12.609 9.84791 12.5518 9.66408C12.4946 9.48026 12.3676 9.33167 12.1134 9.03449L11.8821 8.76393C10.9877 7.71814 10.5406 7.19525 10.6966 6.69343C10.8527 6.19161 11.5086 6.0432 12.8204 5.74638L13.1598 5.66959C13.5326 5.58525 13.719 5.54308 13.8687 5.42947C14.0183 5.31585 14.1143 5.14367 14.3063 4.79929L14.481 4.48577Z" stroke="black" stroke-width="1.5"/>
                                  <path d="M25.9075 10.2448C26.2453 9.6389 26.4142 9.33594 26.6667 9.33594C26.9192 9.33594 27.0881 9.6389 27.4258 10.2448L27.5132 10.4016C27.6092 10.5738 27.6572 10.6599 27.732 10.7167C27.8068 10.7735 27.9 10.7946 28.0864 10.8368L28.2561 10.8751C28.912 11.0236 29.24 11.0978 29.318 11.3487C29.396 11.5996 29.1725 11.861 28.7253 12.3839L28.6096 12.5192C28.4826 12.6678 28.419 12.7421 28.3904 12.834C28.3619 12.9259 28.3715 13.025 28.3907 13.2233L28.4082 13.4038C28.4758 14.1014 28.5096 14.4503 28.3053 14.6053C28.101 14.7604 27.794 14.619 27.1798 14.3363L27.0209 14.2631C26.8464 14.1827 26.7592 14.1426 26.6667 14.1426C26.5742 14.1426 26.4869 14.1827 26.3124 14.2631L26.1535 14.3362C25.5394 14.619 25.2323 14.7604 25.028 14.6053C24.8238 14.4503 24.8576 14.1014 24.9252 13.4038L24.9427 13.2233C24.9619 13.025 24.9715 12.9259 24.9429 12.834C24.9143 12.7421 24.8508 12.6678 24.7237 12.5192L24.608 12.3839C24.1609 11.861 23.9373 11.5996 24.0153 11.3487C24.0933 11.0978 24.4213 11.0236 25.0772 10.8751L25.2469 10.8368C25.4333 10.7946 25.5265 10.7735 25.6013 10.7167C25.6761 10.6599 25.7241 10.5738 25.8201 10.4016L25.9075 10.2448Z" stroke="black" stroke-width="1.5"/>
                                  <path d="M4.57353 10.2448C4.9113 9.6389 5.08019 9.33594 5.33268 9.33594C5.58518 9.33594 5.75407 9.6389 6.09184 10.2448L6.17922 10.4016C6.27521 10.5738 6.3232 10.6599 6.39803 10.7167C6.47286 10.7735 6.56606 10.7946 6.75245 10.8368L6.92214 10.8751C7.57805 11.0236 7.90601 11.0978 7.98404 11.3487C8.06206 11.5996 7.83848 11.861 7.39132 12.3839L7.27564 12.5192C7.14857 12.6678 7.08503 12.7421 7.05645 12.834C7.02787 12.9259 7.03748 13.025 7.05669 13.2233L7.07418 13.4038C7.14178 14.1014 7.17558 14.4503 6.97131 14.6053C6.76704 14.7604 6.45997 14.619 5.84584 14.3363L5.68695 14.2631C5.51244 14.1827 5.42518 14.1426 5.33268 14.1426C5.24019 14.1426 5.15293 14.1827 4.97841 14.2631L4.81953 14.3362C4.2054 14.619 3.89833 14.7604 3.69406 14.6053C3.48978 14.4503 3.52358 14.1014 3.59119 13.4038L3.60868 13.2233C3.62789 13.025 3.63749 12.9259 3.60891 12.834C3.58033 12.7421 3.5168 12.6678 3.38973 12.5192L3.27404 12.3839C2.82688 11.861 2.6033 11.5996 2.68133 11.3487C2.75935 11.0978 3.08731 11.0236 3.74323 10.8751L3.91292 10.8368C4.09931 10.7946 4.1925 10.7735 4.26733 10.7167C4.34216 10.6599 4.39016 10.5738 4.48614 10.4016L4.57353 10.2448Z" stroke="black" stroke-width="1.5"/>
                                  <path opacity="0.5" d="M5.33203 28.5178H8.34528C9.69309 28.5178 11.0554 28.6583 12.3671 28.9285C14.6875 29.4065 17.1305 29.4645 19.4746 29.085C20.6304 28.8979 21.7668 28.6118 22.7953 28.1154C23.7239 27.6672 24.8613 27.0355 25.6253 26.3279C26.3882 25.6213 27.1827 24.4649 27.7466 23.561C28.2302 22.7859 27.9963 21.8349 27.2314 21.2574C26.3818 20.6159 25.121 20.616 24.2715 21.2577L21.8619 23.0779C20.9281 23.7833 19.908 24.4327 18.6928 24.6265C18.5467 24.6499 18.3936 24.6711 18.2338 24.6896M18.2338 24.6896C18.1858 24.6952 18.1371 24.7005 18.0878 24.7055M18.2338 24.6896C18.4282 24.6479 18.6213 24.5281 18.8024 24.37C19.66 23.6215 19.7142 22.36 18.9701 21.5242C18.7974 21.3302 18.5954 21.1685 18.3708 21.0345C14.641 18.8099 8.83792 20.5043 5.33203 22.9906M18.2338 24.6896C18.1852 24.7 18.1364 24.7055 18.0878 24.7055M18.0878 24.7055C17.39 24.7772 16.5736 24.7957 15.6677 24.7102" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                {(!bookingServices || bookingServices?.length === 0) && (<Paragraph className='mb-0'>you didn't select any services</Paragraph>)}
                                {(bookingServices && bookingServices?.length !== 0) && (<div className="col-10 d-flex flex-column">
                                  {bookingServices?.map((item, index)=>{
                                    return (
                                      <div className="col-lg-6 col-12 d-flex align-items-center justify-content-between mb-3" key={index}>
                                        <p className='mb-0'>{item.label}</p>
                                        <p className="mb-0 service_price">{item.price} EGP</p>
                                        <a className="" onClick={() => removeService(index)}>
                                          x
                                        </a>
                                      </div>
                                    )
                                  })}
                                </div>)}
                              </li>
                              <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                  <path d="M17.3327 9.33333C17.3327 10.0697 16.7357 10.6667 15.9993 10.6667C15.263 10.6667 14.666 10.0697 14.666 9.33333C14.666 8.59695 15.263 8 15.9993 8C16.7357 8 17.3327 8.59695 17.3327 9.33333Z" stroke="#BDBDBD" stroke-width="1.5"/><path d="M24 8C21.7909 8 20 6.20914 20 4" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/><path d="M24 10.668C21.7909 10.668 20 12.4588 20 14.668" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/><path d="M8 8C10.2091 8 12 6.20914 12 4" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/><path d="M8 10.668C10.2091 10.668 12 12.4588 12 14.668" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/><path d="M5.33398 28.5178H8.34723C9.69504 28.5178 11.0574 28.6583 12.3691 28.9285C14.6894 29.4065 17.1324 29.4645 19.4766 29.085C20.6324 28.8979 21.7687 28.6118 22.7973 28.1154C23.7258 27.6672 24.8632 27.0355 25.6272 26.3279C26.3901 25.6213 27.1846 24.4649 27.7486 23.561C28.2321 22.7859 27.9982 21.8349 27.2334 21.2574C26.3837 20.6159 25.1229 20.616 24.2735 21.2577L21.8639 23.0779C20.93 23.7833 19.9099 24.4327 18.6948 24.6265C18.5487 24.6499 18.3955 24.6711 18.2358 24.6896M18.2358 24.6896C18.1877 24.6952 18.139 24.7005 18.0897 24.7055M18.2358 24.6896C18.4302 24.6479 18.6232 24.5281 18.8043 24.37C19.6619 23.6215 19.7162 22.36 18.9721 21.5242C18.7994 21.3302 18.5974 21.1685 18.3727 21.0345C14.643 18.8099 8.83987 20.5043 5.33398 22.9906M18.2358 24.6896C18.1871 24.7 18.1384 24.7055 18.0897 24.7055M18.0897 24.7055C17.3919 24.7772 16.5755 24.7957 15.6697 24.7102" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round"/><path d="M23.219 13.8856C24 13.1046 24 11.8475 24 9.33333C24 6.81918 24 5.5621 23.219 4.78105M23.219 13.8856C22.4379 14.6667 21.1808 14.6667 18.6667 14.6667H13.3333C10.8192 14.6667 9.5621 14.6667 8.78105 13.8856M23.219 13.8856C23.219 13.8856 23.219 13.8856 23.219 13.8856ZM23.219 4.78105C22.4379 4 21.1808 4 18.6667 4L13.3333 4C10.8192 4 9.5621 4 8.78105 4.78105M23.219 4.78105C23.219 4.78105 23.219 4.78105 23.219 4.78105ZM8.78105 4.78105C8 5.5621 8 6.81918 8 9.33333C8 11.8475 8 13.1046 8.78105 13.8856M8.78105 4.78105C8.78105 4.78105 8.78105 4.78105 8.78105 4.78105ZM8.78105 13.8856C8.78105 13.8856 8.78105 13.8856 8.78105 13.8856Z" stroke="black" stroke-width="1.5"/>
                                  </svg>
                                  <span className='ms-3'>{price.total_price} EGP</span>
                              </li>
                              <li className="mb-0">
                                <PromoCode price={price.total_price} getPrice={getPrice}/>
                              </li>
                                <div className="my-32" style={{
                                  borderBottom: '1px solid black'
                                }}></div>
                              <li className="price-promo d-flex justify-content-between align-items-center">
                                  <p>Total Price:</p>
                                  <p>{priceAfterPromo} EGP</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="terms">
                        <Button 
                          tagType='link'
                          onClick={()=>setShow(true)}
                          className='p-0 terms_link'>Terms&conditions Apply
                        </Button>
                      </div>
                      <div className="step-one">
                        <a className="btn button-outLine btn-bg-white"
                          onClick={handleBookingClick}>Booking
                        </a>
                      </div>
                    </>
                  )}
                                    {step.key === 'payment' && (
                                        <>
                                            <div className="payment-bg">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="box-summary">
                                                            <div className="head-box-summary">
                                                                <span>Choose Payment Method</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-6 col-sm-12 ">
                                                        <div className="form-payment">
                                                            <Form>
                                                                <div
                                                                    className="d-flex align-items-center method-payment">
                                                                    <Media
                                                                        type="img" src={cash}/>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Cash Payment"
                                                                        name="radioOptions"
                                                                        id="radioOption1"
                                                                        className="col-12"
                                                                        checked
                                                                        onChange={()=>setPayment(1)}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="d-flex align-items-center method-payment">
                                                                    <Media
                                                                        type="img" src={wallet}/>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Credit Payment"
                                                                        name="radioOptions"
                                                                        id="radioOption2"
                                                                        className="col-12"
                                                                    />
                                                                </div>
                                                                <div className="step-one">
                                                                    <a className="btn button-outLine btn-bg-white"
                                                                    onClick={confirmBookingVenue}>Confirm
                                                                    </a>
                                                                </div>
                                                            </Form>

                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        </>
                                    )}
                                    {step.key === 'invoice' && (
                                        <> 
                                          <div className="">
                                                <div className="row">

                                                    <div className="col-lg-6 col-md-6 col-sm-12 order-summary">
                                                        <div className="order-details">
                                                            <h2>Amount Due<br/><span style={{
                                                              fontFamily: 'Roboto'
                                                            }}>#</span>1123334</h2>
                                                            <div
                                                                className="d-flex align-items-center justify-content-between">
                                                                <span
                                                                    className="date-period">Date Period: {setDate(bookingData?.date)}<br/>
                                                                    <span
                                                                        className="invoice">Invoice</span></span>
                                                                <span className="location">OZ Working space El- sheikh- zayed Giza, Egypt </span>
                                                            </div>
                                                        </div>
                                                        <div className="order-description d-flex flex-column justify-content-between">
                                                            <div className="pill">
                                                                <div
                                                                    className="d-flex align-items-center justify-content-between line">
                                                                <span
                                                                    className="date-period">Description</span>
                                                                    <span className="location">Subtotal</span>
                                                                </div>
                                                                <div
                                                                    className="d-flex align-items-center justify-content-between item-box ">
                                                                  <span
                                                                      className="item-name">{bookingData?.spaceDetails.title}</span>
                                                                    <span className="item-price">
                                                                      {price.booking_price < price.venue_price ? 
                                                                        (<del>{price.venue_price} EGP</del> ) : `${price.venue_price} EGP`
                                                                      }
                                                                    </span>
                                                                </div>
                                                                {(price.booking_price < price.venue_price ) && (<div
                                                                    className="d-flex align-items-center justify-content-end">
                                                                    <span className="item-price">
                                                                      {price.booking_price} EGP
                                                                    </span>
                                                                </div>)}
                                                                {bookingData?.services.map(item=>{
                                                                  return (
                                                                    <div className="d-flex align-items-center justify-content-between mt-2">
                                                                      <span
                                                                          className="date-period">{item.label}</span>
                                                                        <span className="item-price">
                                                                          {item.price} EGP
                                                                        </span>
                                                                    </div>
                                                                  )
                                                                })

                                                                }
                                                            </div>
                                                          <div className="d-flex flex-column justify-content-between">
                                                            <div className="d-flex align-items-center justify-content-between line">
                                                              <span className="date-period">Tax 14%</span>
                                                              <span className="location">
                                                                {(price.total_price * 14) / 100} EGP
                                                              </span>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between item-box">
                                                              <span className="item-total">Total Price:</span>
                                                              <span className="item-total-price">
                                                                {(price.total_price * 14) /
                                                                  100 +
                                                                  price.total_price}{" "}
                                                                EGP
                                                              </span>
                                                            </div>
                                                          </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 order-summary-black ">
                            <div className="order-details">
                              <div className="line">
                                <h2>{bookingData?.spaceDetails.title}</h2>
                              </div>
                              <div className="booking-items">
                                <span>Date : {setDate(bookingData?.date)}</span>
                                <span>
                                  Time : {setTime(bookingData?.time.start)}{"-"}
                                  {setTime(bookingData?.time.end)}{"/"}
                                  {getPeriod(
                                    bookingData?.time.start,
                                    bookingData?.time.end
                                  )}
                                </span>
                                <span>
                                  Number of people :{" "}
                                  {bookingData?.numberOfPeople} People
                                </span>
                                {payment && (
                                  <span>
                                    Cash notes : Total payment due in 2 days.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="step-one">
                        <Button
                          tagType="link"
                          className="btn button-outLine btn-bg-white"
                          to={"/profile/mybooking"}
                          onClick={()=>{
                            localStorage.removeItem("BookingOZDetails");
                            localStorage.removeItem("BookingOZServices");
                            localStorage.removeItem("BookingOZDetailsId");
                          }}
                        >
                          see booking
                        </Button>
                      </div>
                    </>
                  )}
                </Tab.Pane>
              )})}
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
      <TermsAndConditionsModal show={show} onHide={handelClose} />
    </>
  );
};

export default BookingSummary;
