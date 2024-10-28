import React from "react";
import "./Content.css";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import { Skeleton } from "antd";
import line from '../../../assets/images/line-yellow.svg'

const RightContentNewFeed = ({ configData, pending }) => {
  return (
    <>
      <section className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-content-sec">
                <Paragraph className="head_feature" data_aos="fade"
                  data_aos_delay="0">News feed</Paragraph>
              </div>
            </div>
          </div>
        
          <div className="row border-of-section position-relative ">
            {pending ? (
              <>
                (<Skeleton.Image active />)
              </>
            ) : (
              configData.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === "home_page_newsfeed_image" && (
                    <div className="col-lg-8 col-md-7 col-sm-12 col-xs-6 border-right img_block">
                      <img
                        className="image-box w-100"
                        src={configItem.value}
                        alt="Our OZ Vision"
                        data_aos="fade"
                        data_aos_delay="100"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))
            )}
            <div className="col-lg-4 col-md-5 col-sm-12 col-xs-6 m-auto position-relative">
              <div className="box-content p-lg-4 p-3">
                {pending ? (
                  <>
                    <Skeleton active title={true} paragraph={{ rows: 3 }} />
                  </>
                ) : (
                  configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "home_page_newsfeed_title" && (
                        <h3 className="paragraph_black" data_aos="fade"
                          data_aos_delay="100">
                          {configItem.value}
                        </h3>
                      )}
                      {configItem.key === "home_page_newsfeed_description" && (
                        <Paragraph className="description_black" data_aos="fade"
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
                  data_aos="fade"
                  data_aos_delay="200"
                  to={'/community/newsfeed'}>
                  Explore
                </Button>
              </div>
            <div className="img_float_line bottom-50">
            <img className="opacity-50 w-100" type="img" src={line} alt="shape" />
          </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(RightContentNewFeed);
