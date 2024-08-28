import Paragraph from '../../UI/Paragraph';
import ProgressBar from "@ramonak/react-progress-bar";
import moment from 'moment';

const CourseProgress = ({ details }) => {
  return (
    <>
      <section className="container-fluid px-70 py-5">
        <Paragraph className="details_header mb-3">
          Course Details
        </Paragraph>
        <div className="head-form">
          <h2>Time Progress</h2>
        </div>
        <div className="d-flex">
          <div className="col-11">
            <ProgressBar
              completed={details?.progress_value}
              bgColor={"#D0DF00"}
              baseBgColor={"#C5CED340"}
            />
            <div className="my-3 d-flex justify-content-between">
              <span className="grey-span">{moment(details?.training?.start_date).format("MMM DD, YYYY")}</span>
              <span className="grey-span">{moment(details?.training?.end_date).format("MMM DD, YYYY")}</span>
            </div>
          </div>
          <span className="completed_percentage ms-sm-3 ms-1">
            {details?.progress_value}%
          </span>
        </div>
      </section>
    </>
  );
};
export default CourseProgress;