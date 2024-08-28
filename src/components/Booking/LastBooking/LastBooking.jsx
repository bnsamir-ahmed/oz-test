import React, { useState } from 'react';
import './LastBooking.css';
import BookingSpaceList from '../BookingSpace/BookingSpaceList';
import  Button from '../../UI/Button';

const LastBooking = ({cards}) => {

    const [visibleCards, setVisibleCards] = useState(3);

    const handleShowMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 3);
    };
    
    return (
        <>
            <section className="last-booking border-top p-60">
                <div className="container-fluid px-70">
                    <div className="booking-section">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="h2-text-box">last booking</h2>
                            </div>
                            {cards && cards?.slice(0, visibleCards).map((book) => {
                                    return (
                                        <>
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={book?.id}>
                                                <BookingSpaceList 
                                                    id={book.venueData.id}
                                                    place_type={book.venueData.title} 
                                                    img={book.venueData.gallery[0]?.image}
                                                    name={book.venueData.title} 
                                                    description={book.venueData.description}
                                                    amenities={book.venueData.facilities} 
                                                    price={book.venueData.price}
                                                    is_favorite={book.venueData.is_favorite}/>
                                            </div>
                                        </>
                                    )
                            })}
                        </div>
                        {cards && visibleCards < cards?.length && (
                            <div className='d-flex my-5 mx-auto'>
                                <Button 
                                    tagType="link" 
                                    className="btn-cards-more align-items-center" 
                                    onClick={handleShowMore}>Show more
                                    <svg className='ms-1' width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="expand_more" d="M4.00451 4.5C3.90895 4.5 3.81937 4.4856 3.73576 4.45681C3.65214 4.42847 3.5745 4.38002 3.50283 4.31146L0.188191 1.14051C0.0567994 1.01482 -0.00579067 0.857585 0.000420551 0.668814C0.00615399 0.4805 0.0747161 0.323495 0.206107 0.1978C0.337499 0.0721046 0.504724 0.00925661 0.707783 0.00925661C0.910843 0.00925661 1.07807 0.0721046 1.20946 0.1978L4.00451 2.87168L6.81748 0.180659C6.94887 0.0549639 7.11323 -0.00514088 7.31055 0.000344001C7.5074 0.00628595 7.67152 0.0721046 7.80291 0.1978C7.9343 0.323495 8 0.48347 8 0.677726C8 0.871982 7.9343 1.03196 7.80291 1.15765L4.50619 4.31146C4.43452 4.38002 4.35688 4.42847 4.27327 4.45681C4.18965 4.4856 4.10007 4.5 4.00451 4.5Z" fill="black"/>
                                    </svg>
                                </Button>
                            </div>
                        )}
                    </div>

                </div>
            </section>

        </>
    );
};

export default LastBooking;
