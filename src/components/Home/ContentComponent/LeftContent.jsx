import React from "react";
import "./Content.css";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import { Skeleton } from "antd";

const LeftContent = ({ configData, pending }) => {
  return (
    <>
      <section className="head-of-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-content-sec">
                <Paragraph className="head_feature" 
                    data_aos="fade" 
                    data_aos_delay="0">Our Vision</Paragraph>
              </div>
            </div>
          </div>
          <div className="row flex_reverse border-of-section ">
            <div className="col-lg-4 col-md-5 col-sm-12 col-xs-6 m-auto">
              <div className="box-content p-lg-4 p-3">
                {pending ? (
                  <>
                    <Skeleton active title={true} paragraph={{ rows: 3 }} />
                  </>
                ) : (
                  configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "home_page_about_us_title" && (
                        <h3 className="paragraph_black" data_aos="fade" 
                        data_aos_delay="100">
                          {configItem.value}
                        </h3>
                      )}
                      {configItem.key === "home_page_about_us_description" && (
                        <Paragraph className="description_black" 
                        data_aos="fade" 
                        data_aos_delay="150">
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
                <Button
                  tagType="link"
                  className="btn_outline_black"
                  to={"/about"}
                  data_aos="fade" 
                    data_aos_delay="200"
                >
                  Our Vision
                </Button>
              </div>
            </div>
            {pending ? (
              <>
                <Skeleton.Image className="w-100" active />
              </>
            ) : (
              configData.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === "home_page_about_us_image" && (
                    <div className="col-lg-8 col-md-7 col-sm-12 col-xs-6 border-left img_block">
                      <img
                        className="image-box w-100"
                        src={configItem.value}
                        alt="Our OZ Vision"
                        data_aos="fade" 
                        data_aos_delay="0"
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

export default React.memo(LeftContent);
