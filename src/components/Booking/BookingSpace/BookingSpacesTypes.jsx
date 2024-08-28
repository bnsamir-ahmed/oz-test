import React, { useEffect, useState, useContext } from 'react';
import BookingFilter from "../BookingFilter/BookingFilter";
import BookingSpaceList from "./BookingSpaceList";
import Button from '../../UI/Button';
import Paragraph from '../../UI/Paragraph';
import { searchVenues, } from '../../../apis/FilterBooking';
import { AuthContext } from '../../../apis/context/AuthTokenContext';

const BookingSpacesTypes = ({ venues, placeId, spaceTitle }) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [cards, setCards] = useState(...Object.values(venues));
    const [error, setError] = useState('');
    const [empty, setEmpty] = useState('');
    const [visibleCards, setVisibleCards] = useState(3);
    const { token, userId } = useContext(AuthContext);

    useEffect(() => {
        if (venues.length === 0) {
            setEmpty('there is no venues in this amenity group');
        } else {
            setEmpty('');
            setError('');
        }
        setCards(...Object.values(venues)?.slice(0, 3));
    }, [venues]);

    const handleShowMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 3);
    };

    const toggleFilter = (e) => {
        e.preventDefault();
        setIsFilterOpen(!isFilterOpen);
    };

    const handelSearch = (event) => {
        searchVenues(token, userId, placeId, event.target.value).then(res => {
            setCards(...Object.values(res)?.slice(0, 3));
            if (Object.values(res)[0]?.length === 0) {
                setEmpty('there is no venues in this amenity group');
            } else {
                setEmpty('');
            }
        }).catch(err => {
            if (err) {
                setError(err.response.data.message);
                setEmpty('');
            } else {
                setError('');
                setEmpty('');
            }
        })
    };

    const getFilteredData = (data) => {
        setCards(...Object.values(data)?.slice(0, 3));
        if (Object.values(data)[0]?.length === 0) {
            setEmpty('there is no venues yet!');
        } else {
            setEmpty('');
        }
    };

    return (
        <>
            <div className='container-fluid'>
                <div className="row border-top  border-bottom booking-space-margin align-items-center">
                    <div className="col-lg-4 col-12 d-flex justify-content-center">
                        <div className='d-flex align-items-center'>
                            {spaceTitle && <h2 className="book-title mb-0">{spaceTitle}</h2>}
                            <svg className='d-lg-block d-none' xmlns="http://www.w3.org/2000/svg" width="2" height="127" viewBox="0 0 2 127" fill="none">
                                <path d="M1 0L1.00001 127" stroke="#BDBDBD" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`col-lg-8 col-12 px-3 d-flex flex-wrap align-items-center justify-content-end`}>
                        <div className="btn-spaces-filter">
                            <Button
                                tagType='link'
                                className="button-outLine px-4 btn-bg-white btn-filter text-center"
                                onClick={toggleFilter}
                            >
                                <svg className='me-3' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Group">
                                        <g id="Vector">
                                            <path d="M18.1538 8.61538V10.4615C19.0031 10.4615 19.6923 11.1508 19.6923 12H20.6154V11.0769H21.4102C21.254 10.5261 20.9592 10.0188 20.5471 9.60671C19.9124 8.97198 19.0515 8.61538 18.1538 8.61538Z" fill="#BDBDBD" />
                                            <path d="M21.4102 11.0769H20.6154V12H21.5385C21.5385 11.6851 21.4946 11.3746 21.4102 11.0769Z" fill="#BDBDBD" />
                                            <path d="M23.0769 12.9231C23.3217 12.9231 23.5565 12.8258 23.7296 12.6527C23.9027 12.4796 24 12.2448 24 12C24 11.7552 23.9027 11.5204 23.7296 11.3473C23.5565 11.1742 23.3217 11.0769 23.0769 11.0769V12.9231Z" fill="#BDBDBD" />
                                            <path d="M23.0769 12.9231V11.0769H21.4102C21.4946 11.3746 21.5385 11.6851 21.5385 12C21.5385 12.3149 21.4946 12.6254 21.4102 12.9231H23.0769Z" fill="#BDBDBD" />
                                            <path d="M20.6154 12.9231H21.4102C21.4946 12.6254 21.5385 12.3149 21.5385 12H20.6154V12.9231Z" fill="#BDBDBD" />
                                            <path d="M19.6923 12C19.6923 12.8492 19.0031 13.5385 18.1538 13.5385V15.3846C19.0515 15.3846 19.9124 15.028 20.5471 14.3933C20.9592 13.9812 21.254 13.4739 21.4102 12.9231H20.6154V12H19.6923Z" fill="#BDBDBD" />
                                            <path d="M18.1538 15.3846V13.5385C17.3046 13.5385 16.6154 12.8492 16.6154 12H14.7692C14.7692 12.8977 15.1258 13.7585 15.7606 14.3933C16.3953 15.028 17.2562 15.3846 18.1538 15.3846Z" fill="#BDBDBD" />
                                            <path d="M14.7692 12H16.6154C16.6154 11.1508 17.3046 10.4615 18.1538 10.4615V8.61538C17.2562 8.61538 16.3953 8.97198 15.7606 9.60671C15.1258 10.2415 14.7692 11.1023 14.7692 12Z" fill="#BDBDBD" />
                                            <path className='fill_white' fill-rule="evenodd" clip-rule="evenodd" d="M0.923077 2.46154C0.678262 2.46154 0.443473 2.55879 0.270363 2.7319C0.0972523 2.90501 0 3.1398 0 3.38462C0 3.62943 0.0972523 3.86422 0.270363 4.03733C0.443473 4.21044 0.678262 4.30769 0.923077 4.30769H8.74368C8.89985 4.85852 9.19468 5.36586 9.60671 5.7779C10.2415 6.41264 11.1023 6.76923 12 6.76923C12.8977 6.76923 13.7585 6.41264 14.3933 5.7779C14.8053 5.36586 15.1002 4.85852 15.2563 4.30769H23.0769C23.3217 4.30769 23.5565 4.21044 23.7296 4.03733C23.9027 3.86422 24 3.62943 24 3.38462C24 3.1398 23.9027 2.90501 23.7296 2.7319C23.5565 2.55879 23.3217 2.46154 23.0769 2.46154H15.2563C15.1002 1.91071 14.8053 1.40337 14.3933 0.991331C13.7585 0.356592 12.8977 0 12 0C11.1023 0 10.2415 0.356592 9.60671 0.991331C9.19468 1.40337 8.89985 1.91071 8.74368 2.46154H0.923077ZM0.923077 11.0769C0.678262 11.0769 0.443473 11.1742 0.270363 11.3473C0.0972523 11.5204 0 11.7552 0 12C0 12.2448 0.0972523 12.4796 0.270363 12.6527C0.443473 12.8258 0.678262 12.9231 0.923077 12.9231H12C12.2448 12.9231 12.4796 12.8258 12.6527 12.6527C12.8258 12.4796 12.9231 12.2448 12.9231 12C12.9231 11.7552 12.8258 11.5204 12.6527 11.3473C12.4796 11.1742 12.2448 11.0769 12 11.0769H0.923077ZM12 19.6923C11.7552 19.6923 11.5204 19.7896 11.3473 19.9627C11.1742 20.1358 11.0769 20.3706 11.0769 20.6154C11.0769 20.8602 11.1742 21.095 11.3473 21.2681C11.5204 21.4412 11.7552 21.5385 12 21.5385H23.0769C23.3217 21.5385 23.5565 21.4412 23.7296 21.2681C23.9027 21.095 24 20.8602 24 20.6154C24 20.3706 23.9027 20.1358 23.7296 19.9627C23.5565 19.7896 23.3217 19.6923 23.0769 19.6923H12ZM13.5385 3.38462C13.5385 4.23385 12.8492 4.92308 12 4.92308C11.1508 4.92308 10.4615 4.23385 10.4615 3.38462C10.4615 2.53538 11.1508 1.84615 12 1.84615C12.8492 1.84615 13.5385 2.53538 13.5385 3.38462Z" fill="black" />
                                            <path d="M0.923077 19.6923C0.678262 19.6923 0.443473 19.7896 0.270363 19.9627C0.0972523 20.1358 0 20.3706 0 20.6154C0 20.8602 0.0972523 21.095 0.270363 21.2681C0.443473 21.4412 0.678262 21.5385 0.923077 21.5385V19.6923Z" fill="#BDBDBD" />
                                            <path d="M0.923077 19.6923V21.5385H2.58984C2.50543 21.2407 2.46154 20.9303 2.46154 20.6154C2.46154 20.3004 2.50543 19.99 2.58984 19.6923H0.923077Z" fill="#BDBDBD" />
                                            <path d="M5.84615 24V22.1538C4.99692 22.1538 4.30769 21.4646 4.30769 20.6154H3.38462V21.5385H2.58984C2.746 22.0893 3.04083 22.5966 3.45287 23.0087C4.08761 23.6434 4.9485 24 5.84615 24Z" fill="#BDBDBD" />
                                            <path d="M2.58984 21.5385H3.38462V20.6154H2.46154C2.46154 20.9303 2.50543 21.2407 2.58984 21.5385Z" fill="#BDBDBD" />
                                            <path d="M3.38462 19.6923H2.58984C2.50543 19.99 2.46154 20.3004 2.46154 20.6154H3.38462V19.6923Z" fill="#BDBDBD" />
                                            <path d="M4.30769 20.6154C4.30769 19.7662 4.99692 19.0769 5.84615 19.0769V17.2308C4.9485 17.2308 4.08761 17.5874 3.45287 18.2221C3.04083 18.6341 2.746 19.1415 2.58984 19.6923H3.38462V20.6154H4.30769Z" fill="#BDBDBD" />
                                            <path d="M7.38462 20.6154H9.23077C9.23077 19.7177 8.87418 18.8568 8.23944 18.2221C7.6047 17.5874 6.74381 17.2308 5.84615 17.2308V19.0769C6.69538 19.0769 7.38462 19.7662 7.38462 20.6154Z" fill="#BDBDBD" />
                                            <path d="M7.38462 20.6154C7.38462 21.4646 6.69538 22.1538 5.84615 22.1538V24C6.74381 24 7.6047 23.6434 8.23944 23.0087C8.87418 22.3739 9.23077 21.513 9.23077 20.6154H7.38462Z" fill="#BDBDBD" />
                                        </g>
                                    </g>
                                </svg>
                                Filter
                            </Button>
                        </div>
                    </div>
                    <div className='p-0'>
                        <BookingFilter
                            isOpen={isFilterOpen}
                            placeId={placeId}
                            getFilteredData={getFilteredData} />
                    </div>
                </div>
            </div>
            <div className='container-fluid px-70'>
                <div className="booking-section">
                    {empty && <Paragraph className='empty py-5'>{empty}</Paragraph>}
                    {error && <Paragraph className='text-danger empty py-5'>{error}</Paragraph>}
                    <div className="row" id={spaceTitle}>
                        {cards && cards?.slice(0, visibleCards).map((book) => {
                            return (
                                <div className="col-lg-4 col-md-6 col-sm-12" key={book?.id}>
                                    <BookingSpaceList
                                        id={book?.id}
                                        place_type={book?.title}
                                        img={book?.gallery[0]?.image}
                                        name={book?.title}
                                        description={book?.description}
                                        amenities={book?.facilities}
                                        price={book?.price}
                                        is_favorite={book?.is_favorite}
                                        default_price_per={book?.default_price_per} />
                                </div>
                            )
                        })}
                    </div>
                    {cards && visibleCards < cards?.length && (
                        <div className='text-center mt-5'>
                            <Button
                                tagType="link"
                                className="btn-cards-more"
                                onClick={handleShowMore}>Show more
                                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="expand_more" d="M4.00451 4.5C3.90895 4.5 3.81937 4.4856 3.73576 4.45681C3.65214 4.42847 3.5745 4.38002 3.50283 4.31146L0.188191 1.14051C0.0567994 1.01482 -0.00579067 0.857585 0.000420551 0.668814C0.00615399 0.4805 0.0747161 0.323495 0.206107 0.1978C0.337499 0.0721046 0.504724 0.00925661 0.707783 0.00925661C0.910843 0.00925661 1.07807 0.0721046 1.20946 0.1978L4.00451 2.87168L6.81748 0.180659C6.94887 0.0549639 7.11323 -0.00514088 7.31055 0.000344001C7.5074 0.00628595 7.67152 0.0721046 7.80291 0.1978C7.9343 0.323495 8 0.48347 8 0.677726C8 0.871982 7.9343 1.03196 7.80291 1.15765L4.50619 4.31146C4.43452 4.38002 4.35688 4.42847 4.27327 4.45681C4.18965 4.4856 4.10007 4.5 4.00451 4.5Z" fill="black" />
                                </svg>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default BookingSpacesTypes; 