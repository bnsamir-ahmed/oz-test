import React, { useContext } from "react";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { getTrainingClasses } from "../../apis/ZeeStudio";
import ZeeCard from './ZeeCard';

const CardsClasses = ({ classesGym, getLimit , pending }) => {

  const { token } = useContext(AuthContext);
  
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["training"],
  //   queryFn: ({ signal }) =>
  //     getTrainingClasses(token, 6, 0, "", "", "", signal),
  // });

  let content = "";
  // if () {
    // }
    if (classesGym) {
      if(classesGym.length === 0){
          content = (
            <Paragraph className="empty mb-0">there is not classes yet</Paragraph>
          );
      }else{
        content = classesGym?.map((item, index) => {
          return (
            <div className="col my-2" key={index}>
              <ZeeCard isPending={pending} item={item} />
            </div>
          );
        });
      }
  };

  const HandelShowMore = (e) => {
    e.stopPropagation();

    // setLimit((prevLimit) => prevLimit + 3);
    // getLimit(limit);
  
  };

  return (
    <>
      <div className="container-fluid  special_padding px-70 py-5">
        <div className="row py-5">
          <Paragraph className="fs-4">
            <span className="card-title mx-2">{classesGym?.length}</span>
            Results Founds
          </Paragraph>
        </div>
        <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-1 py-5">
          {content}
        </div>
        <div className="text-center">
          <Button
            tagType="button"
            onClick={HandelShowMore}
            className="btn button-outLine btn-bg-white m-auto-unset"
          >
            View More
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardsClasses;
