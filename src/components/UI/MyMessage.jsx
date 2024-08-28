import React from 'react'
import Paragraph from './Paragraph';
const MyMessage = ({src, message}) => {
        return (
          <>
            <div className="m-4 d-flex align-items-start">
              <img src={src} alt="img" className="me-4" width={'40px'} height={'40px'}/>
                <Paragraph className="send py-2 px-3">{message}</Paragraph>
              </div>
          </>
        );

}

export default MyMessage;
