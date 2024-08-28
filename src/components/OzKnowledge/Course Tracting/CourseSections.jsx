import Paragraph from "../../UI/Paragraph";
import bullet from "../../../assets/images/icons/bullet.svg";

const CourseSections = ({ details }) => {
  return (
    <>
      <section className="container-fluid px-70 py-5">
        <Paragraph className="head-form mb-5">
          {"Our courses are balanced mix of Session & articles"}
        </Paragraph>
        <div className="d-flex align-items-center justify-content-start">
          <div>
            <span className="completed_percentage">
              {details?.video_lessons}
              {" lessons"}
            </span>
          </div>
          <div>
            <img src={bullet} alt="" className="mx-2" />
            <span className="completed_percentage">
              {details?.session_count} Session
            </span>
          </div>
          <div>
            <img src={bullet} alt="" className="mx-2" />
            <span className="completed_percentage">
              {details?.total_assignment} {"Assignments"}
            </span>
          </div>
          <div>
            <img src={bullet} alt="" className="mx-2" />
            <span className="completed_percentage">
              {details?.course_hours} {" Complition Time"}
            </span>
          </div>
        </div>
        <ul className="details_list mt-4 mb-5 p-0">
          {details?.sessions.map((item, index) => {
            return (
              <>
                <li
                  className="list_item d-flex flex-wrap justify-content-between align-items-center p-3"
                  key={index}
                >
                  <div className="py-sm-0 py-2">
                    {item.attended === 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.0051994 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6934 24 14.3734 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0ZM10.2857 16.7914L6 12.5057L7.36286 11.1429L10.2857 14.0657L16.6371 7.71428L18.0051 9.07371L10.2857 16.7914Z"
                          fill="#05B15D"
                        />
                        <path
                          d="M10.2842 17L6 12.7511L7.36323 11.3991L10.2842 14.296L16.6333 8L18 9.3469L10.2842 17Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="12" fill="#EEF0F7" />
                      </svg>
                    )}

                    <span className="ms-3">{item.title}</span>
                  </div>
                  <Paragraph className="mb-0 hour_details">
                    {item.duration} hours
                  </Paragraph>
                </li>
              </>
            );
          })}
        </ul>
      </section>
    </>
  );
};
export default CourseSections;
