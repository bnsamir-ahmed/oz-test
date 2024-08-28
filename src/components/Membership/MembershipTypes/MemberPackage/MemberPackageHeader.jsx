import React from 'react';

const MemberPackageHeader = ({typeName, optionImage, optionType, optionDescription}) => {
    return (
        <>
            <div className="box news-header">
                <div className="group-wrapper">
                    <div className="group">
                        <div className="overlap-group">
                            <div className="rectangle-wrapper">
                                <div className="rectangle"/>
                            </div>
                            <img
                                className="img"
                                alt="Group"
                                src={optionImage}
                                // autoPlay
                                // muted
                                // loop
                            />
                            <div className="group-2">
                                <h1 className="an-innovative-co position-relative">
                                    <span className="text-wrapper head-co">{typeName}</span>
                                    <span className="text-wrapper-2">{optionType}</span>
                                </h1>
                                <p className="p">
                                    {optionDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MemberPackageHeader;
