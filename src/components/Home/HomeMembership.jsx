import React from "react";
import Paragraph from "../UI/Paragraph";
import Button from "../UI/Button";
import MembershipTypesSlider from "../Membership/MembershipTypes/MembershipTypesSlider";
import { Skeleton } from "antd";

const HomeMembership = ({ configData, pending }) => {
  return (
    <>
      <section className="membership-types">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="head-content-sec">
                <Paragraph className="head_feature" data_aos="fade" 
                    data_aos_delay="0">Membership</Paragraph>
              </div>
            </div>
            <div className="border-of-section">
              <div className="row p-sm-5 p-3 justify-content-between align-items-center">
                {pending ? (
                  <>
                    <Skeleton active paragraph={{ rows: 1 }} />
                  </>
                ) : (
                  configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "home_page_membership_title" && (
                        <div className="col-sm-12 col-lg-5">
                          <h3 className="paragraph_black" data_aos="fade" data_aos_delay="100">
                            {configItem.value}
                          </h3>
                        </div>
                      )}
                      {configItem.key ===
                        "home_page_membership_description" && (
                        <div className="col-sm-12 col-lg-7 m-auto">
                          <Paragraph className="description_black" data_aos="fade" data_aos_delay="150">
                            {configItem.value}
                          </Paragraph>
                        </div>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
              <MembershipTypesSlider />
            
              <div className="col-lg-12 text-center py-4">
                <Button
                  tagType="link"
                  to={`/membership`}
                  className="btn button-outLine btn-bg-white"
                  data_aos="fade" 
                  data_aos_delay="200"
                >
                  explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(HomeMembership);
