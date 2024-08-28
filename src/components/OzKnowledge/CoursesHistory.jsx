import { Tab, Nav } from "react-bootstrap";
import Paragraph from "../UI/Paragraph";
import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useState, useEffect, useContext } from "react";
import { KnowledgeHistory } from "../../apis/OzKnowledge";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
 
const CoursesHistory = () => {

  const { token } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("active");
  const [planData, setPlanData] = useState([]);

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['Knowledge-history'],
    queryFn: ({signal}) => KnowledgeHistory(token, signal)
  });

  useEffect(() => {
    if(data) {
      const initialTab = Object.keys(data)[0];
      setActiveTab(initialTab);
      setPlanData(data[initialTab]);
    }
  }, [data]);

  const HandleActive = (value) => {
    setActiveTab(value);
    setPlanData(data[value]);
  };

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab}>
        <div className="navigator border_bottom">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h1 className="title-name mb-0">OZ Knowledge History</h1>
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
                      <>
                        <Nav.Item key={index}>
                          <Nav.Link
                            eventKey={item}
                            onClick={() => HandleActive(item)}
                            className="booking_navlink"
                          >
                            {item}
                          </Nav.Link>
                        </Nav.Item>
                      </>
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
            {planData && planData.length === 0 && (
              <Paragraph className="empty">{`there is not ${activeTab} courses yet`}</Paragraph>
            )}

            <Tab.Pane eventKey={activeTab}>
              {planData &&
                planData?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="card card_event my-3 px-2"
                        key={index}
                        onClick={() => {
                          navigate(`/coursetracting/${item.id}`);
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 p-0">
                            <img
                              src={item.training?.image}
                              alt="event-img"
                              height="256px"
                              width="100%"
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 d-flex align-items-center ps-4">
                            <div
                              className="p-2"
                              style={{
                                width: "100%",
                              }}
                            >
                              <Paragraph className="course_date">
                                Date Submitted:{" "}
                                {moment(item.invoice_date).format(
                                  "MMM DD, YYYY"
                                )}
                              </Paragraph>
                              <Paragraph className="course_details_title">
                                {item.training?.title}
                              </Paragraph>
                              <Paragraph className="course_categorey">
                                Category: {item.training?.category.title}
                              </Paragraph>
                              <Paragraph className="course_desc dynamic_wraper">
                                {item.training?.details}
                              </Paragraph>
                              {activeTab === "active" ? (
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="col-11">
                                    <ProgressBar
                                      completed={item.progress_value}
                                      bgColor={"#D0DF00"}
                                      baseBgColor={"#C5CED340"}
                                    />
                                  </div>
                                  <span className="completed_percentage">
                                    {item.progress_value}%
                                  </span>
                                </div>
                              ) : (
                                <Paragraph className="mb-0 course_complete">course completed</Paragraph>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </>
  );
};
export default CoursesHistory;
