import React from 'react';
import {Container, Row} from 'react-bootstrap';
import MembershipTypesSlider from "./MembershipTypesSlider";
import MembershipTypesSliderCorporate from './MembershipTypesSliderCorporate';
import './MembershipTypes.css';

const MembershipTypes = (props) => {
    return (
        <>
            <section className={`membership-types ${props.className}`}>
                <Container fluid>
                    <Row>
                        <div className="col-lg-12 border-bottom ">
                            <div className="head-content-sec text-center">
                                <h2 className="h2-text">For {props.title}</h2>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <h2 className="h2-text-bold">{props.subTitle}</h2>
                            {(props.title && props.title === 'individual') && <MembershipTypesSlider />}
                            {(props.title && props.title === 'Corporate') && <MembershipTypesSliderCorporate />}
                        </div>
                    </Row>

                </Container>
            </section>
            
        </>
    );
};

export default MembershipTypes;
