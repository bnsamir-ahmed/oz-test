import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import vectorRight from '../../../assets/images/VectorRight.png';
import './Membership.css';
import Slider from "react-slick";
import {individualHeaderss} from "../../../Data/IndividualHeadersData";
import MembershipOptionsHeaderList from "./MembershipOptionsHeaderList";
import Media from "../../Media/Media";

const MembershipOptionsHeader = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true,
    }
    return (
        <>
            <section className="become-member-slider">
                <Container fluid>
                    <Row>
                        <Col lg={12} className="p-0 ">
                            <Slider {...settings} className="bg-sliderImage background-cover">
                                {individualHeaderss.map((individualHeader, index) => {
                                    const {id, title, head, text} = individualHeader;
                                    return (
                                        <MembershipOptionsHeaderList id={id} head={head} text={text} title={title}/>
                                    )
                                })}
                            </Slider>
                            <div className="d-flex justify-content-end position-relative shape-right">
                                <Media
                                    type="img" src={vectorRight} className="position-absolute" alt="shape"/>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

        </>
    );
};

export default MembershipOptionsHeader;
