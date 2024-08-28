import React from 'react';
import './GalleryHeader.css';
import { Skeleton } from "antd";

const GalleryHeader = ({configData, pending}) => {
    return (
        <>
        {console.log(configData)}
            <header className="galleryHeader">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="position-relative">
                            {pending ? (
                                <Skeleton active paragraph={{ rows: 2 }} />
                                ) : (
                                configData?.map((configItem, index) => (
                                    <React.Fragment key={index}>
                                        {configItem.key === "gallery_header_photo_1" && (
                                            <>
                                            <img src={configItem.value} alt='gallery_header_photo' width='100%' height={'830px'} style={{
                                                objectFit: 'cover'
                                            }}/>
                                                <div className="text-gallery">
                                                    <span>Community</span>
                                                    <h2>gallery</h2>
                                                </div>
                                            </>

                                        )}
                                    </React.Fragment>
                                ))
                                )}
                            </div>

                        </div>
                        <div className="col-lg-6 text-center position-relative second_gallery">
                            {pending ? (
                                <Skeleton active paragraph={{ rows: 3 }} />
                                ) : (
                                configData.map((configItem, index) => (
                                    <React.Fragment key={index}>
                                    {configItem.key === "gallery_header_photo_2" && (
                                            <img src={configItem.value} alt='gallery_header_photo' className="gallery_photo gallery_photo_1"/>
                                    )}
                                     {configItem.key === "gallery_header_photo_3" && (
                                            <img src={configItem.value} alt='gallery_header_photo' className="gallery_photo gallery_photo_2"/>
                                    )}
                                    {configItem.key === "gallery_header_photo_4" && (
                                            <img src={configItem.value} alt='gallery_header_photo' className="gallery_photo gallery_photo_3"/>
                                    )}
                                    </React.Fragment>
                                ))
                            )}
                            {/* <Media
                                type="img" src={galleryHeadertwo}/> */}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default GalleryHeader;
