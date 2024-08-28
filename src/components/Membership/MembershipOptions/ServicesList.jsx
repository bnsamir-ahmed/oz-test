import React from 'react';
import Media from "../../Media/Media";

const ServicesList = ({id, title, logo, how_many_hours}) => {
    return (

        <div className="col-lg-4 col-md-6 col-sm-12 my-5">

            <div className="features" key={id}>
                <Media
                    type="img" src={logo} className="mb-3" alt={title}/>
                <h2 className="bold-head mt-3">{title}</h2>
                {/*<p className="text-content text-left mt-4">{text}</p>*/}
            </div>
        </div>
    );
};

export default ServicesList;
