import React from "react";
import PublicEventList from "../../PublicEvents/PublicEventList";
import { NavLink } from "react-router-dom";
import Paragraph from "../../UI/Paragraph";
import { Element } from "react-scroll";
import { Skeleton } from "antd";

const CommunityEvents = (props) => {
  return (
    <>
      <Element name="community-events">
        <section className="events community">
          <div className="container-fluid">
            <div className="  ">
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-6 m-auto ">
                <div className="box-content d-flex justify-content-between align-items-center">
                  <div className="row">
                    {props.pending ? (
                      <Skeleton active Paragraph={{ rows: 3 }} />
                    ) : (
                      props.configData.map((configItem, index) => (
                        <React.Fragment key={index}>
                          {configItem.key === "community_page_event_title" && (
                            <div className="col-lg-4 col-sm-12">
                              <Paragraph className="white_monoBlock_title black">
                                {configItem.value}
                              </Paragraph>
                            </div>
                          )}
                          {configItem.key ===
                            "community_page_event_description" && (
                            <div className="col-lg-8 col-sm-12 m-auto">
                              <div className="d-lg-flex d-sm-block align-items-center">
                                <Paragraph
                                  className={
                                    " monoBlock_description w-75 mx-auto black"
                                  }
                                >
                                  {configItem.value}
                                </Paragraph>
                                <NavLink
                                  to={"/community/events"}
                                  className="btn button-outLine btn-bg-white mx-3"
                                >
                                  Explore
                                </NavLink>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <PublicEventList />
            </div>
          </div>
        </section>
      </Element>
    </>
  );
};

export default CommunityEvents;
