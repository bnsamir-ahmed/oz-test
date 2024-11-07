import React, { useEffect, useState, useContext } from "react";
import MainHeaderWrapper from "../UI/MainHeaderWrapper";
import Paragraph from "../UI/Paragraph";
import { DataContext } from "../../apis/context/SiteDataContext";
import { Skeleton } from "antd";

const HeaderClasses = () => {

  const { data, isPending, ResetPageName } = useContext(DataContext);
  const [image, setImage] = useState("");

  useEffect(()=>{
    ResetPageName('zee_studio_classes_page');
  },[])

  useEffect(() => {
    const zeeImage = () => {
      data?.map((configItem) => {
        if (configItem.key === "zee_studio_classes_page_image") {
          setImage(configItem.value);
        }
      });
    };
    zeeImage();
  }, [data]);

  return (
    <>
      <MainHeaderWrapper image={image}>
        <div className={`container-fluid px-70 py-5`}>
          <div className="col-md-6 col-12">
            <p className="main_header_title mb-0">Zee Studio</p>
              {isPending ? (
                <Skeleton active paragraph={{ rows: 3 }} />
              ) : (
                data?.map((configItem, index) => (
                  <React.Fragment key={index}>
                    {configItem.key === "zee_studio_classes_page_title" && (
                      <Paragraph className="head_paragraph mb-3">
                      {configItem.value}
                      </Paragraph>
                    )}
                    {configItem.key === "zee_studio_classes_page_description" && (
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
    </>
  );
};

export default HeaderClasses;
