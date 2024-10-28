import React from "react";
import community from "../../../assets/images/videos/community.mp4";
import "./CommunityHeader.css";
import { Container } from "react-bootstrap";
import { Link } from "react-scroll";
import Paragraph from "../../UI/Paragraph";
import MainHeaderWrapper from "../../UI/MainHeaderWrapper";
import { Skeleton } from "antd";

const CommunityHeader = (props) => {
  return (
    <>
      <div className="navigator community">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center change_dir">
            <div className="d-flex">
              <h1 className="title-name mb-0">community</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="127"
                viewBox="0 0 2 127"
                fill="none"
              >
                <path
                  d="M1 0L1.00001 127"
                  stroke="#BDBDBD"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div className="py-3">
              <Link
                className="nav-link-two links-margin"
                to={"community-newsfeed"}
                smooth={true}
                duration={100}
              >
                News Feed
              </Link>
              {/* <Link
                className="nav-link-two links-margin"
                to={"community-events"}
                smooth={true}
                duration={100}
              >
                Events
              </Link> */}
              <Link
                className="nav-link-two links-margin"
                to={"community-gallery"}
                smooth={true}
                duration={100}
              >
                Gallery
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <MainHeaderWrapper configData={props.configData} video={community}>
        <div className={`container-fluid px-70 py-5`}>
          <div className="col-xl-6 col-lg-9 col-12 community">
            {props.pending ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              props.configData.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === 'community_page_header_main_title' && (
                    <Paragraph className='head_paragraph mb-3'>{configItem.value}</Paragraph>
                  )}
                  {configItem.key === "community_page_header_sub_title" && (
                    <Paragraph className="description mb-0">
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

export default React.memo(CommunityHeader);
