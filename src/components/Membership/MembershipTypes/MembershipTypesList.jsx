import React from "react";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import { useNavigate } from "react-router-dom";

const MembershipTypesList = ({ id, image, name, description, className }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card text-start">
        <img
          src={image}
          className="card-img-top"
          alt={name}
          onClick={() => navigate(`/membership/${id}`)}
        />
        <div className={`card-body ${className} d-flex flex-column`}>
          <h2 className="card-title mx-0">{name}</h2>
          <Paragraph className='dynamic_wraper'>
            {description}
          </Paragraph>
          <Button
            tagType="link"
            to={`/membership/${id}`}
            name={name}
            className="btn button-outLine btn-bg-white mx-sm-0 mx-auto"
          >
            Find out more
          </Button>
        </div>
      </div>
    </>
  );
};

export default MembershipTypesList;
