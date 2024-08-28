import React, { useContext, useEffect, useState } from 'react';
import BookingDetailsHeader from "./Reschedule/BookingDetailsHeader";
import axios from 'axios';
import SpaceDetails from "./Reschedule/SpaceDetails";
import { useParams } from 'react-router-dom';
import { getVenueById } from '../../../../apis/Booking';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import { useQuery } from "@tanstack/react-query";

const RescheduleBooking = () => {

    const {id} = useParams();
    const { token } = useContext(AuthContext);
    const [bookingId, setBookingId] = useState();
    const [services, setServices] = useState([]);

    const { isPending, error, data: venueDetails } = useQuery({
        queryKey: ["get-venue-details-reschdule", id],
        queryFn: ({ signal }) => getVenueById(token, id, signal),
    });

    const getServices = (services) => {
        setServices(services);
    };

    

    // useEffect(()=>{
    //     const source = axios.CancelToken.source();

    //     getVenueById(token, id, source).then(res=>{
    //         setVenueDetails(res);
    //     }).catch(err=>{console.log(err);});
        
    //     return ()=>source.cancel(); 
    // },[id, token]);

    const getId = (id) => {
        setBookingId(id)
    };

    return (
        <>
            <BookingDetailsHeader venueDetails={venueDetails} bookingId={bookingId}/>
            <SpaceDetails venueDetails={venueDetails} getId={getId} />
        </>
    )
}
export default RescheduleBooking;