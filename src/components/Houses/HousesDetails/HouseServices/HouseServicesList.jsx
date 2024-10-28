import React from 'react';
import './HouseServices.css'

const HouseServicesList = ({id, title, text, img}) => {
    return (
        <>
            <div className="features" key={id}>
                {/* <div className="d-flex align-items-center"> */}
                <img
                    src={img} 
                    className=""
                    alt={title}/>
                <h2 className="bold-head fs-20">{title}</h2>
                {/* </div> */}
                <p className="text-content text-left ">{text}</p>
            </div>
        </>
    );
};

export default HouseServicesList;
