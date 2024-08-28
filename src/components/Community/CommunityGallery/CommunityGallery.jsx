import React from "react";
import Media from "../../Media/Media";
import Paragraph from "../../UI/Paragraph";
import { NavLink } from "react-router-dom";
import { Element } from "react-scroll";
import { Skeleton } from "antd";
const CommunityGallery = (props) => {
  return (
    <>
      <Element name="community-gallery">
        <section className="gallery">
          <div className="container-fluid">
            <div className="row border-of-section ">
              {props.pending ? (
                <Skeleton.Image active className="image-box w-100" />
              ) : (
                props.configData.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "community_page_gallery_image" && (
                      <div className="col-md-8 col-lg-8 col-sm-12 col-xs-6 border-right img_block">
                        <Media
                          type="img"
                          className="image-box w-100"
                          src={configItem.value}
                          alt="Our OZ Vision"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))
              )}
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-6 m-auto ">
                <div className="box-content p-lg-4 p-3">
                  {props.pending ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key === "community_page_gallery_title" && (
                          <Paragraph className="paragraph_black black">
                            {configItem.value}
                          </Paragraph>
                        )}
                        {configItem.key ===
                          "community_page_gallery_description" && (
                          <Paragraph className="mb-5 monoBlock_description  black">
                            {configItem.value}
                          </Paragraph>
                        )}
                      </React.Fragment>
                    ))
                  )}
                  <NavLink
                    to={"/community/galleryshow"}
                    className="btn button-outLine btn-bg-white mx-0"
                  >
                    Explore
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>
    </>
  );
};

export default CommunityGallery;
