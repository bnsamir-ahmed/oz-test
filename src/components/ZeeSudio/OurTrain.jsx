import Paragraph from "../UI/Paragraph";
import { Link } from "react-router-dom";
import CardsGym from "./CardsGym";

const OurTrain = () => {

  return (
    <>
      <div className="container-fluid ">
        <div className="row border-of-section">
          <div className="col-lg-12">
            <div className="head-content-sec">
              <Paragraph className="head_feature">Upcoming Classes</Paragraph>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5 px-70">
        <div className="col-12 d-flex justify-content-between">
          <Paragraph className="card-title">OUR TRAINING</Paragraph>

          <Link className="btn_default btn_outline_black " to="/ourgymclasses">
            More Class
          </Link>
        </div>
        <CardsGym />
      </div>
    </>
  );
};

export default OurTrain;
