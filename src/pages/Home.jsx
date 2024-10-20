import React, { useContext, useEffect, useState } from "react";
import MainHeaderWrapper from "../components/UI/MainHeaderWrapper";
import SectionHeader from "../components/UI/SectionHeader";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import PublicEvent from "../components/PublicEvents/PublicEvent";
import Locations from "../components/Locations/Locations";
import LeftContent from "../components/Home/ContentComponent/LeftContent";
import MonoBlockTitle from "../components/MonoBlocks/MonoBlockTitle";
import MonoBlockMember from "../components/MonoBlocks/MonoBlockMember";
import RightContentFB from "../components/Home/ContentComponent/RightContentFB";
import RightContentNewFeed from "../components/Home/ContentComponent/RightContentNewFeed";
import { DataContext } from "../apis/context/SiteDataContext";
import HomeMembership from "../components/Home/HomeMembership";
import OurSpaces from "../components/Home/OurSpaces";
import OZAmenities from "../components/Home/OZAmenities";
import ExploreOZ from "../components/Home/ExploreOZ";
import ZeeStudio from "../components/Home/ZeeStudio";
import OZKnowledge from "../components/Home/OZKnowledge";
import {Helmet} from "react-helmet";

const Home = () => {
  const [video, setVideo] = useState("");
  const { ResetPageName, isPending, data, error, getComponentValue } = useContext(DataContext);

  useEffect(() => {
    ResetPageName('home')
    const bookingVideo = () => {
      getComponentValue("header")?.map((configItem) => {
        if (configItem.key === "home_page_header_video") {
          setVideo(configItem.value);
        }
      });
    };
    bookingVideo();
  }, [data]);

  return (
    <>
    {/* this <Helmet> tag is for SEO and better add more data or allow client to add it from dashboard and make an api call */}
      <Helmet>
          <title>OZ-coworking park | Home</title>
          <meta name="description" content="OZ-coworking park" />
      </Helmet>
      <MainHeaderWrapper configData={getComponentValue("header")} video={video}>
        <SectionHeader
          configData={getComponentValue("header")}
          video={video}
          pending={isPending}
        />
      </MainHeaderWrapper>
      <MonoBlockTitle
        configData={getComponentValue("mono_block")}
        pending={isPending}
      />
      <LeftContent
        configData={getComponentValue("page_about")}
        pending={isPending}
      />
      <RightContentNewFeed
        configData={getComponentValue("page_newsfeed")}
        pending={isPending}
      />
      <HomeMembership
        configData={getComponentValue("page_membership")}
        pending={isPending}
      />
      <OurSpaces
        configData={getComponentValue("page_space")}
        pending={isPending}
      />
      <OZAmenities
        configData={getComponentValue("page_benefit")}
        pending={isPending}
      />
      <ExploreOZ
        configData={getComponentValue("explore_space")}
        pending={isPending}
      />
      <PublicEvent
        configData={getComponentValue("page_event")}
        pending={isPending}
      />
      <ZeeStudio
        configData={getComponentValue("page_zee")}
        pending={isPending}
      />
      <OZKnowledge
        configData={getComponentValue("page_courses")}
        pending={isPending}
      />
      {/* <RightContentFB
        configData={getComponentValue("page_ozy")}
        pending={isPending}
      /> */}
      <MonoBlockMember
        configData={getComponentValue("page_membership")}
        pending={isPending}
      />
      <Locations configData={getComponentValue("page_location")} />
      <NewsLetter />
    </>
  );
};

export default React.memo(Home);
