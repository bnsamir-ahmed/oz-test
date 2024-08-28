import React, {useEffect, useState} from 'react';
import axios from "axios";

const MemberTests = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://modest-banzai.78-141-219-156.plesk.page//api/list_membership_types?access_token=a8080accbc855ea5f02a5a64882e7053c15669cde8e239e312fbc29d7776a949a4630a4549159069e1ab840a08f6e72d3baf13622bef60ad',
            ); // Replace with your actual API endpoint

            // Assuming the API response data is stored in response.data
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div>

        </div>
    );
};

export default MemberTests;
