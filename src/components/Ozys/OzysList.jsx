import React from 'react';
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';
import Media from '../Media/Media';
import { Nav, Tab } from "react-bootstrap";

const OzysList = ({title, img, id, index}) => {
    const isEven = index % 2 === 0;
    const reverse = !isEven;


    if (reverse) {

        return (
            <>
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <div className="col-md-6 col-lg-4 col-sm-4 col-xs-6 m-auto">
                        <div className="box-content p-md-4 p-2">
                            <Paragraph className="h2-text-box">{title}</Paragraph>
                            <Paragraph className="p-text-box">
                                Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit
                                amet, consectetur dipiscing
                            </Paragraph>
                        </div>

                    </div>
                    <div className="col-md-6 col-lg-8 col-sm-8 col-xs-6 m-auto border-left img_block">
                            <Media
                                type='img'
                                id={`image-place-${id}`}
                                src={img}
                                className="image-box w-100"
                                alt="news feed"
                            />
                    </div>
                </Tab.Container>
            </>
        );
    } else {
        return (
            <>
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <div className="col-md-6 col-lg-8 col-sm-8 col-xs-6 m-auto border-right img_block">
                            <Media
                                type='img'
                                id={`image-place-${id}`}
                                src={img}
                                className="image-box w-100"
                                alt="news feed"
                            />
                    </div>
                    <div className="col-md-6 col-lg-4 col-sm-4 col-xs-6 m-auto">
                        <div className="box-content p-md-4 p-2">
                            <Paragraph className="h2-text-box">{title}</Paragraph>
                            <Paragraph className="p-text-box">
                                Lorem ipsum dolor sit amet, consectetur dipiscing elit eiusmod Lorem ipsum dolor sit
                                amet, consectetur dipiscing
                            </Paragraph>
                        </div>
                    </div>
                </Tab.Container>
            </>
        );
    }
};


export default OzysList;
