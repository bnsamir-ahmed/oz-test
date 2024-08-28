import React from 'react';
import party from "../../../../../assets/images/party.png";
import './CommunityExploreHeader.css';
import MainHeaderWrapper from '../../../../UI/MainHeaderWrapper';
import Paragraph from '../../../../UI/Paragraph';
import { Skeleton } from 'antd';

const CommunityExploreHeader = ({configData, isPending}) => {

    return (
        <>
            <MainHeaderWrapper image={party}>
                <div className={`container-fluid px-70 py-5`}>
                    <div className='col-md-6 col-12'>
                        <p className="main_header_title mb-0">Initiating</p>
                        {isPending ?
                            (
                                <Skeleton paragraph={{ rows: 2 }} active />
                            )
                            : (
                                <>
                                    {
                                        configData && configData.map((configItem, index) => (
                                            <React.Fragment key={index}>
                                                {configItem.key === "community_page_event_title" && (
                                                    <Paragraph className='head_paragraph mb-3'>{configItem.value}</Paragraph>
                                                )}
                                                {configItem.key === "community_page_event_description" && (
                                                    <Paragraph className='description mb-0'>{configItem.value}</Paragraph>
                                                )}
                                            </React.Fragment>
                                        ))
                                    }
                                </>
                            )}
                    </div>
                </div>
            </MainHeaderWrapper>
        </>
    );
};

export default CommunityExploreHeader;
