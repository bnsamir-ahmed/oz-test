import { useEffect, useState } from 'react';
import axios from "axios";
import Media from "../../Media/Media";

const Amenities = ()=>{
    const [amenities, setamenities] = useState([]);
    useEffect(()=>{
        const getAmenities = async ()=>{
            try{
                const config = {
                    method: 'get',
                    url: `${process.env.REACT_APP_API_CONFIG_URL}/api/membership_amenities`
                };
                const response = await axios(config);
                console.log(response.data.data);
                setamenities(response.data.data);
            }catch(error){
                console.error(error);
            }
        }
        getAmenities();
    },[]);
    return (
        <section className="what-get p-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-amenities">
                                <h2 className="text-h2 pb-5">Our Amenities</h2>
                            </div>
                        </div>

                        {amenities.map((service, index) => {
                            const {title, image, description} = service;
                            return (
                                <div className="col-lg-6 col-md-6 col-sm-12 py-3 border-all" key={index}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-lg-flex d-md-flex d-sm-block align-items-center w-50">
                                            <Media
                                                type="img" src={image} alt={title}/>
                                                <h2 className="bold-head mt-3">{title}</h2>
                                        </div>
                                        <p className="text-content text-left mt-4">{description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
    )
}
export default Amenities;