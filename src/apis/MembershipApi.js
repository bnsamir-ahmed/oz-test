import axios from 'axios';
import FormData from 'form-data';

export const getListMembershipTypes = async (token, business_bundle) => {
        const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
        formData.append('business_bundle', business_bundle);

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/list_membership_types?access_token=${token}&skip=true`,
            data: formData,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };

        const response = await axios(config);
        
        return response.data.data;
};

export const getMembershipAmenities = async () => {
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/membership_amenities`
    };
    const response = await axios(config);
    return response.data.data;
}

export const getMembershipOptions = async (token, id) => {
        const formData = new FormData();
        formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
        formData.append('id', id);
        formData.append('direct', true);

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/get_membership_types?access_token=${token}&skip=true`,
            data: formData,
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        };

        const response = await axios(config);
        return response.data.data;
};

