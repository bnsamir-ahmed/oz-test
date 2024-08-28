import React from "react";
import "./Content.css";
import Buttons from "../../Buttons/Buttons";
import Media from "../../Media/Media";
import vision from "../../../assets/images/vision.png";
import HeadFeature from "../../UI/HeadFeature";
import ParagraphBlack from "../../UI/ParagraphBlack";
import DescriptionBlack from "../../UI/DescriptionBlack";
const RightContent = (props) => {
    return (
        <>
            <section className=" ">
                <div className="container-fluid">

                       {props.configData ? props.configData.map((configItem , index)=>(
                                <React.Fragment key={index}> 
                    <div className="row">
                        <div className="col-lg-12">
                            {configItem.key === "home_page_newsfeed_title" && 
                             <div className="head-content-sec">
                                 <HeadFeature HeadFeature={configItem.value}/>                              
                             </div> }     
                        </div>
                    </div>
                                </React.Fragment>
                            )):''}
                    <div className="row R-flex border-of-section ">
                             {props.configData ? props.configData.map((configItem , index)=>(
                        <React.Fragment key={index}>
                             {configItem.key === "home_page_newsfeed_image" && 
                         <div className="col-md-6 col-lg-8 col-sm-12 col-xs-6 border-right">
                           <Media type="img"
                                   className="image-box w-100"
                                   src={configItem.value}
                                   alt="Our OZ Vision"
                            />
                         </div>
                             }
                            {configItem.key === "home_page_newsfeed_description" &&
                                <div className="col-md-6 col-lg-4 col-sm-12 col-xs-6 m-auto ">
                                  <div className="box-content px-60">
                                    <ParagraphBlack titleBox={configItem.value}/>
                                     <DescriptionBlack descBlack={configItem.value}/>

                                
                                     <Buttons href="/community/newsfeed"> Explore</Buttons>
                                  </div>
                                </div>
                             }
                       </React.Fragment>
                            )):''}
                    </div>
                </div>
            </section>
        </>
    );
};

export default RightContent;
