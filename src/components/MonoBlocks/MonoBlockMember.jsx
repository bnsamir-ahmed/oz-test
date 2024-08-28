import React from "react";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import { Skeleton } from "antd";

const MonoBlockMember = (props) => {
  return (
    <>
      <section className={`monoBlock bgBlack`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-block text-center">
                {props.pending ? (
                  <>
                    <Skeleton active  paragraph={{rows:2}}/>
                  </>
                ) : (
                  props.configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "home_page_membership_title" && (
                        <h2 className="white_monoBlock_title">
                          {configItem.value}
                        </h2>
                      )}
                      {configItem.key ===
                        "home_page_membership_description" && (
                        <Paragraph
                          className={
                            "m_b_center monoBlock_description w-75 mx-auto"
                          }
                        >
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
              <div className="buttons d-lg-flex d-md-flex d-sm-block my-3 justify-content-center align-items-center text-center">
                <Button
                  tagType="link"
                  to={"/membership"}
                  className={`button-outLine f-13`}
                >
                  Explore Memberships
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default React.memo(MonoBlockMember);
