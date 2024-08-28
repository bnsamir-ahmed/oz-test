import React, {useEffect, useState} from 'react';
import data from "bootstrap/js/src/dom/data";
import {memberTypes} from "../../../Data/MemberTypesData";
import MembershipTypesList from "../../Membership/MembershipTypes/MembershipTypesList";
import {tests, testsTypes} from "../../../Data/TestData";

const MemberApi = () => {
    const [config, setConfig] = useState(null);


    let formdata = new FormData();
    formdata.append("server_key", "c04919f13f43b612fff3b76c5d08b2d6");

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    // const fetchNameData = () => {
    //
    //     fetch("https://modest-banzai.78-141-219-156.plesk.page/api/get-site-settings", requestOptions)
    //
    //         .then(
    //             response => response.json()
    //         )
    //         .then(data => {
    //                 setConfig(data.data.config);
    //
    //             console.log(data.data.config.pro_packages['1'].id);
    //             console.log(data.data.config.bank_transfer_note);
    //             console.log(data)
    //
    //             }
    //
    //
    //         )
    //         .catch(error => console.log('error', error));
    //
    // }

    useEffect(() => {
        // fetchNameData()
        fetch("https://modest-banzai.78-141-219-156.plesk.page/api/get-site-settings", requestOptions)

            .then(
                response => response.json()
            )
            .then(data => {
                    setConfig(data.data.config);

                    console.log(data.data.config.pro_packages['1'].id);
                    console.log(data.data.config.bank_transfer_note);
                    console.log(data);

                }


            )
            .catch(error => console.log('error', error));

    }, []);

    if (!config) {
        return <div>Loading...</div>;
    }


    return (
        // <div>
        //
        //
        //     {users.length > 0 && (
        //         <ul>
        //             {users.map((test, index) => {
        //                 return(
        //                     <div key={index}>
        //                         <li>
        //                             {test.data.config.pro_packages['1'].id}
        //                         </li>
        //
        //
        //                     </div>
        //                 )
        //             })}
        //         </ul>
        //     )}
        // </div>
// <div>
//         {testsTypes.map((test, index) => {
//                 // const {id, name, img, link} = test;
//                 return(
//                     <div key={index}>
//                         <h1>{test.data.config.pro_packages.id}</h1>
//                     </div>
//                 )
//             })}
// </div>

        <div>
            <h1>{config.siteTitle}</h1>
            <p>{config.siteName}</p>
            <p>{config.siteEmail}</p>
            <ul>
                {/*To map on object in object*/}
                {Object.values(config.pro_packages).map(packages => (
                    <li key={packages.id}>
                        <h2>{packages.type}:</h2>
                        <h2>  {packages.price}</h2>
                        <h2>{packages.discount}</h2>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default MemberApi;
