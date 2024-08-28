import React from "react";
import "./BecomeMember.css";
import Media from "../../Media/Media";
import Paragraph from "../../UI/Paragraph";
import { Skeleton } from "antd";
const BecomeMember = ({ configData, pending }) => {
  return (
    <>
      <section className=" ">
        <div className="container-fluid">
          <div className="row border-of-section">
            <div className="col-lg-8 col-md-7 col-sm-12 border-right img_block">
              {pending ? (
                <Skeleton.Image active className="w-100" />
              ) : (
                configData?.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {(configItem.key === "membership_page_image" ||
                      configItem.key === "home_page_space_image") && (
                      <Media
                        type="img"
                        className="image-box w-100"
                        src={configItem.value}
                        alt="Our OZ Vision"
                      />
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
            <div className="col-lg-4 col-md-5 col-12 m-auto py-4">
              <div className="box-content p-lg-4 p-3">
                {pending ? (
                  <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                  configData?.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {(configItem.key === "membership_page_main_title" ||
                        configItem.key === "home_page_space_title") && (
                        <h2 className="h2-text">{configItem.value}</h2>
                      )}
                      {configItem.key === "membership_page_sub_title" && (
                        <h2 className="h2-text-box">{configItem.value}</h2>
                      )}
                      {(configItem.key === "membership_page_description" ||
                        configItem.key === "home_page_space_description") && (
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
    </>
  );
};

export default BecomeMember;
