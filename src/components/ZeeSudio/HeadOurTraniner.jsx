import React, { useEffect, useContext, useState } from "react";
import Class from "../../assets/images/TrainerBg.jpg";
import MainHeaderWrapper from "../UI/MainHeaderWrapper";
import Paragraph from "../UI/Paragraph";
import { Skeleton } from "antd";
import { DataContext } from "../../apis/context/SiteDataContext";

const HeadOurTrainer = () => {

  const { data, isPending, ResetPageName } = useContext(DataContext);
  const [image, setImage] = useState('');

  useEffect(()=>{
      ResetPageName('trainers_page');
  },[]);

  useEffect(()=>{
    const trainerImage = () => {
      data?.map((configItem) => {
        if (configItem.key === "trainers_page_image") {
          setImage(configItem.value);
        }
      });
    };
    trainerImage();
  },[data]);

  return (
    <>
      <MainHeaderWrapper image={image}>
        <div className={`container-fluid px-70 py-5`}>
          <div className="col-md-6 col-12">
            <p className="main_header_title mb-0">Zee Studio</p>
            {isPending ? (
              <Skeleton active title={true} paragraph={{rows: 3}} />
            ) : (
              <>
              {data && data?.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "trainers_page_title" && (
                        <Paragraph className='head_paragraph mb-3'>{configItem.value}</Paragraph>
                    )}
                    {configItem.key === "trainers_page_description" && (
                        <Paragraph className='description mb-0'>{configItem.value}</Paragraph>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </div>
      </MainHeaderWrapper>
    </>
  );
};

export default HeadOurTrainer;
