import React from 'react';
import Paragraph from '../../UI/Paragraph';

const ServicesList = ({id, title, image,description}) => {
    return (
        <>
            <div className="features">
                <img
                    src={image} 
                    className=" services-icons mb-0 mb-xl-3 mb-md-3" 
                    alt={title}/>
                <Paragraph className="bold-head mt-3">{title}</Paragraph>
                <Paragraph className="text-content  mt-4">{description}</Paragraph>
            </div>
        </>
    );
};

export default ServicesList;
