import React from 'react';
import Media from "../../Media/Media";
import Buttons from "../../Buttons/Buttons";

const IndividualTypesList = ({id, name, img}) => {
    return (
        <>
            <div className="card" key={id}>
                <Media
                    type="img" src={img} className="card-img-top" alt={name}/>
                <div className="card-body">
                    <h5 className="card-title my-3">{name}</h5>
                    <Buttons href="/joinus" className="button-one-outline p-0 my-3">Get Started</Buttons>
                </div>
            </div>
        </>
    );
};

export default IndividualTypesList;
