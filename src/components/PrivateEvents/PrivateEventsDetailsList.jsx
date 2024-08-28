import React from 'react';
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';
import { Tab } from "react-bootstrap";

const PrivateEventsDetailsList = ({ address, image, id, index, desc, desc_2, hrefTag }) => {
    const isEven = index % 2 === 0;
    const reverse = !isEven;


    if (reverse) {

        return (
            <>
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <div className="col-lg-4 col-md-6 col-12 m-auto">
                        <div className="box-content p-xl-4 p-2">
                            <Paragraph className="h2-text-box">{address}</Paragraph>
                            <Paragraph className="p-text-box">
                                {desc}
                            </Paragraph>
                            <Paragraph className="p-text-box">
                                {desc_2}
                            </Paragraph>
                            {/* <ul className="places text-start">
                                <Tab.Content animation>
                                    {places.map((place, index) => (
                                        <Tab.Pane eventKey={index}>
                                            {place.name}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </ul> */}
                            <div className="d-flex buttons-group">
                                <Button to="/contactus" className="btn button-outLine btn-bg-white m-0" tagType='link'>inquire</Button>
                                <a
                                    target='_blank'
                                    href={hrefTag}
                                    className="btn button-outLine btn-bg-white btn-pdf"
                                    title='comming Soon'
                                >Download PDF</a>

                            </div>

                        </div>

                    </div>
                    <div className="col-lg-8 col-md-6 col-12 m-auto border-left img_block">
                        <img
                            id={`image-place-${id}`}
                            src={image}
                            className="image-box w-100"
                            alt="news feed"
                            style={{
                                height: '512px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </Tab.Container>
            </>
        );
    } else {
        return (
            <>
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <div className="col-lg-8 col-md-6 col-12 m-auto border-right img_block">
                        <img
                            id={`image-place-${id}`}
                            src={image}
                            className="image-box w-100"
                            alt="news feed"
                            style={{
                                height: '512px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 m-auto">
                        <div className="box-content p-xl-4 p-2">
                            <Paragraph className="h2-text-box">{address}</Paragraph>
                            <Paragraph className="p-text-box">
                                {desc}
                            </Paragraph>
                            <Paragraph className="p-text-box">
                                {desc_2}
                            </Paragraph>
                            {/* <ul className="places text-start">
                                <Tab.Content animation>
                                    {places.map((place, index) => (
                                        <Tab.Pane eventKey={index}>
                                            {place.name}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </ul> */}
                            <div className="d-flex buttons-group">
                                <Button to="/contactus" className="btn button-outLine btn-bg-white m-0" tagType='link'>inquire</Button>
                                <a
                                    target='_blank'
                                    href={hrefTag}
                                    className="btn button-outLine btn-bg-white btn-pdf"
                                    title='comming Soon'
                                >Download PDF</a>
                            </div>

                        </div>
                    </div>
                </Tab.Container>
            </>
        );
    }
};


export default PrivateEventsDetailsList;
