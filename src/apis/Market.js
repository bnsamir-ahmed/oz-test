import axios from 'axios';
import FormData from 'form-data';

export const getPostCost = async (token, signal) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/marketplace-cost?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getServices = async (token, userId, branchId, signal) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('branch_id', branchId);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/product-categories?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getProductsList = async (token, userId, branchId, signal) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('branch_id', branchId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/list-products?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        signal: signal
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const filterProducts = async (token, 
    userId, 
    search_text, 
    service_type_id,
    price_from,
    price_to, 
    branchId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('search_text', search_text);
    formData.append('branch_id', branchId);
    formData.append('service_type_id', service_type_id);
    formData.append('price_from', price_from);
    formData.append('price_to', price_to);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/product-search?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const createProject = async (token, 
    userId,
    branch_id,
    product_category,
    product_title,
    product_description,
    product_price,
    image,
    portfolio_link,
    contact_type,
    period,
    tags) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('branch_id', branch_id);
    formData.append('product_category', product_category);
    formData.append('product_title', product_title);
    formData.append('product_description', product_description);
    formData.append('product_price', product_price);
    formData.append('image', image);
    formData.append('portfolio_link', portfolio_link);
    formData.append('contact_type', contact_type);
    formData.append('period', period);
    formData.append('tags', tags);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/oz-create-product?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const getClientMessages = async (token, pageId, recipientId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', 'fetch');
    formData.append('page_id', pageId);
    formData.append('recipient_id', recipientId);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/page_chat?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getChatList = async (token, productId) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', 'get_list');
    formData.append('page_id', productId);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/page_chat?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const blockUser = async (token, action, user_id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('block_action', action);
    formData.append('user_id', user_id)
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/block-user?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const reportUser = async (token, user_id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user', user_id)
    formData.append('text', 'report');
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/report_user?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data;
};

export const likeProduct = async (token, userId, product_id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('user_id', userId);
    formData.append('product_id', product_id);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/like-product?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const sendMessage = async (token, product_id, recipient_id, message, message_hash_id) => {

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('type', 'send');
    formData.append('page_id', product_id);
    formData.append('recipient_id', recipient_id);
    formData.append('text', message);
    formData.append('message_hash_id', message_hash_id);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/page_chat?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getChatHistory = async (userId) => {
    
    const config = {
        method: 'GET',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/tickets?user_id=${userId}`,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};

export const getChatHistoryDetails = async (issueId, userId) => {
    
    const config = {
        method: 'GET',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/tickets/${issueId}?user_id=${userId}`,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
        
    return response.data.data;
};