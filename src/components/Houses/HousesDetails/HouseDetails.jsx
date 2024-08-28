import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import LocationsList from "../../Locations/LocationsList";
import './HouseDetails.css';
import mapPoint from "../../../assets/images/icons/mapPoint.svg";
import HouseServices from "./HouseServices/HouseServices";
import CommunityHouses from "./HousesCommunityEvents/CommunityHouses";
import { Container, Nav } from "react-bootstrap";
import { getHouseDetails } from '../../../apis/config';
import { Skeleton } from "antd";

const HouseDetails = () => {
    const { id } = useParams();

    const { isPending, error, data: houseDetails } = useQuery({
        queryKey: ["site-location-details", id],
        queryFn: ({ signal }) => getHouseDetails(id, signal),
    });

    const settings = {
        dots: true,
        speed: 300,
        slidesToShow: 1,
        cssEase: "linear",
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true
    };

    const navLinkSettings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="navigator houses">
                <Container fluid>
                    <div className='row d-flex align-items-center justify-content-between'>
                        <div className="col-md-5 col-12 d-flex align-items-center justify-content-center justify-content-md-start">
                            <h1 className="title-name mb-0 px-4">
                                {houseDetails?.title}
                            </h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2"
                                height="127"
                                viewBox="0 0 2 127"
                                fill="none"
                                className="d-md-block d-none"
                            >
                                <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5" />
                            </svg>

                        </div>
                        <div className="col-md-7 col-12 my-3">
                            <div className="conatiner navSlider">
                                <Slider {...navLinkSettings}>
                                    <div className="d-flex justify-content-center">
                                        <NavLink className="nav-link-two links-margin" onClick={() => {
                                            window.location.href = '#community-events';
                                        }}>
                                            Community Events
                                        </NavLink>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <NavLink className="nav-link-two links-margin"
                                            onClick={() => {
                                                window.location.href = '#f-b';
                                            }}
                                            smooth={true}
                                            smoothScrollTimeout={1000}
                                        >
                                            F&B
                                        </NavLink>

                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <NavLink className="nav-link-two links-margin"
                                            onClick={() => {
                                                window.location.href = '#amenities';
                                            }
                                            }
                                        >
                                            Amenities
                                        </NavLink>

                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <NavLink className="nav-link-two btn button-outLine btn-bg-white"
                                            to="/contactus"
                                        >
                                            inquire
                                        </NavLink>

                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <section className=" locations house-details ">
                <div className="container-fluid">

                    <div className="row border-of-section ">
                        <div className="col-lg-4 col-md-4 col-12 m-auto ">
                            <div className="box-content p-sm-4 p-2">
                                {isPending ? (
                                    <Skeleton paragraph={{ rows: 1 }} active title={true} />
                                )
                                    : (
                                        <>
                                            <h2 className="h2-text-box">{houseDetails?.address}</h2>
                                            <p className="p-text-box">
                                                {houseDetails?.description}
                                            </p>
                                        </>
                                    )}

                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12 border-left">
                            {isPending ?
                                ((<Skeleton.Image active className="image-box w-100" />)
                                )
                                : (
                                    <Slider {...settings}>
                                        {houseDetails?.images && houseDetails?.images.map((house) => {
                                            const { id, path } = house;
                                            return (
                                                <div key={id}>
                                                    <LocationsList id={id} img={path} addAddress={false} />
                                                </div>
                                            )
                                        })}
                                    </Slider>
                                )}

                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
                    </div>
                </div>
            </section>

            <CommunityHouses
                description={houseDetails?.community_event_description}
                event_images={houseDetails?.community_event_images}
                isPending={isPending}
            />


            <section id="f-b" className="fab ">
                <div className="container-fluid">
                    <div className="row border-of-section ">
                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-6 m-auto ">
                            <div className="box-content p-sm-4 p-2">
                                <h2 className="h2-text-box">
                                    F&B
                                </h2>
                                {isPending ? (
                                    <Skeleton paragraph={{ rows: 0 }} active />
                                ) :
                                    (<p className="p-text-box">
                                        {houseDetails?.fb_description}
                                    </p>)}


                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-6 border-left img_block">
                            {isPending ? (
                                <Skeleton.Image
                                    className="image-box w-100"
                                    active
                                />
                            )
                                : (
                                    <img
                                        className="image-box w-100"
                                        src={houseDetails?.fb_image}
                                        alt="f&b"
                                    />
                                )}

                        </div>

                    </div>
                </div>
            </section>

            <HouseServices location_amenities={houseDetails?.location_amenities} isPending={isPending} />

            <section className="next-compound">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-12 text-center">
                            <a className="h4-text" href={`https://www.google.com/maps/dir/${houseDetails?.address}`} target='_blank'>
                                <img src={mapPoint} className="mx-3 map-point"
                                    style={{ width: "24px", height: "24px" }}
                                    alt="map" />
                                {houseDetails?.title} - {houseDetails?.address}
                            </a>

                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default HouseDetails;
