import React, { useContext, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import Paragraph from "../UI/Paragraph";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { gymHistory } from "../../apis/ZeeStudio";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../UI/SkeletonCard";
import { Skeleton } from "antd";

const GymHistory = () => {

  const { token } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("active");

  const { isPending, error, data } = useQuery({
    queryKey: ["gym-histories"],
    queryFn: ({ signal }) => gymHistory(token, signal),
  });

  const HandleActive = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab}>
        <div className="navigator border_bottom">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h1 className="title-name mb-0">Zee Studio History</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="127"
                viewBox="0 0 2 127"
                fill="none"
              >
                <path
                  d="M1 0L1.00001 127"
                  stroke="#BDBDBD"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div className="d-flex history_tabs">
              <Nav className="d-flex booking_nav">
                {data &&
                  Object.keys(data).map((item, index) => {
                    return (
                      <Nav.Item key={index}>
                        <Nav.Link
                          eventKey={item}
                          className="booking_navlink"
                          onClick={() => HandleActive(item)}
                        >
                          {item}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
              </Nav>
            </div>
          </div>
        </div>
        <div className="container-fluid px-70 py-5">
          <Tab.Content
            style={{
              minHeight: "50vh",
            }}
          >
            <Tab.Pane eventKey={activeTab}>
              {isPending && (<Skeleton active title={true} paragraph={{ rows: 3 }} />)}
              {(data && data[activeTab]?.length === 0) && (
                <Paragraph className="empty">{`there is not ${activeTab} courses yet`}</Paragraph>
              )}
              {data && data[activeTab].map((item, index) => {
                  return (
                    <div className="card card_event my-3" key={index}>
                      <div className="row align-items-center ">
                        <div className="col-xxl-3 col-lg-4 col-12 d-flex justify-content-start">
                          <img
                            src={item.training?.image}
                            alt="img"
                            width="100%"
                            height="256px"
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-xxl-8 col-lg-8 col-12">
                          <div className="row align-items-center justify-content-between p-lg-0 p-3">
                            <div className="col-sm-9 col-12">
                              <Paragraph className="light">
                                Date Submitted:{" "}
                                {moment(item.invoice_date).format(
                                  "MMM DD, YYYY"
                                )}
                              </Paragraph>
                              <Paragraph className="card-title">
                                {item.training?.title}
                              </Paragraph>
                              <Paragraph className="light dynamic_wraper">
                                {item.training?.details}
                              </Paragraph>
                            </div>
                            <div className="col-sm-3 col-12 d-flex justify-content-sm-end justify-content-center">
                              <div
                                style={{
                                  width: "104px",
                                  height: "104px",
                                }}
                              >
                                <CircularProgressbarWithChildren
                                  value={item.progress_value}
                                  styles={buildStyles({
                                    pathTransitionDuration: 0.5,
                                    pathColor: "#D0DF00",
                                    trailColor: "#BDBDBD",
                                    backgroundColor: "#fff",
                                  })}
                                >
                                  <span className="progress_percentage light">
                                    {item.progress_value}/{item.progress_max}
                                  </span>
                                </CircularProgressbarWithChildren>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </>
  );
};

export default GymHistory;
