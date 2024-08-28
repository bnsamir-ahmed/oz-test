import React from "react";
import Paragraph from "./Paragraph";
const YourMessage = ({src, message}) => {
  return (
    <>
      <div className=" m-4 d-flex justify-content-end  align-items-start">
        <div className="rtl">      
          <Paragraph className="send_black py-2 px-3">
            {message}
          </Paragraph>
        </div>
        <img src={src} alt="img" className="ms-4" width={'40px'} height={'40px'}/>
      </div>
    </>
  );
};

export default YourMessage;
