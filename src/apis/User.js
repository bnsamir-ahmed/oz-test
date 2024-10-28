import axios from 'axios';
import FormData from 'form-data';

const branchIdOZ = localStorage.getItem('branchIdOZ');

export const getUserInfo = async (token, UserId, signal) => {
        
        const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
        formData.append('fetch', 'user_data');
        formData.append('user_id', UserId);

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/get-user-data?access_token=${token}`,
            data: formData,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            signal: signal
        };

    const response = await axios(config);
        
    return response.data.data;
};

export const getInterests = async (token) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list_interest?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getHobbies = async (token) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list_hobbies?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const updateUserInfo = async ({
    avatar,
    gender,
    birthday,
    nationality,
    jobTitle,
    industry,
    city,
    companyName,
    howDidYouKnowUs,
    serviceProvide,
    about,
    hobbies,
    interest
    }) => {
    const token = localStorage.getItem('TokenOZ');
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('about', about);
    formData.append('working', companyName);
    formData.append('custom[][fid_5]', jobTitle);
    formData.append('custom[][fid_6]', industry);
    formData.append('custom[][fid_7]', city);
    formData.append('custom[][fid_8]', nationality);
    formData.append('custom[][fid_9]', serviceProvide);
    formData.append('custom[][fid_10]', howDidYouKnowUs);
    formData.append('custom[][fid_11]', hobbies);
    formData.append('custom[][fid_12]', interest);
    formData.append('avatar', avatar);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/update-user-data?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

const response = await axios(config);
    
return response.data.data;
};

export const RequestUpdateUserInfo = async (key, old_value, new_value, otp) => {

    const token = localStorage.getItem('TokenOZ');
    const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY)
        formData.append('key', key);
        formData.append('old_value', old_value);
        formData.append('new_value', new_value);
        if(otp){
            formData.append('otp', otp);
        }

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/request_profile_change?access_token=${token}`,
        data: formData
    };
    const response = await axios(config);
    return response.data.data;
};

export const changePassword = async (email, password, new_password)=>{
    const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY)
        formData.append('phone_or_email', email);
        formData.append('password', password);
        formData.append('new_password', new_password);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/change_password`,
        data: formData
    };
    const response = await axios(config);
    return response.data.data;
};

export const getFavoriates = async (token, type, branchId) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', type);
    formData.append('branch_id', branchId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/favorites?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getMyPlans = async (token, UserId, signal) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/my_plans?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getSingleItemById = async (token, type, id, source) => {
    
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', type);
    formData.append('id', id);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/get-by-id?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        cancelToken: source.token,

    };

    const response = await axios(config);
        
    return response.data.data;
};

export const ContactUs = async (userId, subject, message) => {
        
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/contact_us`,
        data: {
            "user_id": userId,
            "subject": subject,
            "message": message
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const getNotificationList = async (token, type ) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', type);


    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list_notifications?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};
export const getNotifications = async (token ) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
   


    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/notifications?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};
export const getCount = async (token  , id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('notification_id', id);


    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/notification_seen?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const addExtraBundle = async (token, membership_id) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('membership_id', membership_id);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/subscribe_business_bundle?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const upgradePlan = async (token, type, price, days, promo_code_id, promo_discount) => {
        
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', type);
    formData.append('price', price);
    
    if(days){
        formData.append('days', days);
    }

    if(promo_code_id){
        formData.append('promo_code_id', promo_code_id);
        formData.append('promo_discount', promo_discount);
    }
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/upgrade?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getContactAdminHistory = async ({signal, userId}) => {
        
    const config = {
        method: 'GET',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/contact_us?user_id=${userId}`,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};