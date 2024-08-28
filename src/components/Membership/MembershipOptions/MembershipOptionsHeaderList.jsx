import React from 'react';

const MembershipOptionsHeaderList = ({image, name, type, description, typeDescription}) => {


    return (
        <>
            <div className="slide position-relative ">
                <div className=" ">
                    <img src={image} alt={name} className='background-cover-api w-100'/>
                    <div className="head-content position-absolute">
                        <h1 className="hand-write">{'Individual'}</h1>
                        <h2 className="large-head mb-4">{'The Social'}</h2>
                        <p className="text-content">{'Welcome to our vibrant community, where social, outgoing, and communicative individuals thrive!'}</p>
                    </div>
                </div>
            </div>


        </>

    );
};

export default MembershipOptionsHeaderList;
