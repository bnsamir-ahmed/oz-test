import React from "react";
import "./Content.css";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import { Skeleton } from "antd";

const RightContentFB = (props) => {
    return (
      <>
        <section className=" ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="head-content-sec">
                  <Paragraph className="head_feature">OZY's</Paragraph>
                </div>
              </div>
            </div>
            <div className="row flex_reverse border-of-section">
              <div className="col-md-6 col-lg-4 col-sm-12 col-xs-6 m-auto ">
                <div className="box-content  p-lg-4 p-3">
                  {props.pending ? (
                    <>
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </>
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key === "home_page_ozy_title" && (
                          <h3 className="paragraph_black">
                            {configItem.value}
                          </h3>
                        )}
                        {configItem.key === "home_page_ozy_description" && (
                          <Paragraph className="description_black">
                            {configItem.value}
                          </Paragraph>
                        )}
                      </React.Fragment>
                    ))
                  )}
                  <Button
                    to={"/ozys"}
                    className="btn button-outLine btn-bg-white"
                    tagType="link"
                  >
                    Explore
                  </Button>
                </div>
              </div>
              {props.pending ? (
                <>
                  <Skeleton.Image active />
                </>
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "home_page_ozy_image" && (
                      <div className="col-md-6 col-lg-8 col-sm-12 col-xs-6 border-left img_block">
                        <img
                          className="image-box w-100"
                          src={configItem.value}
                          alt="home OZy"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </section>
      </>
    );
};

export default React.memo(RightContentFB) ;
