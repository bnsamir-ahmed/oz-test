import React from 'react';
import Button from "../UI/Button";

const HousesLocationsList = ({ id, address, title, main_image }) => {
    return (
        <div className="box-office">
            <div className="location-contact pt-3">
                <h2 className="h2-text-box">{title}</h2>
            </div>
            <div className="d-lg-flex mb-4 justify-content-between align-items-center d-sm-block">
                <span className="government">{address}</span>
                <div className="btn-explore">
                    <Button
                        tagType='link'
                        className="btn button-outLine btn-bg-white"
                        to={`/houses/${id}`}
                    >Explore</Button>
                </div>
            </div>
            <img
                src={main_image}
                alt={title}
                className="w-100 img-fit"
                height='512px'
            />
        </div>
    );
};

export default HousesLocationsList;
