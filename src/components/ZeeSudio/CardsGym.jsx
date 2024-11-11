import React, { useContext } from "react";
import Paragraph from "../UI/Paragraph";
import { getTrainingClasses } from "../../apis/ZeeStudio";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useQuery } from "@tanstack/react-query";
import ZeeCard from "./ZeeCard";
import SkeletonCard from "../UI/SkeletonCard";
import Slider from "react-slick";
import CourseCard from "../OzKnowledge/CourseCard";
const CardsGym = () => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px 0px 0px",
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "60px",
          dots: false,
        },
      },
    ],
  };



  const { token, branchId } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["training"],
    queryFn: ({ signal }) =>
      getTrainingClasses(token, 6, 0, "", "", "", branchId, signal),
  });

  let content = "";
  if (isPending) {
    content = [1, 2, 3].map((n, index) => {
      return (
        <div className="px-sm-2 px-0" key={index}>
          <SkeletonCard />
        </div>
      )
    })
  }

  if (data) {
    if (data.length > 0) {
      content = data?.map((item, index) => {
        return (
          <>
            <div className="col my-2 filter-deskTop-card" key={index}>
              <ZeeCard isPending={isPending} item={item} token={token} />
            </div>

          </>
        );
      });
    } else {
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

        {/* <div className="col filter-mobile-card">
          {data?.map((item, index) => {
            return (<>
              <Slider {...settings} className="slick_knowledge py-5">
                <div className="px-sm-2 px-0" key={index}>
                  <ZeeCard isPending={isPending} item={item} token={token} />
                 
                </div>
              </Slider>
            </>)
          })}
        </div> */}
      </div>
       <div className=" filter-mobile-card">
         <Slider {...settings} className="slick_knowledge py-5">
          {data?.map((item, index) => {
            return (<>
                <div className="px-sm-2 px-0" key={index}>
                  <ZeeCard isPending={isPending} item={item} token={token} />
                 
                </div>
            </>)
          })}
          </Slider>
        </div>
    </>
  );
};

export default CardsGym;
