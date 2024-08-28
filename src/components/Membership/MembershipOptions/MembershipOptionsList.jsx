import React from 'react';
import {Link} from "react-router-dom";
import Media from "../../Media/Media";
import './MebershipOptions.css'

const MembershipOptionsList = ({id, image, name, logo, type, price}) => {
    return (
        <div className="MembershipOptionsList">
            <>
                <div className="card" key={id}>
                    <Media
                        type="img" src={logo} className="card-img-top" alt={type}/>
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        {/*<h3> {price}$</h3>*/}
                        <Link to={`/singleMember/${id}`} name={name}
                              className="btn button-outLine btn-bg-white ">Get Started</Link>
                    </div>
                </div>
            </>
        </div>
    );
};

export default MembershipOptionsList;
