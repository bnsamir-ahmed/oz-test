import axios from 'axios';
import FormData from 'form-data';


export const getAmenitiesGroup = async (token, user_id, branch_id) => {
     
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', user_id);
    formData.append('branch_id', branch_id);

    const URL = `${process.env.REACT_APP_API_URL}/api/get-amenitie-groups?access_token=${token}&skip=true`;

    const config = {
        method: 'post',
        url: URL,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getVenues = async (token, userId, branch_id, amenities_group_id) => {
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('branch_id', branch_id);
    formData.append('amenities_group_id', amenities_group_id);
    formData.append('user_id', userId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/get-venues?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getVenueById = async (token, venue_id, signal) => {
    
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('id', venue_id);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/get_venue?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const likeVenues = async (token, userId, venue_id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('venue_id', venue_id);
    formData.append('user_id', userId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/like-venue?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getLastBooking = async (token, UserId, amenitie_id, source) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('amenitie_group_id', amenitie_id);
    formData.append('user_id', UserId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/my-booking?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        cancelToken: source.token
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getMyBookingList = async (token, UserId, branch_id, signal) => {
        
        const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
        formData.append('user_id', UserId);
        formData.append('branch_id', branch_id);

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/list-my-booking?access_token=${token}`,
            data: formData,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            signal: signal
        };

    const response = await axios(config);
        
    return response.data.data;
};

export const checkAvailability = async (token, 
    user_id, 
    venue_id, 
    buffering_time, 
    date, 
    check_in, 
    check_out) => {
        const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
        formData.append('user_id', user_id);
        formData.append('venue_id', venue_id);
        formData.append('buffering_time', buffering_time);
        formData.append('date', date);
        formData.append('check_in', check_in);
        formData.append('check_out', check_out);

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/check_availability?access_token=${token}`,
            data: formData,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };

    const response = await axios(config);
        
    return response.data.data;
};

export const confirmBooking = async (
    token, 
    UserId,
    branch_id,
    venue_id,
    guests,
    booking_code,
    services,
    booking_price,
    service_price,
    total_price,
    date_time,
    check_in,
    check_out,
    promo_code_id,
    promo_discount,
    booking_discount,
    service_discount
    ) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('branch_id', branch_id);
    formData.append('venue_id', venue_id);
    formData.append('guests', guests);
    formData.append('booking_code', booking_code);
    formData.append('booking_price', booking_price);
    formData.append('service_price', service_price);
    formData.append('total_price', total_price);
    formData.append('date_time', date_time);
    formData.append('check_in', check_in);
    formData.append('check_out', check_out);
    if(services){
        services.forEach(service => {
            formData.append('service[]', service.value);
        });
    }
    if(promo_code_id){
        formData.append('promo_code_id', promo_code_id);
        formData.append('promo_discount', promo_discount);
    }
    if(booking_discount){
        formData.append('booking_discount', booking_discount);
        formData.append('service_discount', service_discount);
    }

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/confirm-booking?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const getCancelReasonsList = async (token, UserId, source) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/cancel_reasons?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        cancelToken: source.token
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const cancelBookingReason = async (token, UserId, booking_id, reasons_id, answer) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('booking_id', booking_id);
    formData.append('cancel_reasons_id', reasons_id);
    formData.append('answer', answer);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/booking_cancel_reasons?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const cancelBooking = async (token, UserId, reservationId) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('reservation_id', reservationId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/cancel-booking?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const rateBooking = async (token, userId, booking_id, venueId, rate, message) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('reservation_id', booking_id);
    formData.append('venue_id', venueId);
    formData.append('rating', rate);
    formData.append('message', message);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/booking_rates?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const requestBooking = async (token, userId, branch_id, venueId, bookingDate, companyName, activities, comments) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('branch_id', branch_id);
    formData.append('venue_id', venueId);
    formData.append('booking_date', bookingDate);
    formData.append('company_name', companyName);
    formData.append('activities', activities);
    formData.append('comments', comments);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/request-booking?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const rescheduleBooking = async (token, userId, booking_id, venueId, date_time, check_in, check_out) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('booking_id', booking_id);
    formData.append('venue_id', venueId);
    formData.append('date_time', date_time);
    formData.append('check_in', check_in);
    formData.append('check_out', check_out);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/reschedule-booking?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const extendBooking = async (token, booking_id, extend_time) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('booking_id', booking_id);
    formData.append('extend_time', extend_time);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/extend-booking?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};