import React from 'react';
import {Col, Figure} from "react-bootstrap";
import workingSpace from "../../../assets/images/workingSpace.png";
import {Link} from "react-router-dom";
import Media from "../../Media/Media";

const MembershipSingleOptionList = ({name, typeName, description, image, amenities}) => {
    return (
        <>
            <Col lg={7} sm={12} className="m-auto">
                <div className="head-content">
                    <h1 className="hand-write">{typeName} Option</h1>
                    <h2 className="large-head mb-4">{name}</h2>
                    <p className="text-content">{description}</p>
                    <h1>{amenities.title}</h1>
                    <Link to={`/joinus`} name={name} className="button-one-outline p-0 my-3">Apply</Link>

                </div>
            </Col>
            <Col lg={5} sm={12}>
                <Figure className="figure d-flex position-relative">
                    <Media
                        type="img" src={workingSpace} className="figure-img img-fluid" alt={name}/>
                </Figure>
            </Col>

        </>
    );
};

export default MembershipSingleOptionList;
