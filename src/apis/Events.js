import axios from 'axios';
import FormData from 'form-data';

export const getCommunityNewsFeed = async (viewPosts) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('event', viewPosts);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/community`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getNewFeedsPost = async (id, signal) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('post_id', id);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/community_view`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getEventsList = async (token, userId, branchId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    // formData.append('user_id', userId);
    // formData.append('branch_id', branchId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list-events?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const searchEvents = async (token, UserId, searchText) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('search_text', searchText);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/search-events?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getMyEventsList = async (token, UserId, branchId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('branch_id', branchId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list-my-events?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const checkEvent = async (token, userId, eventId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('event_id', eventId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/check-event?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const attendEvent = async (token, userId, eventId, promo_code_id, promo_discount) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('event_id', eventId);

    if(promo_code_id){
        formData.append('promo_code_id', promo_code_id);
        formData.append('promo_discount', promo_discount);
    }

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/event-attend?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const cancelEventAttend = async (token, userId, eventAttendId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('event_attend_id', eventAttendId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/cancel-event-attend?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const likeEvent = async (token, userId, event_id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('event_id', event_id);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/like-event?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};