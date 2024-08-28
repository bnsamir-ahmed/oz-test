import React, { useContext, useEffect } from 'react';
import BookingHeader from "../components/Booking/BookingHeader/BookingHeader";
import BookingSpace from "../components/Booking/BookingSpace/BookingSpace";
import { DataContext } from '../apis/context/SiteDataContext';

const Booking = () => {

    const { data, isPending, ResetPageName } = useContext(DataContext);

    useEffect(()=>{
        ResetPageName('booking');
        localStorage.removeItem("BookingOZDetails");
        localStorage.removeItem("BookingOZServices");
        localStorage.removeItem("BookingOZDetailsId");
    },[]);

    return (
      <>
        <BookingHeader configData={data} pending={isPending} />
        <BookingSpace />
      </>
    );
};

export default React.memo(Booking);
