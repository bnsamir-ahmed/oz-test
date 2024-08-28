import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import vectorRight from "../../../assets/images/VectorRight.png";
import work from "../../../assets/images/workingSpace.png";
import './MembershipTypes.css';
import '../MembershipOptions/MebershipOptions.css';
import Slider from "react-slick";
import {memberTypes} from "../../../Data/MemberTypesData";
import MembershipTypesList from "./MembershipTypesList";
import MembershipCompared from "../MembershipsCompared/MembershipCompared";
import Media from "../../Media/Media";

const MemberDetails = () => {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        adaptiveHeight: true,


        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]

    };

    return (
        <>
            {/*<!--Start Become a member-->*/}
            <section className="become-member-slider">
                <Container fluid>
                    <Row>
                        <Col lg={12} className="p-0 ">
                            <div className="slide position-relative ">
                                <div className="header-member-details ">
                                    <Media
                                        type="img" src={work} alt="test" className='background-cover-api w-100 '/>
                                    <div className="head-content position-absolute">
                                        <h1 className="hand-write">Individual</h1>
                                        <h2 className="large-head mb-4">The Social</h2>
                                        <p className="text-content">Lorem ipsum dolor sit amet, consectetuerLorem ipsum
                                            dolor sit amet, consectetuerLorem ipsum dolor sit amet, consectetuerLorem
                                            ipsum dolor sit
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="description_membership">
                                <h2 className="">Description Membership</h2>
                                <p>Lorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet,
                                    consectetuerLorem ipsum dolor sit amet,consectetuerLorem ipsum dolor sit Lorem
                                    ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet,</p>
                            </div>
                            <div className="d-flex justify-content-end position-relative ">
                                <Media
                                    type="img" src={vectorRight} className="position-absolute" alt="shape"
                                    style={{bottom: "30px", width: "100px"}}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="membership-types mb-3">
                <Container fluid>
                    <Row>
                        <div className="col-lg-12 border-bottom border-top">
                            <div className="head-content-sec">
                                <h2 className="h2-text">Days of Access</h2>
                            </div>
                        </div>
                        <Col lg={12}>
                            <Slider {...settings}>
                                {memberTypes.map((listMembershipType, index) => {
                                    const {id, name, logo, link, description, img} = listMembershipType;
                                    return (
                                        <div key={index}>
                                            <MembershipTypesList
                                                id={id}
                                                name={name}
                                                logo={logo}
                                                link={link}
                                                description={description}
                                                img={img}
                                            />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>

            <MembershipCompared/>

            <section className="membership-types mb-3">
                <Container fluid>
                    <Row>
                        <div className="col-lg-12 border-bottom border-top">
                            <div className="head-content-sec">
                                <h2 className="h2-text">OtherTypes</h2>
                            </div>
                        </div>
                        <Col lg={12}>
                            <h2 className="h2-text-bold">Other Membership individual</h2>
                            <Slider {...settings}>
                                {memberTypes.map((listMembershipType, index) => {
                                    const {id, name, logo, link, description, img} = listMembershipType;
                                    return (
                                        <div key={index}>
                                            <MembershipTypesList
                                                id={id}
                                                name={name}
                                                logo={logo}
                                                link={link}
                                                description={description}
                                                img={img}
                                            />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    );
};

export default MemberDetails;
