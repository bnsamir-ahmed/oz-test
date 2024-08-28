import {useState, useEffect} from 'react';
import './Partners.css';
import Slider from "react-slick";
import Media from "../Media/Media";
import axios from "axios";

const Partners = () => {
    const [partners, setpartners] = useState([]);
    const [response, setResponse] = useState('');
    useEffect(()=>{
        const getPartners = async ()=>{
            try{
                const config = {
                    method: 'get',
                    url: `${process.env.REACT_APP_API_CONFIG_URL}/api/partners`
                };
                const response = await axios(config);
                setpartners(response.data.data);
            }catch(error){
                setResponse(error.response.data.message)
            }
        }
        getPartners();
    },[]);
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        cssEase: "linear",
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }
    return (
        <>
            <section className="partners p-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-content">
                                <h3 className="h3-text">Over 100+ Growing With Us</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: "40px"}}>
                        <Slider {...settings}>
                            {partners.length !== 0 && partners.map((partner, index) => {
                                const {id, name, image} = partner;
                                    return (
                                        <div className="col-lg-3 d-flex justify-content-center align-items-center border-right" key={index}>
                                            <Media
                                                type="img" 
                                                src={image} 
                                                alt={name} 
                                                className="d-flex m-auto"/>
                                        </div>
                                    )
                            })}
                        </Slider>
                        {partners.length === 0 && <p className=''>theres is no partners yet!!</p>}
                        {response !== '' && <p className={`mt-2 mb-0`}>{response}</p>}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Partners;
