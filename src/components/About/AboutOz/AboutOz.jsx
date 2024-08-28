import React from "react";
import "./AboutOz.css";
import AboutozFooter from "./AboutozFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import Paragraph from "../../UI/Paragraph";
import HouseServices from "../../Houses/HousesDetails/HouseServices/HouseServices";
import { Skeleton } from "antd";

const AboutOz = (props) => {
  const [amenities, setamenities] = useState([]);

  useEffect(() => {
    const getAmenities = async () => {
      try {
        const config = {
          method: "get",
          url: `${process.env.REACT_APP_API_CONFIG_URL}/api/about_us_amenities`,
        };
        const response = await axios(config);
        setamenities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAmenities();
  }, []);

  return (
    <>
      <section className="about-oz body-dark position-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-block">
                <svg
                  width="72"
                  height="40"
                  viewBox="0 0 72 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3413 9.16777C13.8992 9.16777 10.3477 13.4478 10.3477 20C10.3477 26.5522 13.8992 30.8322 19.3413 30.8322C24.7834 30.8322 28.3349 26.5522 28.3349 20C28.3093 13.4478 24.7579 9.16777 19.3413 9.16777ZM33.0361 34.4254C29.3058 38.1506 24.7068 40 19.3157 40C13.9247 40 9.32572 38.177 5.59543 34.4254C1.89069 30.7001 0 25.9181 0 20C0 14.0819 1.89069 9.29987 5.62098 5.57464C9.35127 1.82299 13.9503 0 19.3413 0C24.7323 0 29.3313 1.82299 33.0616 5.57464C36.7919 9.29987 38.6826 14.0819 38.6826 20C38.657 25.9181 36.7663 30.7001 33.0361 34.4254Z"
                    fill="white"
                  />
                  <path
                    d="M71.9995 30.7011V39.2348H40.4453V31.3616L58.7646 9.30083H40.6242V0.740723H71.5396V8.79885L53.0925 30.7011H71.9995Z"
                    fill="white"
                  />
                </svg>

                {props.pending ? (
                  <>
                    <>
                      (<Skeleton active paragraph={{ rows: 3 }} />)
                    </>
                  </>
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key ===
                        "about_us_page_header_sub_description" && (
                        <Paragraph className="head_paragraph text-uppercase">
                          “{configItem.value}”
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="img_float">
            <img className="opacity-50 w-100" type="img" src={vector} alt="shape" />
          </div> */}
      </section>

      <section className="about-section body-dark">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md- col-12 box-content-black px-lg-0">
              {props.pending ? (
                <>
                  (<Skeleton.Image active />)
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "about_us_page_new_idea_image" && (
                      <img
                        className="image-box img-about w-100 ps-0"
                        src={configItem.value}
                        alt={configItem.key}
                        style={{
                          height: "608px",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>

            <div className="col-lg-6 col-md- col-12 box-content-black m-auto ms-auto ps-lg-0">
              <div className="box-content p-lg-4 p-3">
                {props.pending ? (
                  <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "about_us_page_new_idea_title" && (
                        <Paragraph className="small_title_white">
                          {configItem.value}
                        </Paragraph>
                      )}
                      {configItem.key ===
                        "about_us_page_new_idea_description" && (
                        <Paragraph className="text_desc_black">
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          </div>
          {/* ? */}
          <div className="row">
            <div className="col-lg-6 col-md- col-12 box-content-black my-auto">
              <div className="box-content px-xl-5 px-3">
                {props.pending ? (
                  <Skeleton active paragraph={{ rows: 2 }} />
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "about_us_page_our_vision_title" && (
                        <Paragraph className="text_desc_black">
                          {configItem.value}
                        </Paragraph>
                      )}
                      {configItem.key ===
                        "about_us_page_our_vision_description" && (
                        <Paragraph className="p-text-box width-75">
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md- col-12 box-content-black">
              {props.pending ? (
                <>
                  (<Skeleton.Image active />)
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "about_us_page_our_vision_image" && (
                      <img
                        className="image-box img-about w-100 ps-0"
                        src={configItem.value}
                        alt={configItem.key}
                        style={{
                          height: "568px",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
          <div className="row py-5">
            <div className="col-xl-6 col-12">
              <div className="row">
                <div className="col-xl-12 col-lg-6 my-auto">
                  <div className="box-content px-xl-5 px-3">
                    {props.pending ? (
                      <Skeleton active paragraph={{ rows: 3 }} />
                    ) : (
                      props.configData.map((configItem, index) => (
                        <React.Fragment key={index}>
                          {configItem.key ===
                            "about_us_page_our_mission_title" && (
                            <Paragraph className="text_desc_black pb-3">
                              {configItem.value}
                            </Paragraph>
                          )}
                          {configItem.key ===
                            "about_us_page_our_mission_description" && (
                            <Paragraph className="p-text-box pb-xl-5 pb-0 width-75">
                              {configItem.value}
                            </Paragraph>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>
                <div className="col-xl-12 col-lg-6 col-12">
                  {props.pending ? (
                    <>
                      (<Skeleton.Image active />)
                    </>
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_our_mission_image_3" && (
                          <img
                            src={configItem.value}
                            className="image-box img-about img-width ps-0"
                            alt={"img"}
                            style={{
                              height: "345px",
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-12 d-flex align-items-center flex-end">
              <div className="row g-3 align-items-center position-relative">
                <div className="col-md-6 col-12">
                  {props.pending ? (
                    <>
                      (
                      <Skeleton.Image
                        active
                        className=" img-small-right img-about"
                      />
                      )
                    </>
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_our_mission_image_1" && (
                          <img
                            className=" img-small-right img-about"
                            src={configItem.value}
                            alt={"img"}
                            style={{
                              height: "292px",
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
                <div className="col-xl-12 col-md-6 col-12">
                  {props.pending ? (
                    <>
                      (<Skeleton.Image active className="img-about w-100" />)
                    </>
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_our_mission_image_2" && (
                          <img
                            className="img-about w-100"
                            src={configItem.value}
                            alt={"img"}
                            style={{
                              height: "428px",
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row py-5 justify-content-between">
            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-xl-5 col-12">
                  {props.pending ? (
                    <>
                      (<Skeleton.Image active className="img-about w-100" />)
                    </>
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_community_image_1" && (
                          <img
                            className="w-100 img-about"
                            src={configItem.value}
                            alt={"img"}
                            style={{
                              height: "352px",
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
                <div className="col-xl-7 col-12">
                  {props.pending ? (
                    <Skeleton
                      active
                      paragraph={{ rows: 3 }}
                      className="text_desc_black mt-0"
                    />
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key === "about_us_page_community_title" && (
                          <Paragraph className="text_desc_black mt-0">
                            {configItem.value}
                          </Paragraph>
                        )}
                        {configItem.key ===
                          "about_us_page_community_description" && (
                          <Paragraph className="p-text-box">
                            {configItem.value}
                          </Paragraph>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-end">
              {props.pending ? (
                <>
                  (<Skeleton.Image active className="w-100 img-about" />)
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "about_us_page_community_image_2" && (
                      <img
                        className="w-100 img-about"
                        src={configItem.value}
                        alt={"img"}
                        style={{
                          height: "549px",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
          <div className="row g-3 py-5">
            <div className="col-lg-6 col-12">
              <div className="box-content p-xl-5 p-3">
                {props.pending ? (
                  <Skeleton
                    active
                    paragraph={{ rows: 3 }}
                    className="text_desc_black"
                  />
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "about_us_page_event_title" && (
                        <Paragraph className="text_desc_black">
                          {configItem.value}
                        </Paragraph>
                      )}
                      {configItem.key === "about_us_page_event_description" && (
                        <Paragraph className="p-text-box">
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
              {props.pending ? (
                <>
                  (<Skeleton.Image active className="img-about width-100" />)
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "about_us_page_event_image_1" && (
                      <img
                        className="img-about width-100"
                        src={configItem.value}
                        alt={configItem.key}
                        style={{
                          height: "265px",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
            <div className="col-lg-6 col-12 px-lg-0">
              {props.pending ? (
                <>
                  (<Skeleton.Image active className="w-100 img-about" />)
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "about_us_page_event_image_2" && (
                      <img
                        className="w-100 img-about"
                        src={configItem.value}
                        alt={configItem.key}
                        style={{
                          height: "546px",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
          <div className="position-relative food py-5">
            {props.pending && (
              <>
                (<Skeleton.Image active />)
              </>
            )}
            {props.configData
              ? props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key ===
                      "about_us_page_food_and_drink_image_3" && (
                      <img
                        className="food-1"
                        src={configItem.value}
                        alt={"img"}
                      />
                    )}
                    {configItem.key ===
                      "about_us_page_food_and_drink_image_2" && (
                      <img
                        className="food-2"
                        src={configItem.value}
                        alt={"img"}
                      />
                    )}
                    {configItem.key ===
                      "about_us_page_food_and_drink_image_1" && (
                      <img
                        className="food-3"
                        src={configItem.value}
                        alt={"img"}
                      />
                    )}
                    {configItem.key ===
                      "about_us_page_food_and_drink_image_4" && (
                      <img
                        className="food-4"
                        src={configItem.value}
                        alt={"img"}
                      />
                    )}
                    {configItem.key ===
                      "about_us_page_food_and_drink_image_5" && (
                      <img
                        className="food-5"
                        src={configItem.value}
                        alt={"img"}
                      />
                    )}
                    {configItem.key ===
                      "about_us_page_food_and_drink_title" && (
                      <Paragraph className="text_desc_black mt-0">
                        {configItem.value}
                      </Paragraph>
                    )}
                    {configItem.key ===
                      "about_us_page_food_and_drink_description" && (
                      <Paragraph className="p-text-box  w-25 text-center">
                        {configItem.value}
                      </Paragraph>
                    )}
                  </React.Fragment>
                ))
              : ""}
          </div>
          <div className="food_mobile py-5">
            <div className="row g-3 align-items-center justify-content-center">
              <div className="col-sm-6 col-12 ps-sm-0">
                {props.configData
                  ? props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_food_and_drink_image_2" && (
                          <img src={configItem.value} alt={"img"} />
                        )}
                      </React.Fragment>
                    ))
                  : ""}
              </div>
              <div className="col-sm-6 col-12 img_upper pe-sm-0">
                {props.configData
                  ? props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_food_and_drink_image_3" && (
                          <img src={configItem.value} alt={"img"} />
                        )}
                      </React.Fragment>
                    ))
                  : ""}
              </div>
              <div className="text-center py-3">
                {props.configData
                  ? props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_food_and_drink_title" && (
                          <Paragraph className="text_desc_black mt-0">
                            {configItem.value}
                          </Paragraph>
                        )}
                        {configItem.key ===
                          "about_us_page_food_and_drink_description" && (
                          <Paragraph className="p-text-box text-center">
                            {configItem.value}
                          </Paragraph>
                        )}
                      </React.Fragment>
                    ))
                  : ""}
              </div>
              <div className="col-sm-6 col-12 ps-0">
                {props.configData
                  ? props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_food_and_drink_image_4" && (
                          <img src={configItem.value} alt={"img"} />
                        )}
                        {configItem.key ===
                          "about_us_page_food_and_drink_image_5" && (
                          <img
                            src={configItem.value}
                            alt={"img"}
                            className="pt-3"
                          />
                        )}
                      </React.Fragment>
                    ))
                  : ""}
              </div>
              <div className="col-sm-6 col-12 pe-sm-0 d-flex justify-content-end">
                {props.configData
                  ? props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key ===
                          "about_us_page_food_and_drink_image_1" && (
                          <img src={configItem.value} alt={"img"} />
                        )}
                      </React.Fragment>
                    ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-md-6 col-12">
              {props.pending ? (
                <>
                  (<Skeleton.Image active />)
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "about_us_page_oz_dna_iamge" && (
                      <img
                        className="w-100 img-about"
                        src={configItem.value}
                        alt={"img"}
                        style={{
                          height: "568px",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
            <div className="col-md-6 col-12 my-auto">
              <div className="box-content p-xl-5 p-3">
                {props.pending ? (
                  <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "about_us_page_oz_dna_title" && (
                        <Paragraph className="text_desc_black mt-0">
                          {configItem.value}
                        </Paragraph>
                      )}
                      {configItem.key ===
                        "about_us_page_oz_dna_description" && (
                        <Paragraph className="p-text-box">
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <HouseServices location_amenities={amenities} dark_theme={true} />
      <AboutozFooter />
    </>
  );
};

export default AboutOz;
