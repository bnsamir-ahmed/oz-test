import React, {useState} from 'react';
import { onMessageListener } from '../../apis/firebase';
import { notification } from 'antd';


const Notification = ({getShowDot}) => {

  const [api, contextHolder] = notification.useNotification();
  const [showDot, setShowDot] = useState(false);
      
    onMessageListener()
        .then((payload) => {
          api['success']({
            message: payload?.notification?.title,
            description: payload?.notification?.body
          });
          setShowDot(true);
          getShowDot(showDot);
        })
        .catch((err) => console.log('failed: ', err));
    
      return(
        <>
            {contextHolder}
        </>
    )
}
export default Notification;