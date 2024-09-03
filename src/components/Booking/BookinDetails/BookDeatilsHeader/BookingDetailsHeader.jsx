import React, { useState, useContext } from 'react';
import '../BookingDetails.css';
import BookingForm from "./BookingForm";
import MainHeaderWrapper from '../../../UI/MainHeaderWrapper';
import Paragraph from '../../../UI/Paragraph';
import Button from '../../../UI/Button';
import { AuthContext } from '../../../../apis/context/AuthTokenContext';
import RequestFormModal from '../../BookingSpace/RequestFormModal';
import AddToFavButton from '../../../UI/AddToFavButton';
import { Skeleton } from 'antd';

const BookingDetailsHeader = ({ venueDetails, services, reschedule, isPending }) => {

    const [showRequestModal, setShowRequestModal] = useState(false);
    const { token } = useContext(AuthContext);

    const handleClose = () => setShowRequestModal(false);
    const handleShow = () => setShowRequestModal(true);

    return (
        <>
            <div className='position-relative booking_details'>
                <AddToFavButton is_favorite={venueDetails?.is_favorite} id={venueDetails?.id} add_fav={true} type={'booking'} />

                <MainHeaderWrapper
                    image={(venueDetails?.gallery && venueDetails?.gallery.length !== 0) && venueDetails?.gallery}
                    special_flex={venueDetails?.online_booking ? 'justify-content-lg-center justify-content-start' : 'justify-content-center'}
                    height='670px'>
                    <div className="container text-center">
                        <Paragraph className="text-one">Booking</Paragraph>
                        {isPending ? <Skeleton active paragraph={{ rows: 0 }} className="mb-4" /> : <Paragraph className="text-two mb-4">{venueDetails?.title}</Paragraph>}
                        {isPending ? <Skeleton.Button style={{ width: 80 }} active /> : (
                            !venueDetails?.online_booking && (
                                <Button tagType='link'
                                    className="button-outLine"
                                    onClick={handleShow}>Book Now</Button>
                            )
                        )}
                    </div>
                </MainHeaderWrapper>
                {venueDetails?.online_booking && <BookingForm venueDetails={venueDetails} token={token} services={services} reschedule={reschedule} />}
            </div>
            <RequestFormModal
                show={showRequestModal}
                handleClose={handleClose}
                venueId={venueDetails?.id} />
        </>
    );
};

export default BookingDetailsHeader;
