import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-scroll";
import "./PrivateEventsHeader.css";
import MainHeaderWrapper from "../../UI/MainHeaderWrapper";
import Paragraph from "../../UI/Paragraph";
import Slider from "react-slick";
import { AuthContext } from "../../../apis/context/AuthTokenContext";
import { getBranches } from "../../../apis/config";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";

const PrivateEventsHeader = (props) => {

  const [imageValue, setImageValue] = useState("");
  const { token } = useContext(AuthContext);

  const { data: branches, isPending } = useQuery({
    queryKey: ['list-oz-branches', token],
    queryFn: ({ signal }) => getBranches(token, signal)
  });

  const settings = {
    slidesToShow: branches?.length < 4 ? branches?.length : 4,
    arrows: false,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: branches?.length < 2 ? branches?.length : 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: branches?.length < 1 ? branches?.length : 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const bookingVideo = () => {
      props.configData?.map((configItem) => {
        if (configItem.key === "private_events_image") {
          setImageValue(configItem.value);
        }
      });
    };
    bookingVideo();
  }, [props]);


  return (
    <>
      <div className="navigator private slider-sm-responsive">
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between  row">
            <div className="d-flex col-xl-6 col-md-4 col-sm-12">
              <h1 className="title-name mb-0">Private Events</h1>
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
            <div className="col-xxl-4 col-xl-6 col-md-8 col-sm-12">
              {isPending ? (
                <Skeleton paragraph={{ rows: 0 }} active />
              ) : (
                <Slider {...settings} >
                  {branches?.map((branch, index) => {
                    return (
                      <Link
                        className="nav-link-two links-margin "
                        to={branch?.name}
                        smooth={true}
                        duration={100}
                        key={index}
                      >
                        {branch?.name}
                      </Link>
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </Container>
      </div>

      <MainHeaderWrapper image={imageValue}>
        <div className={`container-fluid px-70 py-5`}>
          <div className='col-md-6 col-12'>
            {props.pending ? (
              <Skeleton paragraph={{ rows: 2 }} title={true} active />
            ) : (
              <>
                {props.configData ? props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "private_events_title" &&
                      <Paragraph className="head_paragraph mb-3">
                        {configItem.value}
                      </Paragraph>
                    }
                    {configItem.key === 'private_events_description' && (
                      <Paragraph className="description mb-0">
                        {configItem.value}

                      </Paragraph>
                    )}
                  </React.Fragment>
                )) : ""}
              </>
            )}
          </div>
        </div>
      </MainHeaderWrapper>
    </>
  );
};

export default PrivateEventsHeader;
