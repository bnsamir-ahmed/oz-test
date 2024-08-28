import React from "react";
import Paragraph from "../UI/Paragraph";
import Button from '../UI/Button';
import AmenitiesList from "./AmenitiesList";
import './OZAmenities.css';
import { Skeleton } from "antd";
const OZAmenities = (props) => {

    return (
      <>
        <section className="membership-types">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="head-content-sec">
                  <Paragraph className="head_feature">
                    OZ Amenities
                  </Paragraph>
                </div>
              </div>
              <div className="border-of-section">
                <div className="row p-sm-5 p-3 justify-content-between align-items-center">
                  {props.pending ? (
                    <>
                      <Skeleton active title={true} paragraph={{ rows: 3 }} />
                    </>
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key === "home_page_benefit_title" && (
                          <h3 className="paragraph_black">
                            {configItem.value}
                          </h3>
                        )}
                        {configItem.key === "home_page_benefit_description" && (
                          <Paragraph className="description_black w-75 spac_width">
                            {configItem.value}
                          </Paragraph>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
                <AmenitiesList />
                <div className="col-lg-12 text-center py-4">
                  <Button
                    tagType="link"
                    to={`/amenities`}
                    className="btn button-outLine btn-bg-white"
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

export default React.memo(OZAmenities);
