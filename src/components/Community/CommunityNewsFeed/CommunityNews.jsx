import React from "react";
import "./CommunityNewsFeed.css";
import Slider from "react-slick";
import { Element } from "react-scroll";
import { NavLink } from "react-router-dom";
import Paragraph from "../../UI/Paragraph";
import { getCommunityNewsFeed } from "../../../apis/Events";
import Media from "../../Media/Media";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";

const CommunityNews = (props) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    cssEase: "linear",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: true,
  };

  const { data: newsData, isPending } = useQuery({
    queryKey: ['newsFeed-slider'],
    queryFn: () => getCommunityNewsFeed('yes')
  });

  return (
    <>
      <Element name="community-newsfeed">
        <section className="news-feed">
          <div className="container-fluid">
            <div className="row border-of-section flex_reverse">
              <div className="col-lg-4 col-md-5 col-12 m-auto">
                <div className="box-content p-lg-4 p-3">
                  {props.pending ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                  ) : (
                    props.configData.map((configItem, index) => (
                      <React.Fragment key={index}>
                        {configItem.key === "community_page_newsfeed_title" && (
                          <Paragraph className="paragraph_black black ">
                            {configItem.value}
                          </Paragraph>
                        )}
                        {configItem.key ===
                          "community_page_newsfeed_description" && (
                            <Paragraph
                              className={" mb-5 monoBlock_description black"}
                            >
                              {configItem.value}
                            </Paragraph>
                          )}
                      </React.Fragment>
                    ))
                  )}
                  {/* <NavLink
                    to={"/community/newsfeed"}
                    className="btn button-outLine btn-bg-white mx-0"
                  >
                    Explore
                  </NavLink> */}
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-12 border-left img_block">
                {isPending ? (
                  <Skeleton.Image active className="image-box w-100" />
                ) : (
                  <Slider {...settings} className="news-feed">
                    {newsData &&
                      newsData['slider'].map((news) => {
                        const { id, banner } = news;
                        return (
                          <div key={id}>
                            <Media
                              type="img"
                              src={banner}
                              alt="img"
                              className="image-box w-100"
                            />
                          </div>
                        );
                      })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </section>
      </Element>
    </>
  );
};

export default CommunityNews;
