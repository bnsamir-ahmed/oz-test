import React from 'react';

const IndividualHeaderList = ({id, title,head,text}) => {
    return (
        <>
            <div className="slide position-relative">
                <div className=" ">
                    <div className="head-content position-absolute">
                        <h1 className="hand-write">{title}</h1>
                        <h2 className="large-head mb-4">{head}</h2>
                        <p className="text-content">{text}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndividualHeaderList;