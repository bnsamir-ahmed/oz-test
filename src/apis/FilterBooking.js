
import axios from 'axios';
import FormData from 'form-data';

export const getWings = async (token, signal) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list_wings?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getFloors = async (token, signal) => {
    
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list_floors?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getFacilities = async (token, signal) => {
    
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list_facilities?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const searchVenues = async (token, UserId, amenitie_id, searchText, signal) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('amenitie_group_id', amenitie_id);
    formData.append('text', searchText);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/venue-search?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getFilters = async (token, UserId, branch_id, amenitie_group_id, date, capacity, facilities, only_favorites, signal) => {
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', UserId);
    formData.append('branch_id', branch_id);
    formData.append('amenitie_group_id', amenitie_group_id);
    formData.append('date', date);
    formData.append('capacity', capacity);
    formData.append('facilities[]', facilities);


    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/filter?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};
