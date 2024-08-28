import React from "react";
import Paragraph from "../../UI/Paragraph";
import { NavLink } from "react-router-dom";
import { Skeleton } from "antd";

const JoinCommuinty = ({ configData, details, pending, buttonLink, buttontitle }) => {
  return (
    <>
      <section className={`monoBlock bg-white`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-block text-center">
                {pending && <Skeleton active paragraph={{ rows: 3 }} />}
                {configData ? (
                  configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "community_page_footer_title" && (
                        <Paragraph className="white_monoBlock_title black mb-3">
                          {configItem.value}
                        </Paragraph>
                      )}
                      {configItem.key ===
                        "community_page_footer_description" && (
                        <Paragraph className="m_b_center monoBlock_description w-75 mx-auto black">
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <Paragraph className="white_monoBlock_title black">
                      {details?.title}
                    </Paragraph>
                    <Paragraph className="m_b_center monoBlock_description w-75 mx-auto black">
                      {details?.description}
                    </Paragraph>
                  </>
                )}
                <NavLink
                  to={buttonLink}
                  className="btn button-outLine btn-bg-white mx-3"
                >
                  {buttontitle}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default React.memo(JoinCommuinty);
