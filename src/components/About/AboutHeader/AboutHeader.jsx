import React from "react";
import Paragraph from "../../UI/Paragraph";
import classess from "../../UI/MainHeaderWrapper.module.css";
import { Skeleton } from "antd";

const AboutHeader = (props) => {
  return (
    <>
      <div className={`position-relative`}>
        <div className={`${classess.header_bg} justify-content-center`}>
          {props.pending ? (
            <>
              <>
                (<Skeleton.Image active className="w-100" />)
              </>
            </>
          ) : (
            props.configData.map((configItem, index) => (
              <React.Fragment key={index}>
                {configItem.key === "about_us_page_image" && (
                  <div
                    style={{
                      backgroundImage: `url(${configItem.value})`,
                    }}
                    className={`${classess.img_bg}`}
                  ></div>
                )}
              </React.Fragment>
            ))
          )}
          <div
            className={"position-relative py-5"}
            style={{
              zIndex: 99,
            }}
          >
            <div className={`container-fluid px-70 py-5 text-center`}>
              <div className="col-xl-6 col-lg-10 col-12 mx-auto">
                {props.pending ? (
                  <>
                    (<Skeleton active paragraph={{ rows: 2 }} />)
                  </>
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "about_us_page_header_title" && (
                        <Paragraph className="head_paragraph mb-3">
                          {configItem.value}
                        </Paragraph>
                      )}
                      {configItem.key ===
                        "about_us_page_header_main_description" && (
                        <Paragraph className="description mb-0">
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
      </div>
    </>
  );
};

export default React.memo(AboutHeader);
