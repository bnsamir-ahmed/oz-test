import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./BookinHeader.css";
import MainHeaderWrapper from "../../UI/MainHeaderWrapper";
import Paragraph from "../../UI/Paragraph";
import { Skeleton } from "antd";

const BookingHeader = (props) => {
  const [video, setVideo] = useState("");

  useEffect(() => {
    const bookingVideo = () => {
      props.configData?.map((configItem) => {
        if (configItem.key === "booking_page_video") {
          setVideo(configItem.value);
        }
      });
    };
    bookingVideo();
  }, [props]);

  return (
    <>
      <div className="navigator">
        <Container fluid className="justify-content-start">
          <div className="d-flex">
            <h1 className="title-name mb-0">Booking</h1>
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
        </Container>
      </div>
      <MainHeaderWrapper configData={props.configData} video={video}>
        <div className={`container-fluid px-70`}>
          <div className="col-xl-6 col-lg-9 col-12">
            {props.pending ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              props.configData.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === "booking_page_title" && (
                    <h2 className="head_paragraph mb-3">
                      {configItem.value}
                    </h2>
                  )}
                  {configItem.key === "booking_page_description" && (
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

export default React.memo(BookingHeader);
