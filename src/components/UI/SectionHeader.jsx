import React, { useState } from "react";
import Paragraph from "./Paragraph";
import Button from "./Button";
import ModalVideo from "./ModalVideo";
import { Skeleton } from "antd";

const SectionHeader = (props) => {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setFullscreen(true);
    setShow(true);
  };
  return (
    <>
      <div className={`container-fluid px-70`}>
        <div className="col-xl-6 col-12">
          {props.pending ? (
            <>
              <Skeleton active title={true} paragraph={{ rows: 3 }} />
            </>
          ) : (
            props.configData.map((configItem, index) => (
              <React.Fragment key={index}>
                {configItem.key === "home_page_main_header" && (
                  <h1 className="main_header_title mb-0"
                    data_aos="fade" 
                    data_aos_delay="0">
                    {configItem.value}
                  </h1>
                )}
                {configItem.key === "home_page_sub_header" && (
                  <h2 className="head_paragraph mb-0"
                    data_aos="fade" 
                    data_aos_delay="150">
                    {configItem.value}
                  </h2>
                )}
                {configItem.key === "home_page_header_description" && (
                  <h4 className="description mb-0"
                    data_aos="fade" 
                    data_aos_delay="150">
                    {configItem.value}
                  </h4>
                )}
              </React.Fragment>
            ))
          )}
          <div className="mt-5 d-flex align-items-center">
            <Button
              tagType="link"
              className="btn btn_outline me-2"
              to={"/about"}
              data_aos="fade" 
              data_aos_delay="200"
            >
              Explore More
            </Button>
            <Button
              tagType="link"
              onClick={handleShow}
              className="play-modal d-flex align-items-center"
              data_aos="fade" 
              data_aos_delay="250"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_b_2905_25554)">
                  <path
                    d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
                    fill="white"
                  />
                </g>
                <path
                  d="M8.99219 13.7144V10.18C8.99219 8.67335 8.99219 7.92001 9.4829 7.62962C9.97362 7.33922 10.634 7.70177 11.9547 8.42688L14.9841 10.0901C16.3226 10.8249 16.9919 11.1924 17.0066 11.7668C17.0213 12.3412 16.3717 12.7424 15.0726 13.5448L12.0432 15.416C10.6931 16.2499 10.018 16.6668 9.5051 16.3807C8.99219 16.0947 8.99219 15.3012 8.99219 13.7144Z"
                  fill="#1D2130"
                />
                <defs>
                  <filter
                    id="filter0_b_2905_25554"
                    x="-80"
                    y="-80"
                    width="184"
                    height="184"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="40" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_2905_25554"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_2905_25554"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <Paragraph className="text-wrapper-4 mx-2 mb-0">
                Play Video
              </Paragraph>
            </Button>
          </div>
        </div>
      </div>
      <ModalVideo
        show={show}
        fullscreen={fullscreen}
        handleClose={handleClose}
        video={props.video}
      />
    </>
  );
};
export default SectionHeader;
