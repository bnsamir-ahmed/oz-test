import React, { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Paragraph from "../UI/Paragraph";
import CardTrainerLink from "../UI/CardTrainerLink";
import { getTrainersList } from "../../apis/ZeeStudio";
import { AuthContext } from "../../apis/context/AuthTokenContext";
import { Skeleton } from "antd";
import SkeletonCard from "../UI/SkeletonCard";

const TrainerLinksCard = () => {
  
  const [trainersList, setTrainersList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(12);
  const [skeleton, setSkeleton] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getClasses = async () => {
      try {
        const result = await getTrainersList(token, signal);
        setTrainersList(result);
        console.log(trainersList);
      } catch (error) {
        console.log(error);
      }
    };
    getClasses();
    return () => controller.abort();
  }, []);

  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  let content = "";
  if (trainersList.length === 0) {
    content = (
      <Paragraph className="empty mb-0">there is not trainers yet</Paragraph>
    );
  }
  if (trainersList) {
    content = trainersList.slice(0, visibleCards).map((item, index) => {
      return (
        <div className="col-xl-4 col-md-6 col-sm-12 my-2" key={index}>
          <CardTrainerLink
            src={item.image}
            title={item.name.slice(0, 25)}
            desc={item.description.slice(0, 100)}
            hrefInsta={item.instagram}
            hrefFace={item.facebook}
            hrefTwi={item.twitter}
          />
        </div>
      );
    });
  }
  return (
    <>
      {console.log("llllllllllllllll")}
      <div className="container-fluid px-70">
        <div className="row py-5">
          <Paragraph className="paragraph_black">Trainers</Paragraph>
          {skeleton ? (
            [1, 2, 3].map((n, index) => (
              <div className="col-4" key={index}>
                <SkeletonCard />
              </div>
            ))
          ) : (
            <>{content}</>
          )}
        </div>
        {trainersList && visibleCards < trainersList.length && (
          <div className="text-center py-5">
            <Button
              tagType="link"
              className="btn button-outLine btn-bg-white"
              onClick={handleShowMore}
            >
              {"View More"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TrainerLinksCard;
