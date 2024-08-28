import React, { useState, useContext} from 'react';
import '../../../../Booking/BookinDetails/BookingDetails.css';
import BookingForm from "../../../../Booking/BookinDetails/BookDeatilsHeader/BookingForm";
import MainHeaderWrapper from '../../../../UI/MainHeaderWrapper';
import Paragraph from '../../../../UI/Paragraph';
import Button from '../../../../UI/Button';
import AddToFavButton from '../../../../UI/AddToFavButton';
import { AuthContext } from '../../../../../apis/context/AuthTokenContext';
import RequestFormModal from '../../../../Booking/BookingSpace/RequestFormModal';

const BookingDetailsHeader = ({venueDetails, bookingId}) => {

    const [showRequestModal, setShowRequestModal] = useState(false);
    const { token } = useContext(AuthContext);
    
    const handleClose = () => setShowRequestModal(false);
    const handleShow = () => setShowRequestModal(true);

    return (
        <>
            <div className='position-relative booking_details'>
                
                <AddToFavButton is_favorite={venueDetails.is_favorite} id={venueDetails.id} add_fav={true} type={'booking'}/>

                <MainHeaderWrapper 
                    image={(venueDetails?.gallery && venueDetails?.gallery.length !== 0) && venueDetails.gallery} 
                    special_flex={venueDetails.online_booking ? 'justify-content-lg-center justify-content-start' : 'justify-content-center'}
                    height='670px'>
                    <div className="container text-center">
                        <Paragraph className="text-one">Booking</Paragraph>
                        <Paragraph className="text-two mb-4">{venueDetails.title}</Paragraph>
                        {!venueDetails.online_booking && (
                            <Button tagType='link'
                            className="button-outLine"
                            onClick={handleShow}>Book Now</Button>
                        )}
                    </div>
                </MainHeaderWrapper>
                {venueDetails.online_booking && <BookingForm venueDetails={venueDetails} token={token} reschedule={true} bookingId={bookingId} />}
            </div>
            <RequestFormModal 
                show={showRequestModal}
                handleClose={handleClose}
                venueId={venueDetails.id}/>
        </>
    );
};

export default BookingDetailsHeader;
