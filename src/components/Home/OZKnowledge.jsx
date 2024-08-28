import React from "react";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import { Skeleton } from "antd";

const OZKnowledge = (props) => {
  return (
    <>
      <section className=" ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-content-sec">
                <Paragraph className="head_feature">OZ Knowledge</Paragraph>
              </div>
            </div>
          </div>
          <div className="row border-of-section ">
            {props.pending ? (
              <>
                <Skeleton.Image active />
              </>
            ) : (
              props.configData.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === "home_page_courses_image" && (
                    <div className="col-lg-8 col-md-7 col-sm-12 col-xs-6 img_block border-right">
                      <img
                        className="image-box w-100"
                        src={configItem.value}
                        alt="oz knowledge"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))
            )}
            <div className="col-lg-4 col-md-5 col-sm-12 col-xs-6 m-auto">
              <div className="box-content p-lg-4 p-3">
                {props.pending
                  ? ( <>
                          <Skeleton active paragraph={{rows:2}} />
                        </>): props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key === "home_page_courses_title" && (
                          <h3 className="paragraph_black">
                            {configItem.value}
                          </h3>
                        )}
                        {configItem.key === "home_page_courses_description" && (
                          <Paragraph className="description_black">
                            {configItem.value}
                          </Paragraph>
                        )}
                      </React.Fragment>
                    ))
                 }
                <Button
                  tagType="link"
                  className="btn_outline_black"
                  to={"/knowledge"}
                >
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(OZKnowledge);
