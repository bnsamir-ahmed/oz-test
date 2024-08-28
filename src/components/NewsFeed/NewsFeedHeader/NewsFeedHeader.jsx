import React, { useEffect, useContext } from "react";
import "./NewsFeedHeader.css";
import newsfeed from "../../../assets/images/newsfeed.png";
import { Container, Nav } from "react-bootstrap";
import Paragraph from "../../UI/Paragraph";
import MainHeaderWrapper from "../../UI/MainHeaderWrapper";
import { DataContext } from "../../../apis/context/SiteDataContext";
import { Skeleton } from "antd";

const NewsFeedHeader = () => {

    const { ResetPageName, isPending, getComponentValue } = useContext(DataContext);

    useEffect(() => {
        ResetPageName("community");
    }, []);

    const configData = getComponentValue("newsfeed");

    return (
        <>
            <div className="navigator-feed">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <h1 className="title-name mb-0">
                                News Feed
                            </h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2"
                                height="127"
                                viewBox="0 0 2 127"
                                fill="none"
                            >
                                <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5" />
                            </svg>
                        </div>
                        <div>
                            <div className="ms-auto">
                                <>
                                    {/* <svg
                                        width="2"
                                        height="127"
                                        viewBox="0 0 2 127"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="searchIcon"
                                    >
                                        <path
                                            d="M1 0L1.00001 127"
                                            stroke="#BDBDBD"
                                            stroke-width="1.5"
                                        />
                                    </svg> */}
                                    {/* <Button
                                        tagType='link'
                                        className='p-0 m-4'
                                        onClick={()=>{setOpenSearch(!openSearch)}}>
                                            <svg
                                                width="48"
                                                height="48"
                                                viewBox="0 0 48 48"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="23.4"
                                                    cy="23.4"
                                                    r="11.4"
                                                    stroke="#BDBDBD"
                                                    stroke-width="1.5"
                                                />
                                                <path
                                                    d="M33.5996 33.5996L35.9996 35.9996"
                                                    stroke="black"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                />
                                            </svg>
                                    </Button> */}
                                </>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <MainHeaderWrapper configData={''} image={newsfeed}>
                <div className={`container-fluid px-70 py-5`}>
                    <div className='col-xl-6 col-lg-9 col-12'>
                        <h2 className="main_header_title mb-0">Community</h2>
                        {isPending ? (
                            <Skeleton active paragraph={{ rows: 3 }} />
                        ) : (
                            configData.map((configItem, index) => (
                                <React.Fragment key={index}>
                                    {configItem.key === "community_page_newsfeed_title" && (
                                        <Paragraph className='head_paragraph mb-3'>
                                            {configItem.value}
                                        </Paragraph>
                                    )}
                                    {configItem.key ===
                                        "community_page_newsfeed_description" && (
                                            <Paragraph className={" description mb-0"} >
                                                {configItem.value}
                                            </Paragraph>
                                        )}
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>
            </MainHeaderWrapper>
        </>
    );
};

export default NewsFeedHeader;
