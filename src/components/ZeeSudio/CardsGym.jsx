import React, { useContext } from "react";
import Paragraph from "../UI/Paragraph";
import { getTrainingClasses } from "../../apis/ZeeStudio";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useQuery } from "@tanstack/react-query";
import ZeeCard from "./ZeeCard";
import SkeletonCard from "../UI/SkeletonCard";

const CardsGym = () => {

  const { token, branchId } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["training"],
    queryFn: ({ signal }) =>
      getTrainingClasses(token, 6, 0, "", "", "", branchId, signal),
  });

  let content = "";
  if(isPending){
    content = [1,2,3].map((n,index)=>{
      return (
        <div className="px-sm-2 px-0" key={index}>
            <SkeletonCard />
        </div>
     )
    })
  }

  if (data) {
    if(data.length > 0){
      content = data?.map((item, index) => {
        return (
          <div className="col my-2" key={index}>
            <ZeeCard isPending={isPending} item={item} />
          </div>
        );
      });
    }else{
      content = (
        <Paragraph className="empty mb-0">there is not classes yet</Paragraph>
      );
    }
  }
  return (
    <>
      {error && (<div class="alert alert-danger" role="alert">
        {error.message}
      </div>)}
      <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-1 py-5">
        {content}
      </div>
    </>
  );
};

export default CardsGym;
