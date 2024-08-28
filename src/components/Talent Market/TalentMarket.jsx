import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import booking from "../../assets/images/videos/limited.mp4";
import MainHeaderWrapper from '../UI/MainHeaderWrapper';
import Paragraph from '../UI/Paragraph';
import MarketSpace from './MarketSpace';
import { DataContext } from '../../apis/context/SiteDataContext';

const TalentMarket = (props) => {

    // NOTE talent market not added to the config api yet ask seffen to add

    // const { data, isPending, ResetPageName } = useContext(DataContext);

    // useEffect(()=>{
    //     ResetPageName('__key');
    // }, []);

    return (
        <>
            <div className="navigator">
                <Container fluid className='justify-content-start'>
                    <div className='d-flex align-items-center'>
                        <h1 className="title-name mb-0">
                            Talent Market
                        </h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2"
                            height="127"
                            viewBox="0 0 2 127"
                            fill="none"
                        >
                            <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5"/>
                        </svg>
                    </div>

                </Container>
            </div>
            <MainHeaderWrapper configData={props.configData} video={booking}>
                <div className={`container-fluid px-70`}>
                    <div className='col-md-6 col-12'>
                    <Paragraph className='head_paragraph mb-3'>{'Talent Market'}</Paragraph>
                    <Paragraph className='description mb-0'>{'Lorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet, consectetuerLorem ipsum dolor sit amet,'}</Paragraph>

                        {/* {props.configData ? props.configData.map((configItem, index) => (
                            <React.Fragment key={index}>
                                {configItem.key === 'booking_page_title' && (
                                    <Paragraph className='head_paragraph mb-3'>{configItem.value}</Paragraph>
                                )}
                                {configItem.key === 'booking_page_description' && (
                                    <Paragraph className='description mb-0'>{configItem.value}</Paragraph>
                                )}
                            </React.Fragment>
                        )): ''} */}
                    </div>
                </div>
            </MainHeaderWrapper>
            <MarketSpace />
        </>
    );
};

export default React.memo(TalentMarket);
