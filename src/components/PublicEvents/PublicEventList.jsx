import React, { useContext } from "react";
import Slider from "react-slick";
import Card from "react-bootstrap/Card";
import Button from "../UI/Button";
import { getEventsList } from "../../apis/Events";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

const PublicEventList = ({}) => {

  const { token, userId, branchId } = useContext(AuthContext);
  const navigate = useNavigate();

  const { error, data: eventsData } = useQuery({
    queryKey: ['get-EventsList', token],
    queryFn: () => getEventsList(token, userId, branchId)
  });

  const settings = {
    dots: false,
    slidesToShow: eventsData?.length > 4 ? 4 : eventsData?.length,
    slidesToScroll: 1,
    arrows: false,
    cssEase: "linear",
    lazyLoad: false,
    infinite: true,
    centerMode: true,
    centerPadding: "40px 0px 0px 0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 3,
        settings: "unslick",
      },
    ],
  };

  return (
    <>
      <div className="col-lg-12">
        <Slider {...settings} className="home-events">
          {eventsData &&
            eventsData.map((event, index) => {
              return (
                <div className="card image-box" key={index}>
                  <img
                    src={event.gallery[0]?.image}
                    className="card-img-top rounded-0"
                    alt={event.event_name}
                    height="400px"
                    style={{
                      objectFit: "cover",
                    }}
                    onClick={() => {
                      navigate(`/events/communityEventsDetails/${event.id}`);
                    }}
                  />

                  <div className="card-body py-4">
                    <h2 className="dynamic_wraper_1"
                      onClick={() => {
                        navigate(`/events/communityEventsDetails/${event.id}`);
                      }}
                    >
                      {event.event_name}
                    </h2>
                    <Card.Text className="my-3 dynamic_wraper">
                      {event.description}
                    </Card.Text>
                    <Button
                      to={`/events/communityEventsDetails/${event.id}`}
                      className="btn_outline_black "
                      tagType="link"
                    >
                      {event.event_type?.name}
                    </Button>
                  </div>
                </div>
              );
            })}
        </Slider>
        {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
      </div>
    </>
  );
};

export default PublicEventList;
