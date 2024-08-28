import Modaion from "../../assets/images/modation.jpg";
import Paragraph from "../UI/Paragraph";
import Slider from "react-slick";
import Button from "../UI/Button";
import Media from "../Media/Media";
import { useEffect, useState, useContext } from "react";
import { getTrainersList } from "../../apis/ZeeStudio";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as DOMPurify from 'dompurify';

const BestTrainers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { token } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ["Trainer"],
    queryFn: ({ signal }) => getTrainersList(token, signal),
  });

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    cssEase: "linear",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: true,
    beforeChange: (_, nextSlide) => handleSlideChange(nextSlide),
    responsive: [
      {
        breakpoint: 425,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <section className="popularInstructor border-of-section">
        <div className="head-content-sec">
          <Paragraph className="head_feature">Our Trainers</Paragraph>
        </div>
        <div
          className="border-of-section"
          style={{
            borderBottom: "none",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-md-7 col-12 border-right">
                <Slider {...settings}>
                  {data?.map((trainer) => (
                    <div className="img_block" key={trainer?.id}>
                      {isPending ? (
                        <Skeleton.Image className="w-100 my-5" active />
                      ) : (
                        <Media
                          type="img"
                          src={trainer?.image}
                          className="w-100 image-box"
                          alt={trainer?.name}
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-lg-4 col-md-5 col-12 my-auto ">
                <div className="box-content p-lg-4 p-3">
                  {data?.length > 0 && (
                    <>
                      {isPending ? (
                        <Skeleton active />
                      ) : (
                        <>
                          <Paragraph className="paragraph_black">
                            {data[currentSlide]?.name}
                          </Paragraph>
                          <Paragraph className="courses_jobTitle">
                            {data[currentSlide]?.category.title}
                          </Paragraph>
                          <div className='description_black py-2' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data[currentSlide]?.description) }}></div>
                        </>
                      )}
                    </>
                  )}
                  <Button
                    tagType="link"
                    className="btn button-outLine btn-bg-white"
                    to={"/ourtrainer"}
                  >
                    Explore More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestTrainers;
