import React, {useEffect, useState} from 'react';
import {memberTypes} from "../../Data/MemberTypesData";
import MembershipTypesList from "../Membership/MembershipTypes/MembershipTypesList";

const TestApi = () => {

    const [data, setUserData] = useState([]);

    useEffect(() => {
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('server_key', 'c04919f13f43b612fff3b76c5d08b2d6');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://modest-banzai.78-141-219-156.plesk.page/api/get-site-settings',
            // headers: {
            //     ...data.getHeaders()
            // },
            data: data
        };

        axios(config)
            .then(function (response) {
                setUserData(response.data);
                console.log(JSON.stringify(response.data));
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    // const hello = () => {
    //     data.map((user, index) => {
    //         return(
    //             <div key={index}>
    //                 <h1>{user.data.config}</h1>
    //             </div>
    //         )
    //     })
    //     console.log(hello())
    // }
    return (
        <div>
            {/*<ul>*/}
            {/*{Object.keys(data).map((key, index, )=>*/}
            {/*    <div>*/}
            {/*            <li key={index}>*/}
            {/*                <h2 style={{"color":'red'}}>{data.data.config.pro_packages[1].type}</h2>*/}
            {/*                <h2  style={{"color":'blue'}}> {data.data.config.pro_packages[2].type}</h2>*/}
            {/*                <h2  style={{"color":'orange'}}>{data.data.config.pro_packages[3].type}</h2>*/}
            {/*                <h2  style={{"color":'black'}}>{data.data.config.pro_packages[4].type}</h2>*/}
            {/*            </li>*/}
            {/*        /!*<h1>{key}</h1>*!/*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*</ul>*/}


            {memberTypes.map((memberType, index) => {
                const {id, name, img, link} = memberType;
                return (
                    <div key={index}>
                        <MembershipTypesList id={id} name={name} img={img} link={link}/>
                    </div>
                )
            })}
        </div>
    );
};
export default TestApi;


// List Membership types API
// let axios = require('axios');
// let FormData = require('form-data');
// let data = new FormData();
// data.append('server_key', 'c04919f13f43b612fff3b76c5d08b2d6');
//
// let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://modest-banzai.78-141-219-156.plesk.page/api/list_membership_types?access_token=10b8d16368bdf5888ad890c73536ac25e00004c2e742813a131a99c13ae81d6bc257b2a935584948bdc8b08ca966b6626e1f186f03c9a060',
//     // headers: {
//     //     ...data.getHeaders()
//     // },
//     data : data
// };

// const GetMembershipTypes = () => {
//
//     axios(config)
//         .then(function (response) {
//             setListMembershipsTypes(response.data.data);
//             console.log(JSON.stringify(response.data));
//             console.log(response.data.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//
// };
// useEffect(()=>{
//     GetMembershipTypes();
// },[])
// useEffect(()=>{
//
//     const fetchData = async () => {
//         const result = await getListMembershipTypes();
//         setListMembershipsTypes(result);
//         console.log(result);
//     };
//     fetchData();
// },[]);
