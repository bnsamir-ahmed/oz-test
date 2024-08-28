import React from "react";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import { Skeleton } from "antd";

const MonoBlockTitle = ({ configData, pending }) => {
  return (
    <>
      <section className={`monoBlock bgBlack my-4`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-block text-center">
                {pending ? (
                  <>
                    <Skeleton
                      className="content-block text-center"
                      active
                      title={true}
                      paragraph={{ rows: 3 }}
                    />
                  </>
                ) : (
                  configData.map((configItem, index) => (
                    <React.Fragment key={index}>
                      {configItem.key === "home_page_mono_block_title" && (
                        <h2 className="white_monoBlock_title" 
                          data_aos="fade" 
                          data_aos_delay="0"
                        >
                          {configItem.value}
                        </h2>
                      )}
                      {configItem.key ===
                        "home_page_mono_block_description" && (
                        <Paragraph
                          className="m_b_center monoBlock_description w-75 mx-auto"
                          data_aos='fade' 
                          data_aos_delay='100'
                        >
                          {configItem.value}
                        </Paragraph>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
              <div className="flex-sm-row flex-column my-3 justify-content-center align-items-center text-center">
                <Button
                  tagType="link"
                  className={`btn button-outLine col`}
                  to={"/booking"}
                  data_aos='fade' 
                  data_aos_delay='200'
                >
                  Booking
                </Button>
                <Button
                  tagType="link"
                  className={`btn button-outLine my-3 col`}
                  to={"/community/events"}
                  data_aos='fade' 
                  data_aos_delay='250'
                >
                  events
                </Button>
                <Button
                  tagType="link"
                  className={`btn button-outLine col`}
                  to={"/membership"}
                  data_aos='fade' 
                  data_aos_delay='300'
                >
                  memberships
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default React.memo(MonoBlockTitle);
