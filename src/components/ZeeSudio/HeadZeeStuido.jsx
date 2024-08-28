import React, { useEffect, useState, useContext } from "react";
import MainHeaderWrapper from "../UI/MainHeaderWrapper";
import Paragraph from "../UI/Paragraph";
import { DataContext } from "../../apis/context/SiteDataContext";
import { Skeleton } from "antd";

const HeadZeeStuido = () => {

  const { data, isPending, ResetPageName } = useContext(DataContext);
  const [image, setImage] = useState("");

  useEffect(()=>{
    ResetPageName('zee_studio_website');
  },[])

  useEffect(() => {
    const zeeImage = () => {
      data?.map((configItem) => {
        if (configItem.key === "zee_studio_website_image") {
          setImage(configItem.value);
        }
      });
    };
    zeeImage();
  }, [data]);
  
  return (
    <>
      <MainHeaderWrapper image={image}>
        <div className={`container-fluid px-70`}>
          <div className="col-xl-6 col-lg-9 col-12">
          {isPending ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              data?.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === "zee_studio_website_title" && (
                    <Paragraph className="head_paragraph mb-3">
                    {configItem.value}
                    </Paragraph>
                  )}
                  {configItem.key === "zee_studio_website_header_description" && (
                    <Paragraph className="description mb-0">
                      {configItem.value}
                    </Paragraph>
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </MainHeaderWrapper>
      <div className="container-fluid px-70 py-5">
        <Paragraph className="card-title">Description Membership</Paragraph>
        {isPending ? (
          <Skeleton
            active
            className="py-3"
            title={false}
            paragraph={{ row: 2 }}
          />
        ) : (
          <>
            {data?.map((configItem, index) => (
                <React.Fragment key={index}>
                  {configItem.key === "zee_studio_website_main_description" && (
                    <Paragraph className="description_black pt-3">
                      {configItem.value}
                    </Paragraph>
                  )}
                </React.Fragment>
              ))
            }
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(HeadZeeStuido);
