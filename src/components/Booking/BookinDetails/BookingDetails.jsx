import React, { useContext, useState } from 'react';
import BookingDetailsHeader from "./BookDeatilsHeader/BookingDetailsHeader";
import SpaceDetails from "./SpaceDetails/SpaceDetails";
import { useParams, useSearchParams } from 'react-router-dom';
import { getVenueById } from '../../../apis/Booking';
import { AuthContext } from '../../../apis/context/AuthTokenContext';
import { useQuery } from "@tanstack/react-query";

const BookingDetails = () => {

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [searchParams] = useSearchParams();
    const reschedule = searchParams.get("reschedule");

    const { isPending, error, data: venueDetails } = useQuery({
        queryKey: ["get-venue-details", id],
        queryFn: ({ signal }) => getVenueById(token, id, signal),
    });

    const getServices = (services) => {
        setServices(services);
    };

    return (
        <>
            <BookingDetailsHeader
                isPending={isPending}
                venueDetails={venueDetails}
                services={services}
                reschedule={reschedule}
                venue_id={id}
            />
            <SpaceDetails venueDetails={venueDetails} getServices={getServices} reschedule={reschedule} />
        </>
    )
};

export default BookingDetails;
