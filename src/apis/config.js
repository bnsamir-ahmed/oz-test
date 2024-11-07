import axios from "axios";
import FormData from 'form-data';



export const config = async(page_name)=>{
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/config?page=${page_name}`
    };
    const response = await axios(config)
    return response.data.data;
}

export const getBranches = async (token)=>{
    
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);

    const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/api/list_branches?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
    return response.data.data;
};

export const getBranchById = async (token, id)=>{
    
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('id', id);

    const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/api/get_branches?access_token=${token}&skip=true`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
    return response.data.data;
};

export const getSiteLocations = async (signal)=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/locations`,
        signal: signal
    };

    const response = await axios(config);
    return response.data.data;
};

export const getHouseDetails = async (id, signal)=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/locations/${id}`,
        signal: signal
    };

    const response = await axios(config);
    return response.data.data;
};

export const getIssuesCaseStudies = async (source)=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/case_types`,
        cancelToken: source.token
    };

    const response = await axios(config);
    return response.data.data;
};

export const getTicketCategories = async (source)=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/ticket_categories`,
        cancelToken: source.token
    };

    const response = await axios(config);
    return response.data.data;
};

export const getSubCategories = async (source, id)=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/ticket_categories/${id}/sub_categories`,
        cancelToken: source.token
    };

    const response = await axios(config);
    return response.data.data;
};

export const getVenuesById = async (source, id)=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/venues/${id}`,
        cancelToken: source.token
    };

    const response = await axios(config);
    return response.data.data;
};

export const createIssue = async (userId, 
    case_type_id,
    ticket_category_id,
    ticket_sub_category_id,
    venue_id,
    branch_id,
    description,
    location,
    amenity_id)=>{

    const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/tickets`,
        data: {
            "user_id": userId,
            "case_type_id": case_type_id,
            "ticket_category_id": ticket_category_id, 
            "ticket_sub_category_id": ticket_sub_category_id,
            "venue_id": venue_id,
            "branch_id": branch_id,
            "description": description,
            "location": location,
            "amenity_id": amenity_id
        }
    };

    const response = await axios(config);
    return response.data.data;
};

export const getAmenities = async ()=>{

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/oz_benefits`,
    };

    const response = await axios(config);
    return response.data.data;
};

export const applyPromoCode = async (token, code)=>{

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('code', code);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/apply-promo?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
    return response.data.data;
};

export const getInovice = async (token, id, type)=>{

    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    formData.append('id', id);
    formData.append('type', type);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/transactions?access_token=${token}`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };

    const response = await axios(config);
    return response.data.data;
};

export const getGalleryData = async () => {

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/gallery`
    };

    const response = await axios(config);
    return response.data.data;
};

export const getPrivateEvent = async (token) =>{
    
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/private_event_items?access_token=${token}`,
    };

    const response = await axios(config);
    return response.data.data;
}

export const getNewsLetter = async (email) => {

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/news_letter/subscribe`,
        data: {
            "email": email
        }
    };

    const response = await axios(config);
    return response.data;
}


export const payMent = async ({invoiceid , amount, firstname , lastname , email , address1 , address2 , city , state , postcode , country , phonenumber  }) => {
    const formData = new FormData();
    formData.append('invoiceid' , invoiceid);
    formData.append('amount' , amount);
    formData.append('firstname' , firstname);
    formData.append('lastname' , lastname);
    formData.append('email' , email);
    formData.append('address1' , address1);
    formData.append('address2' , address2); 
    formData.append('city' , city);
    formData.append('state' , state);
    formData.append('postcode' , postcode);
    formData.append('country' , country);
    formData.append('phonenumber' , phonenumber);

    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/payment.php`,
        data: formData,
        credentials: 'include' ,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        
        
    };
    

    const response = await axios(config);
    return response.data;
}

// export const ozy = async ( ) => {
//     const config = {
//         method: 'get',
//         url: `https://dashboard.ozcoworkingpark.com/api/ozies`,
//         headers: {
//             'Accept': 'application/json',
//         },
//     }
   
//         const response = await axios.get(config);
//         return response.data.data
// }
export const ozy = async () => {
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/ozies`,
        headers: {
            'Accept': 'application/json',
        },
    };

    const response = await axios(config); // Use axios with the config object correctly
    return response.data.data;
   
};


   export const fetchOzies = async () =>{
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/config?page=ozy`,
        headers: {
            'Accept': 'application/json',
        },
    };
    const response = await axios(config);
    return response.data.data;
   }

   export const fetchTerms = async () =>{
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_CONFIG_URL}/api/settings`,
        headers: {
            'Accept': 'application/json',
        },
    };
    const response = await axios(config);
    
    return response.data.data;
   }
 