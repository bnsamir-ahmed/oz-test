import React from 'react';
import Paragraph from '../UI/Paragraph';
import Media from '../Media/Media';
import { Tab } from "react-bootstrap";

const OzysList = ({ title, img, id, index }) => {
    const isEven = index % 2 === 0;
    const reverse = !isEven;

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <div className="row">
                {reverse ? (
                    <>
                        {/* Content Column */}
                        <div className="col-md-6 col-lg-4 col-sm-4 col-xs-6 m-auto order-1 order-md-1">
                            <div className="box-content p-md-4 p-2">
                                <Paragraph className="h2-text-box">{title}</Paragraph>
                                <Paragraph className="p-text-box">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod Lorem ipsum dolor sit
                                    amet, consectetur adipiscing
                                </Paragraph>
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="col-md-6 col-lg-8 col-sm-8 col-xs-6 m-auto border-left img_block order-2 order-md-2">
                            <Media
                                type='img'
                                id={`image-place-${id}`}
                                src={img}
                                className="image-box w-100"
                                alt="news feed"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Image Column */}
                        <div className="col-md-6 col-lg-8 col-sm-8 col-xs-6 m-auto border-right img_block order-2 order-md-1">
                            <Media
                                type='img'
                                id={`image-place-${id}`}
                                src={img}
                                className="image-box w-100"
                                alt="news feed"
                            />
                        </div>
                        {/* Content Column */}
                        <div className="col-md-6 col-lg-4 col-sm-4 col-xs-6 m-auto order-1 order-md-2">
                            <div className="box-content p-md-4 p-2">
                                <Paragraph className="h2-text-box">{title}</Paragraph>
                                <Paragraph className="p-text-box">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod Lorem ipsum dolor sit
                                    amet, consectetur adipiscing
                                </Paragraph>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Tab.Container>
    );
};

export default OzysList;
