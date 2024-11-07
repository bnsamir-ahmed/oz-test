import { useContext } from 'react';
import { KnowledgeHome } from '../../apis/OzKnowledge';
import { AuthContext } from '../../apis/context/AuthTokenContext';
import { useQuery } from '@tanstack/react-query';
import { Alert } from 'antd';
import SkeletonCard from '../UI/SkeletonCard';
import Slider from "react-slick";
import Paragraph from '../UI/Paragraph';
import CourseCard from './CourseCard';

const PopularCourses = () => {
  const { token, branchId } = useContext(AuthContext);

  const { isPending, error, data: courses } = useQuery({
    queryKey: ['KnowledgeHome-Courses'],
    queryFn: ({ signal }) => KnowledgeHome(token, branchId, signal)
  });

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

  return (
    <>
      <section className="my-5">
        <div
          className="border-of-section head-content-sec"
          style={{
            borderBottom: "none",
          }}
        >
          <Paragraph className="head_feature">
            Most Popular Course
          </Paragraph>
        </div>
        <div
          className="border-of-section"
          style={{
            borderBottom: "none",
          }}
        >
          <div
            className="container-fluid px-70 pe-sm-0"
            style={{
              overflow: "hidden",
            }}
          >
            <div className="row py-5 align-items-center">
              <div className="col-lg-3 col-md-4 col-12">
                <Paragraph className="h2-text-box">
                  Our Popular Courses
                </Paragraph>
              </div>
              <div className="col-lg-9 col-md-8 col-12">
                {error && (<Alert message={error.message} type="error" showIcon />)}
                <Slider {...settings} className="slick_knowledge py-5">
                  {isPending &&
                    [1, 2, 3, 4, 5].map((n, index) => {
                      return (
                        <div className="px-sm-2 px-0" key={index}>
                          <SkeletonCard />
                        </div>
                      )
                    })}
                  {
                    courses?.recommended_courses?.map((item, index) => {
                      return (
                        <div className="px-sm-2 px-0" key={index}>
                          <CourseCard
                            coursesDetails={item}
                          />


                        </div>
                      );
                    })}
                    {/* {courses?.recommended_trainers?.map((item , index)=>{
                      return(
                        <div key={index} className='className="px-sm-2 px-0'>
                        {console.log(item.name)}
                        <CourseCard
                            coursesDetails={item}
                          />
                        </div>
                      )
                    })} */}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PopularCourses;