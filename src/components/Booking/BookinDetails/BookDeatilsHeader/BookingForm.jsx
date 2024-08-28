import React, {useState, useEffect, useContext} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './BookingForm.css'
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import Button from '../../../UI/Button';
import RequestFormModal from '../../../Auth/LoginAlertModal';
import {checkAvailability, rescheduleBooking} from '../../../../apis/Booking';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import ShowAvaliablesModal from './ShowAvaliablesModal';
import moment from 'moment';
import { Modal, message } from 'antd';
import { addMonths, isAfter, subMonths } from 'date-fns';

const BookingForm = ({venueDetails, reschedule, services, venue_id}) => {


    const [messageApi, contextHolder] = message.useMessage();
    const [startDate, setStartDate] = useState(null);
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [show, setShow] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [counter, setCounter] = useState(4);
    const [avaliableDate, setAvaliableDates] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const navigate = useNavigate();
    const [userNewTimeInfo, setUserNewTimeInfo] = useState(null);
    const { userId, userProfileData, token } = useContext(AuthContext);
    const [amentiyGroupId, setAmenityGroupId] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [discountAmentiyGroupId, setDiscountAmentiyGroupId] = useState('');
    const [packagePrice, setPackagePrice] = useState({});

    const handleDateChange = (date) => {
        const timezoneOffset = date.getTimezoneOffset();
        const utcDate = new Date(date.getTime() - timezoneOffset * 60000);
        setStartDate(utcDate);
    };

    const handleStartTimeChange = (startTime) => {
        setSelectedStartTime(startTime);
        setSelectedEndTime(null);
    };

    const handleEndTimeChange = (endTime) => {
        setSelectedEndTime(endTime);
    };

    const handelHide = () => setShow(false);
    const handelAvailableHide = () => setShowAvailable(false);

    const saveBookingData =  (e)=>{
        e.preventDefault();
            if(token){
                if(reschedule){
                    rescheduleHandler();
                }else{
                    if(venueDetails.default_price_per === 'day'){
                        if(startDate !== null){
                            addUserDetails('day');
                        }else{
                            messageApi.open({
                                type: 'error',
                                content: 'Please select Your booking details!',
                            });
                        }
                    }else{
                        if((startDate !== null) && (selectedStartTime !== null) && (selectedEndTime !== null)){
                            addUserDetails('hour');
                        }else{
                            messageApi.open({
                                type: 'error',
                                content: 'Please select Your booking details!',
                            });
                        }
                    }
                }
            }else{
                setShow(true);
            }
    };

    const rescheduleHandler = async () => {
        try{
            const result = await rescheduleBooking(
                token,
                userId,
                bookingId,
                venue_id,
                setDateApi(startDate),
                setTimeApi(selectedStartTime),
                setTimeApi(selectedEndTime)
            );
          if (result) {
            Modal.success({
                title: result.status,
                content: result.message,
                centered: true,
                afterClose: ()=>{
                    navigate(`/mybookingDetails/${bookingId}`)
                }
            });
          }
        }catch (error) {
            Modal.error({
              title: 'error',
              content: error.response.data.message,
            })
        }
    };

    const setDateApi = (roomdate) => {
        const date = new Date(roomdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateNew = `${year}-${month}-${day}`;
        return dateNew;
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

    const calcReservationHours = (start, end) => {
        const startTime = moment(start, 'h:mm A');
        const endTime = moment(end, 'h:mm A');
        
        const duration = moment.duration(endTime.diff(startTime));
        
        const hours = duration.hours();
        const minutes = duration.minutes();
        const totalMinutes = hours * 60 + minutes;

        return totalMinutes;
    };

    const addUserDetails = (type) => {
        const bookingData  = {
            id: JSON.parse(localStorage.getItem('BookingOZDetailsId')),
            date: startDate,
            time: {
                start: selectedStartTime,
                end: selectedEndTime
            },
            numberOfPeople: counter,
            spaceDetails: venueDetails,
            services: services || [],
            membershipPackageOffer: clacPackage(type),
            price: venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price,
            service_price : services.reduce((sum, item) => sum + item.price, 0),
            fullDay: venueDetails.default_price_per === 'day' ? 'Full Day' : '',
        };
        localStorage.setItem("BookingOZDetails", JSON.stringify(bookingData));
    };

    const clacPackage = (type) => {
        if(amentiyGroupId){
            if(type === 'day'){
                const hours = 24 * 60;
                return checkForBackage(hours, type);
            }else{
                const hours = calcReservationHours(selectedStartTime, selectedEndTime);
                return checkForBackage(hours, type);
            }
        }else if(discountAmentiyGroupId){
            const discount = userProfileData?.membership_discount_roles[discountAmentiyGroupId].discount;
            const price = userProfileData?.membership_discount_roles[discountAmentiyGroupId].price;
            const type = userProfileData?.membership_discount_roles[discountAmentiyGroupId].discount_type === 'percentage' ? '%' : '';
            const discount_type = userProfileData?.membership_discount_roles[discountAmentiyGroupId].discount_type;
            const hours = calcReservationHours(selectedStartTime, selectedEndTime);
            checkAvailabileTimes();
            return {
                description: `Enjoy ${discount} ${type} Off`, 
                price: calculateReservationPriceDiscounted(calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price), discount_type, discount),
                booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
            };
        }else{
            checkAvailabileTimes();
            const hours = calcReservationHours(selectedStartTime, selectedEndTime);
            return {
                price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price),
                description: ``, 
                booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
            }
        }
    }

    const checkForBackage = (hours, type) => {
        const how_many_hours = userProfileData?.membership_packages[amentiyGroupId].how_many_hours;
        const max_hours = userProfileData?.membership_packages[amentiyGroupId].max_hours;
        const used_hours = userProfileData?.membership_packages[amentiyGroupId].used_hours;

        const how_many_hours_min = how_many_hours * 60 ;
        const max_hours_min = max_hours * 60;
        const used_hours_min = used_hours * 60;

        if(how_many_hours_min === used_hours_min){
            if(discountAmentiyGroupId){
                const discount = userProfileData?.membership_discount_roles[discountAmentiyGroupId].discount;
                const price = userProfileData?.membership_discount_roles[discountAmentiyGroupId].price;
                const type = userProfileData?.membership_discount_roles[discountAmentiyGroupId].discount_type === 'percentage' ? '%' : '';
                checkAvailabileTimes();
                return {
                    description: `Enjoy ${discount} ${type} Off From Room Price`, 
                    price: price,
                    booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
                };
            }else{
                checkAvailabileTimes();
                return {
                    description: '', 
                    price: venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price,
                    booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
                };
            }
        }else{
            if(max_hours_min){
                if(hours > max_hours_min){
                    if(type === 'day'){
                        checkAvailabileTimes();
                        return {
                            description: `You Have Only ${max_hours} Hours free Included In Your package`,
                            price: venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price,
                            hours: hours,
                            booking_price: venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price
                        };
                    }else{
                        return Modal.warning({
                            title: 'Membership Package',
                            content: `You Have Only ${max_hours} Hours For Reservation In Your package`,
                            footer: true,
                            centered: true,
                            closable: true,
                            maskClosable: true
                            // stop booking 
                        });
                    }
                }else {
                    checkAvailabileTimes();
                    return {
                        description: `You Have ${max_hours} Hours free Included In Your package`, 
                        price: 0, 
                        hours: hours,
                        booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
                    };
                }

            }else{
                if(hours > how_many_hours_min){
                    if(type === 'day'){
                        checkAvailabileTimes();
                        return {
                            description: `You Have Only ${how_many_hours} Hours free Included In Your package`,
                            price: venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price,
                            hours: hours,
                            booking_price: venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price
                        };
                    }else{
                        const freeHours_min = hours - how_many_hours_min;
                        checkAvailabileTimes();
                        return {
                            description: `You Have Only ${how_many_hours} Hours free Included In Your package`,
                            price: calculateReservationPrice(freeHours_min, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price),
                            hours: hours,
                            booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
                        }
                    }
                }else {
                    checkAvailabileTimes();
                    return {
                        description: `You Have ${how_many_hours} Hours free Included In Your package`,
                        price: 0, 
                        hours: hours,
                        booking_price: calculateReservationPrice(hours, venueDetails?.price > venueDetails?.price_discounted ? venueDetails?.price_discounted : venueDetails?.price)
                    };
                }
            }
        }
    };

    const calculateReservationPrice = (totalMinutes, hourlyRate) => {
        const durationInHours = totalMinutes / 60;
        const totalPrice = durationInHours * hourlyRate;
        return totalPrice;
    };

    const calculateReservationPriceDiscounted = (price, type, discount) => {
        if(type === 'percentage'){
            const priceDicounted =  price * discount / 100;
            return price - priceDicounted;
        }else{
            return price - discount;
        }

    }

    const checkAvailabileTimes = async () => {
        const dateObject = new Date(startDate);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        let timeStartStamp, timeEndStamp;

        if(venueDetails.default_price_per === 'day'){
            const timeStart = new Date(startDate);
            timeStartStamp = Math.floor(timeStart.getTime() / 1000);
    
            const timeEnd = new Date(startDate);
            timeEndStamp = Math.floor(timeEnd.getTime() / 1000);
        }else{
            const timeStart = new Date(selectedStartTime);
            timeStartStamp = Math.floor(timeStart.getTime() / 1000);
    
            const timeEnd = new Date(selectedEndTime);
            timeEndStamp = Math.floor(timeEnd.getTime() / 1000);
        }

        try{
            const result = await checkAvailability(
                token, 
                userId, 
                venueDetails.id, 
                venueDetails.buffering_time, 
                formattedDate, 
                timeStartStamp, 
                timeEndStamp);
                if(result.conflict.length === 0){
                    if(reschedule){
                        navigate('/bookingDetails/bookNow?reschedule=true');
                    }else{
                        navigate('/bookingDetails/bookNow');
                    }
                }else{
                    setShowAvailable(true);
                    setAvaliableDates(result.available);
                }
        } catch (error){
            Modal.error({
                title: error.response.data.status,
                content: error.response.data.message,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            })
        }
    };

    const increment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(counter < venueDetails.capacity){
            setCounter(counter + 1)
        }else{
            setShowTooltip(!showTooltip);
        }
    };

    const decrement = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (counter > 4) {
            setCounter((prevCount) => prevCount - 1);
        }
    };

    const handlePrevClick = (prevMonth, setCurrentMonth) => {
        const currentDate = new Date();
        const threeMonthsAgo = subMonths(currentDate, 3);
        if (isAfter(prevMonth, threeMonthsAgo)) {
          setCurrentMonth(prevMonth);
        }
    };
    
    const handleNextClick = (nextMonth, setCurrentMonth) => {
        const currentDate = new Date();
        const threeMonthsAhead = addMonths(currentDate, 3);
        if (isAfter(threeMonthsAhead, nextMonth)) {
          setCurrentMonth(nextMonth);
        }else{
            Modal.info({
                title: 'Admin Contact',
                content: `Please, Contact Admin`,
                footer: false,
                centered: true,
                closable: true,
                maskClosable: true
            })
        }
    };

    const renderCustomHeader = ({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="react-datepicker__header d-flex">
            <div className="react-datepicker__current-month">
                {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button type="button" 
                className="react-datepicker__navigation react-datepicker__navigation--previous react-datepicker__navigation--previous--disabled" 
                aria-label="Previous Month"
              onClick={() => handlePrevClick(subMonths(date, 1), decreaseMonth)}
                >
                    <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">Previous Month</span>
            </button>
          
            <button 
                type="button" 
                className="react-datepicker__navigation react-datepicker__navigation--next" 
                aria-label="Next Month"
              onClick={() => handleNextClick(addMonths(date, 1), increaseMonth)}
            >
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">Next Month</span>
            </button>
        </div>
    );

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("BookingOZDetails"));
        if(data){
            setStartDate(new Date(data.date));
            setSelectedStartTime(new Date(data.time.start));
            setSelectedEndTime(new Date(data.time.end));
            setCounter(data.numberOfPeople);
            setBookingId(data.id);
        }
    },[userNewTimeInfo]);

    useEffect(()=>{
        if(token){
            const groupIds = Object.keys(userProfileData?.membership_packages);
            const discountGroupIds = Object.keys(userProfileData?.membership_discount_roles);
            const groupId = venueDetails?.amenitie?.group_id.toString();
            if(groupIds.includes(groupId)) {
                setAmenityGroupId(groupId);
            }
            if(discountGroupIds.includes(groupId)){
                setDiscountAmentiyGroupId(groupId);
            }
        }
    },[venueDetails, userProfileData]);

    const updateTimeInfo = (data) => {
        localStorage.setItem("BookingOZDetails", JSON.stringify(data));
        setUserNewTimeInfo(data);
    };

    return (
        <>
            <div className="featured__bookbottom align-self-end col-12" style={{
                position: 'absolute',
                bottom: '0',
                zIndex: '99'
            }}>
                <div className="bookbottom">
                    <div className='container-fluid p-0'>
                        <form className="bookbottom__form d-flex justify-content-center">
                            <ul className="row col-lg-12 col-6 bookbottom__ul p-0">
                                <div className='col-lg-4 d-flex justify-content-center p-0'>
                                    <li className="col-lg-3 bookbottom__li bookbottom__li--icon bookbottom__li--icon-guests">
                                        <div className="bookbottom__guesticon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                                                <circle cx="44.1593" cy="32.421" r="8.42103" stroke="white" stroke-width="3.5"/>
                                                <path d="M56.791 38.7372C60.2791 38.7372 63.1068 36.3808 63.1068 33.4741C63.1068 30.5673 60.2791 28.2109 56.791 28.2109" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round"/>
                                                <path d="M31.5273 38.7372C28.0392 38.7372 25.2116 36.3808 25.2116 33.4741C25.2116 30.5673 28.0392 28.2109 31.5273 28.2109" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round"/>
                                                <ellipse cx="44.1589" cy="55.5773" rx="12.6316" ry="8.42103" stroke="white" stroke-width="3.5"/>
                                                <path d="M61 59.7919C64.6931 58.982 67.3158 56.931 67.3158 54.5288C67.3158 52.1265 64.6931 50.0755 61 49.2656" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round"/>
                                                <path d="M27.3164 59.7919C23.6233 58.982 21.0006 56.931 21.0006 54.5288C21.0006 52.1265 23.6233 50.0755 27.3164 49.2656" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="col-lg-9 bookbottom__li bookbottom__li--select bookbottom__li--select-guests">
                                        <div className="bookbottom__select position-relative">
                                            <div className="btn-group">
                                                {reschedule ? (<p className="counter-number mb-0">{counter} persons</p>) :
                                                (<>
                                                    <button className="btn button-select-guest dropdown-toggle dropup" 
                                                        type="button" id="dropdownMenuButton" 
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                        {(counter !== null && counter !== 4) ? `${counter} persons` : `Start with ${counter} of People`}
                                                    </button>
                                                    
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none'
                                                    }}>
                                                        <div className='counter-container'>
                                                            <span>{`Room Capacity From 4 To ${venueDetails.capacity}`}</span>
                                                            <button className="decrement-btn" onClick={decrement}>-</button>
                                                            <input 
                                                                type='number' 
                                                                className="input counter-number" 
                                                                min={4} 
                                                                max={venueDetails?.capacity} 
                                                                value={counter === 0 ? 4 : counter} 
                                                                onChange={(e) => {
                                                                    const value = parseInt(e.target.value, 10);
                                                                    if (!isNaN(value) && value >= 4 && value <= venueDetails.capacity) {
                                                                        setCounter(value);
                                                                    }
                                                                }}
                                                            />
                                                            <button onClick={increment}>+</button>
                                                        </div>
                                                    </ul>
                                                </>)}
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                <div className='col-lg-3 d-flex justify-content-center p-0'>
                                    <li className="col-lg-3 bookbottom__li bookbottom__li--icon bookbottom__li--icon-datepicker">
                                        <div className="bookbottom__calicon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                                            <path d="M24 43.4803C24 35.7427 24 31.8739 26.3434 29.4702C28.6869 27.0664 32.4585 27.0664 40.0019 27.0664H48.0029C55.5463 27.0664 59.318 27.0664 61.6614 29.4702C64.0048 31.8739 64.0048 35.7427 64.0048 43.4803V47.5838C64.0048 55.3214 64.0048 59.1902 61.6614 61.594C59.318 63.9978 55.5463 63.9978 48.0029 63.9978H40.0019C32.4585 63.9978 28.6869 63.9978 26.3434 61.594C24 59.1902 24 55.3214 24 47.5838V43.4803Z" stroke="white" stroke-width="2"/>
                                            <path opacity="0.5" d="M34.002 27.0776V24" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            <path opacity="0.5" d="M54.0078 27.0776V24" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            <path opacity="0.5" d="M25.002 37.3242H63.0065" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M56.0044 53.747C56.0044 54.8801 55.1088 55.7987 54.0041 55.7987C52.8994 55.7987 52.0039 54.8801 52.0039 53.747C52.0039 52.6138 52.8994 51.6953 54.0041 51.6953C55.1088 51.6953 56.0044 52.6138 56.0044 53.747Z" fill="white"/>
                                            <path d="M56.0044 45.54C56.0044 46.6732 55.1088 47.5918 54.0041 47.5918C52.8994 47.5918 52.0039 46.6732 52.0039 45.54C52.0039 44.4069 52.8994 43.4883 54.0041 43.4883C55.1088 43.4883 56.0044 44.4069 56.0044 45.54Z" fill="white"/>
                                            <path d="M46.0024 53.747C46.0024 54.8801 45.1069 55.7987 44.0022 55.7987C42.8975 55.7987 42.002 54.8801 42.002 53.747C42.002 52.6138 42.8975 51.6953 44.0022 51.6953C45.1069 51.6953 46.0024 52.6138 46.0024 53.747Z" fill="white"/>
                                            <path d="M46.0024 45.54C46.0024 46.6732 45.1069 47.5918 44.0022 47.5918C42.8975 47.5918 42.002 46.6732 42.002 45.54C42.002 44.4069 42.8975 43.4883 44.0022 43.4883C45.1069 43.4883 46.0024 44.4069 46.0024 45.54Z" fill="white"/>
                                            <path d="M36.0044 53.747C36.0044 54.8801 35.1088 55.7987 34.0041 55.7987C32.8994 55.7987 32.0039 54.8801 32.0039 53.747C32.0039 52.6138 32.8994 51.6953 34.0041 51.6953C35.1088 51.6953 36.0044 52.6138 36.0044 53.747Z" fill="white"/>
                                            <path d="M36.0044 45.54C36.0044 46.6732 35.1088 47.5918 34.0041 47.5918C32.8994 47.5918 32.0039 46.6732 32.0039 45.54C32.0039 44.4069 32.8994 43.4883 34.0041 43.4883C35.1088 43.4883 36.0044 44.4069 36.0044 45.54Z" fill="white"/>
                                        </svg>

                                        </div>
                                    </li>
                                    <li className="col-lg-9 bookbottom__li bookbottom__li--datepicker select-date-costume">
                                        <DatePicker
                                            className="bookbottom__datetitle text-center"
                                            selected={startDate}
                                            placeholderText="Select Date"
                                            minDate={new Date()}
                                            maxDate={addMonths(new Date(), 3)}
                                            onChange={handleDateChange}
                                            fixedHeight
                                            showDisabledMonthNavigation
                                            renderCustomHeader={renderCustomHeader}
                                        />

                                    </li>
                                </div>
                                <div className='col-lg-3 d-flex justify-content-center p-0'>
                                    <li className="col-lg-3 bookbottom__li bookbottom__li--icon">
                                        <div className="bookbottom__roomicon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                                            <circle cx="44" cy="46" r="18" stroke="white" stroke-width="3.5"/>
                                            <path d="M44 38V46L49 51" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M27 29L35 24" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M61 29L53 24" stroke="#BDBDBD" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        </div>
                                    </li>
                                    <li className="col-lg-9 bookbottom__li bookbottom__li--select">
                                        <div className="bookbottom__select active" data-target="roomType">
                                            <div className="bookbottom__select-text ">
                                                <div className="position-relative">
                                                    <div className="time-container d-flex px-xl-4 px-lg-2">
                                                        {venueDetails.default_price_per === 'day' ? 'Full Day' : 
                                                            selectedEndTime ? (
                                                                <div className="d-flex justify-content-evenly align-items-center">
                                                                    <DatePicker 
                                                                        onChange={handleStartTimeChange}
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={30}
                                                                        timeCaption="Start Time"
                                                                        dateFormat="h:mm aa"
                                                                        selectsStart
                                                                        startDate={selectedStartTime}
                                                                        endDate={selectedEndTime}
                                                                        placeholderText={selectedStartTime.toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}
                                                                        className="place-text"
                                                                    />
                                                                        <p className="mb-0 mx-2">-</p>
                                                                        <p className="place-text mb-0">{selectedEndTime.toLocaleTimeString([],{ hour: 'numeric', minute: 'numeric' })}</p>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <DatePicker
                                                                            selected={selectedStartTime}
                                                                            onChange={handleStartTimeChange}
                                                                            showTimeSelect
                                                                            showTimeSelectOnly
                                                                            timeIntervals={30}
                                                                            timeCaption="Check In"
                                                                            dateFormat="h:mm aa"
                                                                            selectsStart
                                                                            startDate={selectedStartTime}
                                                                            endDate={selectedEndTime}
                                                                            fixedHeight
                                                                            placeholderText="Select Time"
                                                                            className="place-text"
                                                                            // Open the start time picker automatically
                                                                        />
                                                                        {selectedStartTime && (
                                                                            <DatePicker
                                                                                selected={selectedEndTime}
                                                                                onChange={handleEndTimeChange}
                                                                                showTimeSelect
                                                                                showTimeSelectOnly
                                                                                timeIntervals={30}
                                                                                timeCaption="End Time"
                                                                                dateFormat="h:mm aa"
                                                                                selectsEnd
                                                                                startDate={selectedStartTime}
                                                                                endDate={selectedEndTime}
                                                                                minTime={selectedStartTime}
                                                                                maxTime={new Date().setHours(23, 45)}
                                                                                disabled={!selectedStartTime}
                                                                                fixedHeight
                                                                                className="place-text"
                                                                                open={true} // Open the end time picker automatically
                                                                            />
                                                                        )}
                                                                    </>
                                                                )
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </li>
                                </div>

                                <li className="col-lg-2 col-12 bookbottom__li bookbottom__li--submit">
                                    <div className="btnlinks">
                                        <Button 
                                            className="reservebutton" 
                                            tagType='link'
                                            onClick={saveBookingData}>Book Now</Button>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
            {contextHolder}
            <RequestFormModal 
                show={show}
                handleClose={handelHide}
            />
            <ShowAvaliablesModal 
                show={showAvailable}
                onHide={handelAvailableHide}
                avaliableDate={avaliableDate}
                onConfirm={updateTimeInfo}
            />
        </>
    );
};

export default BookingForm;